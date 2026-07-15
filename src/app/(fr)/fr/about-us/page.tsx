import type { Metadata } from "next";
import { namespacePageMetadata } from "@/lib/i18n/seo";

export { default } from "../../../(en)/about-us/page";

export const metadata: Metadata = namespacePageMetadata("fr", "/about-us", "about");
