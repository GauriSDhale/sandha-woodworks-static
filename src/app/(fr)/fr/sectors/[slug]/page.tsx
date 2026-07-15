import {
  default as Page,
  generateStaticParams,
  createSectorDetailMetadata,
} from "../../../../(en)/sectors/[slug]/page";

export { generateStaticParams };
export default Page;
export const generateMetadata = createSectorDetailMetadata("fr");
