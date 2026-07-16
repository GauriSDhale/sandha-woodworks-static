import type { Metadata } from "next";
import { StoreProvider } from "@/components/store/providers/StoreProvider";
import { CartDrawer } from "@/components/store/CartDrawer";
import { StoreNav } from "@/components/store/StoreNav";
import enStore from "@/locales/en/store.json";

export const metadata: Metadata = {
  title: {
    default: enStore.meta.defaultTitle,
    template: enStore.meta.titleTemplate,
  },
  description: enStore.meta.description,
};

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      {/* Offset fixed site header (h-[4.5rem] / sm:h-20) so StoreNav is not cropped */}
      <div className="overflow-x-hidden pt-[4.5rem] sm:pt-20">
        <StoreNav />
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
      <CartDrawer />
    </StoreProvider>
  );
}
