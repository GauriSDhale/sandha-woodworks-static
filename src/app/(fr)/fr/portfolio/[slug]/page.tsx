import {
  default as Page,
  generateStaticParams,
  createProjectMetadata,
} from "../../../../(en)/portfolio/[slug]/page";

export { generateStaticParams };
export default Page;
export const generateMetadata = createProjectMetadata("fr");
