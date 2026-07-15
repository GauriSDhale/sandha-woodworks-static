import type { Metadata } from "next";
import { resources } from "@/lib/i18n/resources";
import { buildPageMetadata } from "@/lib/i18n/seo";
import StorePageClient from "../../../(en)/store/StorePageClient";

const storeMeta = resources.fr.store.meta;

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/store",
  title: storeMeta.defaultTitle,
  description: storeMeta.description,
  absoluteTitle: true,
});

export default function StorePage() {
  return <StorePageClient />;
}
