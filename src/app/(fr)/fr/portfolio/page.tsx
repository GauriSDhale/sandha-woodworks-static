import type { Metadata } from "next";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export { default } from "../../../(en)/portfolio/page";

export const metadata: Metadata = namespacePageMetadata("fr", "/portfolio", "portfolio");
