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
      <StoreNav />
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
      <CartDrawer />
    </StoreProvider>
  );
}
