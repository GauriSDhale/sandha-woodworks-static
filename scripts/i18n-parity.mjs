#!/usr/bin/env node
/**
 * Fails if FR locale files are missing keys present in EN.
 * Usage: node scripts/i18n-parity.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localesRoot = path.join(__dirname, "../src/locales");

function flatten(obj, prefix = "", out = {}) {
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    out[prefix] = obj;
    return out;
  }
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      flatten(value, next, out);
    } else {
      out[next] = value;
    }
  }
  return out;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

const enDir = path.join(localesRoot, "en");
const frDir = path.join(localesRoot, "fr");
const namespaces = fs.readdirSync(enDir).filter((f) => f.endsWith(".json"));

let failed = false;

for (const file of namespaces) {
  const enPath = path.join(enDir, file);
  const frPath = path.join(frDir, file);
  if (!fs.existsSync(frPath)) {
    console.error(`Missing FR namespace: ${file}`);
    failed = true;
    continue;
  }

  const enFlat = flatten(readJson(enPath));
  const frFlat = flatten(readJson(frPath));

  const missing = Object.keys(enFlat).filter((key) => !(key in frFlat));
  const extra = Object.keys(frFlat).filter((key) => !(key in enFlat));

  if (missing.length) {
    failed = true;
    console.error(`\n[${file}] Missing in FR (${missing.length}):`);
    missing.slice(0, 40).forEach((key) => console.error(`  - ${key}`));
    if (missing.length > 40) console.error(`  … +${missing.length - 40} more`);
  }
  if (extra.length) {
    console.warn(`\n[${file}] Extra in FR (not in EN) (${extra.length}):`);
    extra.slice(0, 20).forEach((key) => console.warn(`  - ${key}`));
  }
}

if (failed) {
  console.error("\ni18n parity check failed.");
  process.exit(1);
}

console.log(`i18n parity OK (${namespaces.length} namespaces).`);
