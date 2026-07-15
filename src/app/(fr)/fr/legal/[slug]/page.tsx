import {
  default as Page,
  generateStaticParams,
  createLegalDocMetadata,
} from "../../../../(en)/legal/[slug]/page";

export { generateStaticParams };
export default Page;
export const generateMetadata = createLegalDocMetadata("fr");
