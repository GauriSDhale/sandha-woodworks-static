"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Share2, Truck, Shield, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addToCart, openDrawer } from "@/store/slices/cartSlice";
import { addRecentlyViewed, selectRecentlyViewedIds } from "@/store/slices/productsSlice";
import { getProductBySlug, getRelatedProducts, products } from "@/store/data/products";
import { ProductGallery } from "@/components/store/ProductGallery";
import { Rating } from "@/components/store/Rating";
import { PriceTag } from "@/components/store/PriceTag";
import { WishlistButton } from "@/components/store/WishlistButton";
import { QuantitySelector } from "@/components/store/QuantitySelector";
import { ProductGrid } from "@/components/store/ProductGrid";
import { Breadcrumb } from "@/components/store/Breadcrumb";
import { availabilityLabel } from "@/store/utils/format";
import { getProductLocalizedCopy, getSampleReviews } from "@/store/utils/productCopy";
import { cn } from "@/lib/utils";

export function ProductDetailContent({ slug }: { slug: string }) {
  const { t } = useTranslation("store");
  const { t: tCatalog } = useTranslation("storeCatalog");
  const dispatch = useAppDispatch();
  const recentlyViewedIds = useAppSelector(selectRecentlyViewedIds);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  const product = getProductBySlug(slug);
  const sampleReviews = getSampleReviews(tCatalog);

  useEffect(() => {
    if (product) {
      dispatch(addRecentlyViewed(product.id));
    }
  }, [product, dispatch]);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="font-display text-xl font-semibold">{t("empty.productNotFound")}</p>
        <Link href="/store" className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-cream transition hover:bg-warm-black">
          {t("product.backToStore")}
        </Link>
      </div>
    );
  }

  const copy = getProductLocalizedCopy(product, tCatalog);
  const related = getRelatedProducts(product, 4);
  const recentlyViewed = products
    .filter((p) => recentlyViewedIds.includes(p.id) && p.id !== product.id)
    .slice(0, 4);
  const categoryLabel = t(`categories.${product.category}.label`);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        quantity: qty,
        price: product.discountPrice ?? product.price,
        name: product.name,
        image: product.images[0],
        SKU: product.SKU,
        category: product.category,
      }),
    );
    dispatch(openDrawer());
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        productId: product.id,
        quantity: qty,
        price: product.discountPrice ?? product.price,
        name: product.name,
        image: product.images[0],
        SKU: product.SKU,
        category: product.category,
      }),
    );
    window.location.href = "/store/checkout";
  };

  const handleShare = async () => {
    try {
      await navigator.share({ title: product.name, text: copy.description, url: window.location.href });
    } catch {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
    }
  };

  const tabs = [
    { id: "description" as const, label: t("product.tabs.description") },
    { id: "specs" as const, label: t("product.tabs.specs") },
    { id: "reviews" as const, label: t("product.tabs.reviews") },
  ];

  const attrItems = [
    { label: t("product.attrs.material"), value: copy.material },
    { label: t("product.attrs.finish"), value: copy.finish },
    { label: t("product.attrs.width"), value: `${product.dimensions.width}"` },
    { label: t("product.attrs.height"), value: `${product.dimensions.height}"` },
    { label: t("product.attrs.depth"), value: `${product.dimensions.depth}"` },
    { label: t("product.attrs.availability"), value: availabilityLabel(product.availability, t) },
  ];

  return (
    <div className="space-y-12">
      <Breadcrumb
        items={[
          {
            label: categoryLabel,
            href: `/store/categories/${product.category}`,
          },
          { label: product.name },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <ProductGallery images={product.images} name={product.name} />
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="space-y-5">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {product.isNew && (
                <span className="rounded-full bg-foreground px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-cream">
                  {t("product.badgeNew")}
                </span>
              )}
              {product.isBestseller && (
                <span className="rounded-full bg-brand-red px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                  {t("product.badgeBestseller")}
                </span>
              )}
            </div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t("product.skuWithCategory", { category: categoryLabel, sku: product.SKU })}
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold leading-tight text-foreground">{product.name}</h1>
          </div>

          <Rating value={product.rating} count={product.reviews} size="md" />
          <PriceTag price={product.price} discountPrice={product.discountPrice} size="lg" />

          <div className="flex items-center gap-2">
            <span className={cn("h-2 w-2 rounded-full",
              product.availability === "in-stock" ? "bg-emerald-500" :
              product.availability === "made-to-order" ? "bg-amber-500" : "bg-red-500"
            )} />
            <span className={cn("text-sm font-medium",
              product.availability === "in-stock" ? "text-emerald-600" :
              product.availability === "made-to-order" ? "text-amber-600" : "text-red-500"
            )}>
              {availabilityLabel(product.availability, t)}
              {product.stock > 0 && product.availability === "in-stock" && (
                <span className="ml-2 text-muted-foreground font-normal">
                  {t("availability.inStockCount", { count: product.stock })}
                </span>
              )}
            </span>
          </div>

          <div className="rounded-xl bg-muted/40 px-4 py-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              {t("product.dimensionsLabel")}
            </p>
            <p className="font-display text-sm font-semibold text-foreground">
              {product.dimensions.width}&Prime; × {product.dimensions.height}&Prime; × {product.dimensions.depth}&Prime;
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-muted-foreground">{t("product.quantity")}</label>
              <QuantitySelector value={qty} onChange={setQty} max={product.stock || 99} size="md" />
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={handleAddToCart}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-foreground py-3 font-semibold text-cream transition hover:bg-warm-black">
                <ShoppingCart className="h-4 w-4" />{t("product.addToCart")}
              </button>
              <button type="button" onClick={handleBuyNow}
                className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-foreground py-3 font-semibold text-foreground transition hover:bg-foreground hover:text-cream">
                {t("product.buyNow")}
              </button>
            </div>
            <div className="flex gap-2">
              <WishlistButton productId={product.id} variant="button" className="flex-1" />
              <button type="button" onClick={handleShare} aria-label={t("a11y.shareProduct")}
                className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted">
                <Share2 className="h-4 w-4" />{t("product.share")}
              </button>
            </div>
          </div>

          <div className="space-y-2 rounded-2xl border border-border p-4">
            <div className="flex items-center gap-3 text-sm">
              <Truck className="h-4 w-4 shrink-0 text-brand-red" />
              <span><span className="font-medium">{t("product.deliveryLabel")} </span>{copy.deliveryEstimate}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Shield className="h-4 w-4 shrink-0 text-brand-red" />
              <span><span className="font-medium">{t("product.warrantyLabel")} </span>{copy.warranty || t("product.contactUs")}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <RefreshCw className="h-4 w-4 shrink-0 text-brand-red" />
              <span><span className="font-medium">{t("product.returnsLabel")} </span>{t("product.returnsPolicy")}</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div>
        <div className="flex gap-1 border-b border-border" role="tablist">
          {tabs.map((tab) => (
            <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}
              className={cn("px-5 py-2.5 text-sm font-semibold transition-all",
                activeTab === tab.id ? "border-b-2 border-foreground text-foreground" : "text-muted-foreground hover:text-foreground"
              )}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pt-6">
          {activeTab === "description" && (
            <div className="max-w-2xl space-y-4">
              <p className="leading-relaxed text-muted-foreground">{copy.description}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {attrItems.map((item) => (
                  <div key={item.label} className="rounded-xl bg-muted/40 px-3 py-2">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "specs" && (
            <div className="max-w-2xl">
              <dl className="divide-y divide-border">
                {Object.entries(copy.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 py-3">
                    <dt className="text-sm font-medium text-muted-foreground">{key}</dt>
                    <dd className="text-sm font-semibold text-foreground text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {activeTab === "reviews" && (
            <div className="max-w-2xl space-y-6">
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-display text-5xl font-bold">{product.rating.toFixed(1)}</p>
                  <Rating value={product.rating} showCount={false} size="lg" />
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("product.reviewsCount", { count: product.reviews })}
                  </p>
                </div>
                <div className="flex-1">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const pct = star === 5 ? 72 : star === 4 ? 18 : star === 3 ? 6 : star === 2 ? 3 : 1;
                    return (
                      <div key={star} className="flex items-center gap-2 text-sm">
                        <span className="w-2 text-muted-foreground">{star}</span>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-8 text-right text-muted-foreground text-xs">{pct}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              {sampleReviews.map((review) => (
                <div key={review.name} className="rounded-2xl border border-border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                  <Rating value={review.rating} showCount={false} size="sm" />
                  <p className="text-sm text-muted-foreground">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="mb-5 font-display text-xl font-bold">{t("product.youMayAlsoLike")}</h2>
          <ProductGrid products={related} />
        </section>
      )}

      {recentlyViewed.length > 0 && (
        <section>
          <h2 className="mb-5 font-display text-xl font-bold">{t("product.recentlyViewed")}</h2>
          <ProductGrid products={recentlyViewed} />
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org", "@type": "Product",
          name: product.name, description: copy.description, sku: product.SKU,
          brand: { "@type": "Brand", name: "Sandha Woodworks" },
          offers: { "@type": "Offer", priceCurrency: "CAD", price: product.discountPrice ?? product.price,
            availability: product.availability === "in-stock" ? "https://schema.org/InStock" : "https://schema.org/BackOrder" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews },
        }),
      }} />
    </div>
  );
}
