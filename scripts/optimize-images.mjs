import { mkdir, readdir, rename, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const publicDir = path.join(root, "public");
const manifestPath = path.join(root, "src/lib/generated/image-manifest.json");
const sourceDirectories = ["assets", "images/products"];
const minimumSourceBytes = 500_000;
const maximumSourceWidth = 2400;
const responsiveWidths = [640, 1280, 1920];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(entryPath) : entryPath;
    }),
  );

  return files.flat();
}

function publicPath(filePath) {
  return `/${path.relative(publicDir, filePath).split(path.sep).join("/")}`;
}

function variantPath(sourcePath, width) {
  const extension = path.extname(sourcePath);
  return `${sourcePath.slice(0, -extension.length)}.w${width}.webp`;
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function optimizeSource(sourcePath) {
  const sourceStats = await stat(sourcePath);
  const existingVariants = await Promise.all(
    responsiveWidths.map((width) => exists(variantPath(sourcePath, width))),
  );
  const hasExistingVariants = existingVariants.some(Boolean);

  if (sourceStats.size < minimumSourceBytes && !hasExistingVariants) return null;

  if (sourceStats.size >= minimumSourceBytes && !hasExistingVariants) {
    const temporaryPath = `${sourcePath}.optimized`;

    await sharp(sourcePath)
      .rotate()
      .resize({
        width: maximumSourceWidth,
        height: maximumSourceWidth,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: 82, progressive: true, chromaSubsampling: "4:2:0" })
      .toFile(temporaryPath);

    await rename(temporaryPath, sourcePath);
  }

  const metadata = await sharp(sourcePath).metadata();
  if (!metadata.width || !metadata.height) return null;

  const variants = [];
  for (const width of responsiveWidths) {
    if (width > metadata.width) continue;

    const outputPath = variantPath(sourcePath, width);
    if (!(await exists(outputPath))) {
      await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80, effort: 4 })
        .toFile(outputPath);
    }

    variants.push({
      src: publicPath(outputPath),
      width,
    });
  }

  if (variants.length === 0) return null;

  return {
    source: publicPath(sourcePath),
    width: metadata.width,
    height: metadata.height,
    variants,
  };
}

const sourceFiles = (
  await Promise.all(sourceDirectories.map((directory) => walk(path.join(publicDir, directory))))
)
  .flat()
  .filter((filePath) => /\.jpe?g$/i.test(filePath) && !/\.w\d+\.webp$/i.test(filePath));

const manifest = {};
let optimizedCount = 0;

for (const sourcePath of sourceFiles) {
  const beforeBytes = (await stat(sourcePath)).size;
  const image = await optimizeSource(sourcePath);
  if (!image) continue;

  const afterBytes = (await stat(sourcePath)).size;
  if (afterBytes < beforeBytes) optimizedCount += 1;

  manifest[image.source] = {
    width: image.width,
    height: image.height,
    srcSet: image.variants.map(({ src, width }) => `${src} ${width}w`).join(", "),
  };
}

await mkdir(path.dirname(manifestPath), { recursive: true });
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(
  `Image optimization complete: ${optimizedCount} JPEG sources compressed; ${Object.keys(manifest).length} responsive image entries written.`,
);
