import {
  default as Page,
  generateStaticParams,
  createMarketMetadata,
} from "../../../../(en)/markets/[slug]/page";

export { generateStaticParams };
export default Page;
export const generateMetadata = createMarketMetadata("fr");
