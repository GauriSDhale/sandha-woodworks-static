import type { Metadata } from "next";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export { default } from "../../../(en)/contact/page";

export const metadata: Metadata = namespacePageMetadata("fr", "/contact", "contact");
