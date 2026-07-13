import type { Metadata } from "next";
import { StoreProvider } from "@/components/store/providers/StoreProvider";
import { CartDrawer } from "@/components/store/CartDrawer";
import { StoreNav } from "@/components/store/StoreNav";

export const metadata: Metadata = {
  title: {
    default: "Cabinet Store | Sandha Woodworks",
    template: "%s | Sandha Woodworks Store",
  },
  description:
    "Browse premium custom millwork cabinets, bathroom vanities, closets, and more — crafted in Brantford, ON.",
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
