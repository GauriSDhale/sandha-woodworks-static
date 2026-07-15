import type { Metadata } from "next";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export { default } from "../../../(en)/legal/page";

export const metadata: Metadata = namespacePageMetadata("fr", "/legal", "legal");
