import {
  default as Page,
  generateStaticParams,
  createServiceMetadata,
} from "../../../../(en)/services/[slug]/page";

export { generateStaticParams };
export default Page;
export const generateMetadata = createServiceMetadata("fr");
