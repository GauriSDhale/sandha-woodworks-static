import {
  default as Page,
  generateStaticParams,
  createCategoryMetadata,
} from "../../../../../(en)/store/categories/[category]/page";

export { generateStaticParams };
export default Page;
export const generateMetadata = createCategoryMetadata("fr");
