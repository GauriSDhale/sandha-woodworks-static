import {
  default as Page,
  generateStaticParams,
  createProductMetadata,
} from "../../../../(en)/store/[slug]/page";

export { generateStaticParams };
export default Page;
export const generateMetadata = createProductMetadata("fr");
