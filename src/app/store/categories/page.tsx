import type { Metadata } from "next";
import { CategoriesPageContent } from "@/components/store/CategoriesPageContent";
import enStore from "@/locales/en/store.json";

export const metadata: Metadata = {
  title: enStore.meta.categoriesTitle,
  description: enStore.meta.categoriesDescription,
};

export default function CategoriesPage() {
  return <CategoriesPageContent />;
}
