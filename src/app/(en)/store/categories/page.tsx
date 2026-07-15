import type { Metadata } from "next";
import { CategoriesPageContent } from "@/components/store/CategoriesPageContent";
import { resources } from "@/lib/i18n/resources";
import { buildPageMetadata } from "@/lib/i18n/seo";

const storeMeta = resources.en.store.meta;

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/store/categories",
  title: storeMeta.categoriesTitle,
  description: storeMeta.categoriesDescription,
});

export default function CategoriesPage() {
  return <CategoriesPageContent />;
}
