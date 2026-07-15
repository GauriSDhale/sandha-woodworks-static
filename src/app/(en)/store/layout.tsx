import type { Metadata } from "next";
import { StoreProvider } from "@/components/store/providers/StoreProvider";
import { CartDrawer } from "@/components/store/CartDrawer";
import { StoreNav } from "@/components/store/StoreNav";
import { resources } from "@/lib/i18n/resources";

const storeMeta = resources.en.store.meta;

export const metadata: Metadata = {
  title: {
    default: storeMeta.defaultTitle,
    template: storeMeta.titleTemplate,
  },
  description: storeMeta.description,
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      {/* Offset fixed site header (h-16 / sm:h-[4.5rem]) so StoreNav is not cropped */}
      <div className="overflow-x-hidden pt-16 sm:pt-[4.5rem]">
        <StoreNav />
        <div className="mx-auto w-full max-w-7xl px-[10px] py-8">
          {children}
        </div>
      </div>
      <CartDrawer />
    </StoreProvider>
  );
}
