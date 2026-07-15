import type { Metadata } from "next";
import { products, getProductBySlug } from "@/store/data/products";
import type { AppLanguage } from "@/lib/i18n/config";
import { resources } from "@/lib/i18n/resources";
import { buildPageMetadata } from "@/lib/i18n/seo";
import { ProductDetailContent } from "./ProductDetailContent";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function createProductMetadata(locale: AppLanguage) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ slug: string }>;
  }): Promise<Metadata> {
    const { slug } = await params;
    const product = getProductBySlug(slug);
    if (!product) return {};
    const descriptions = resources[locale].storeCatalog.descriptions as Record<
      string,
      string
    >;
    const description = descriptions[product.id] ?? product.description;
    const meta = buildPageMetadata({
      locale,
      path: `/store/${slug}`,
      title: product.name,
      description,
    });
    return {
      ...meta,
      openGraph: {
        ...meta.openGraph,
        images: product.images[0] ? [product.images[0]] : [],
      },
    };
  };
}

export const generateMetadata = createProductMetadata("en");

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailContent slug={slug} />;
}
