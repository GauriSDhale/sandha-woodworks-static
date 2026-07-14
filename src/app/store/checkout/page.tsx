"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectCheckout,
  setShippingAddress,
  setDeliveryMethod,
  setPaymentMethod,
  nextStep,
  prevStep,
  setProcessing,
  setError,
  resetCheckout,
} from "@/store/slices/checkoutSlice";
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartDiscount,
  selectCartGST,
  clearCart,
} from "@/store/slices/cartSlice";
import { placeOrder } from "@/store/slices/ordersSlice";
import { DELIVERY_METHODS, deliveryI18nKey } from "@/store/types/order";
import { CheckoutStepper } from "@/components/store/CheckoutStepper";
import { OrderSummary } from "@/components/store/OrderSummary";
import { Breadcrumb } from "@/components/store/Breadcrumb";
import { PaymentCard, PaymentSecurityBadge } from "@/components/store/PaymentCard";
import { CartItem } from "@/components/store/CartItem";
import { getPaymentProvider } from "@/store/payment";
import { generateOrderNumber, generateId, formatPrice } from "@/store/utils/format";
import type { ShippingAddress } from "@/store/types/order";

const PROVINCES = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia",
  "Nunavut", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon",
];

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs text-red-500">{message}</p>;
}

function InputField({
  label,
  error,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-brand-red">*</span>}
      </label>
      <input
        {...props}
        className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-foreground/50 focus:ring-2 focus:ring-foreground/10"
      />
      <FieldError message={error} />
    </div>
  );
}

function ShippingStep() {
  const { t } = useTranslation("store");
  const dispatch = useAppDispatch();
  const checkout = useAppSelector(selectCheckout);

  const addressSchema = useMemo(
    () =>
      z.object({
        firstName: z.string().min(2, t("checkout.errors.firstName")),
        lastName: z.string().min(2, t("checkout.errors.lastName")),
        company: z.string().optional(),
        addressLine1: z.string().min(5, t("checkout.errors.address")),
        addressLine2: z.string().optional(),
        city: z.string().min(2, t("checkout.errors.city")),
        province: z.string().min(2, t("checkout.errors.province")),
        postalCode: z
          .string()
          .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, t("checkout.errors.postalCode")),
        country: z.string().min(1).default(t("checkout.country")),
        phone: z.string().regex(/^\+?[\d\s\-().]{10,}$/, t("checkout.errors.phone")),
      }),
    [t],
  );

  type AddressForm = z.infer<typeof addressSchema>;

  const { register, handleSubmit, formState: { errors } } = useForm<AddressForm>({
    resolver: zodResolver(addressSchema) as any,
    defaultValues: checkout.shippingAddress ?? {
      country: "Canada",
      province: "Ontario",
    },
  });

  const onSubmit = (data: AddressForm) => {
    dispatch(setShippingAddress({ ...data, country: data.country ?? "Canada" } as ShippingAddress));
    dispatch(nextStep());
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label={t("checkout.fields.firstName")} required error={errors.firstName?.message} {...register("firstName")} />
        <InputField label={t("checkout.fields.lastName")} required error={errors.lastName?.message} {...register("lastName")} />
      </div>
      <InputField label={t("checkout.fields.company")} error={errors.company?.message} {...register("company")} />
      <InputField label={t("checkout.fields.addressLine1")} required error={errors.addressLine1?.message} {...register("addressLine1")} />
      <InputField label={t("checkout.fields.addressLine2")} error={errors.addressLine2?.message} {...register("addressLine2")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label={t("checkout.fields.city")} required error={errors.city?.message} {...register("city")} />
        <div>
          <label className="mb-1 block text-sm font-medium text-foreground">
            {t("checkout.fields.province")}<span className="ml-0.5 text-brand-red">*</span>
          </label>
          <select {...register("province")}
            className="w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:border-foreground/50">
            {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
          <FieldError message={errors.province?.message} />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <InputField label={t("checkout.fields.postalCode")} required placeholder="K1A 0A1" error={errors.postalCode?.message} {...register("postalCode")} />
        <InputField label={t("checkout.fields.phone")} required placeholder="+1 226 381 0023" error={errors.phone?.message} {...register("phone")} />
      </div>
      <div className="flex justify-center">
        <button type="submit" className="w-fit rounded-full bg-foreground px-6 py-3 font-semibold text-cream transition hover:bg-warm-black">
          {t("checkout.continueToDelivery")}
        </button>
      </div>
    </form>
  );
}

function DeliveryStep() {
  const { t } = useTranslation("store");
  const dispatch = useAppDispatch();
  const checkout = useAppSelector(selectCheckout);

  return (
    <div className="space-y-4">
      {DELIVERY_METHODS.map((method) => (
        <button
          key={method.id}
          type="button"
          onClick={() => dispatch(setDeliveryMethod(method))}
          className={`flex w-full items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all ${
            checkout.deliveryMethod?.id === method.id
              ? "border-foreground bg-foreground/5"
              : "border-border hover:border-foreground/30"
          }`}
        >
          <div className={`mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 transition-all ${
            checkout.deliveryMethod?.id === method.id ? "border-foreground bg-foreground" : "border-border"
          }`} />
          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-semibold">{t(deliveryI18nKey(method.id, "label"))}</span>
              <span className="font-bold">{formatPrice(method.price)}</span>
            </div>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {t(deliveryI18nKey(method.id, "description"))}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              ⏱ {t(deliveryI18nKey(method.id, "estimatedDays"))}
            </p>
          </div>
        </button>
      ))}
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => dispatch(prevStep())}
          className="flex-1 rounded-full border border-border py-3 font-medium transition hover:bg-muted">
          {t("checkout.back")}
        </button>
        <button
          type="button"
          disabled={!checkout.deliveryMethod}
          onClick={() => dispatch(nextStep())}
          className="flex-1 rounded-full bg-foreground py-3 font-semibold text-cream transition hover:bg-warm-black disabled:opacity-40 disabled:pointer-events-none"
        >
          {t("checkout.continueToPayment")}
        </button>
      </div>
    </div>
  );
}

function PaymentStep() {
  const { t } = useTranslation("store");
  const dispatch = useAppDispatch();
  const checkout = useAppSelector(selectCheckout);

  return (
    <div className="space-y-4">
      {(["razorpay", "stripe", "paypal"] as const).map((provider) => (
        <PaymentCard
          key={provider}
          provider={provider}
          selected={checkout.paymentMethod === provider}
          onSelect={() => dispatch(setPaymentMethod(provider))}
          disabled={provider !== "razorpay"}
        />
      ))}
      <PaymentSecurityBadge />
      <div className="rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
        {t("payment.demoHint", {
          card: "4111 1111 1111 1111",
          expiry: "12/34",
          cvc: "123",
        })}
      </div>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => dispatch(prevStep())}
          className="flex-1 rounded-full border border-border py-3 font-medium transition hover:bg-muted">
          {t("checkout.back")}
        </button>
        <button
          type="button"
          disabled={!checkout.paymentMethod}
          onClick={() => dispatch(nextStep())}
          className="flex-1 rounded-full bg-foreground py-3 font-semibold text-cream transition hover:bg-warm-black disabled:opacity-40 disabled:pointer-events-none"
        >
          {t("checkout.continueToReview")}
        </button>
      </div>
    </div>
  );
}

function ReviewStep() {
  const { t } = useTranslation("store");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const checkout = useAppSelector(selectCheckout);
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const discount = useAppSelector(selectCartDiscount);
  const gst = useAppSelector(selectCartGST);

  const shipping = checkout.deliveryMethod?.price ?? 0;
  const total = subtotal - discount + gst + shipping;

  const handlePlaceOrder = async () => {
    if (!checkout.shippingAddress || !checkout.deliveryMethod || !checkout.paymentMethod) return;

    dispatch(setProcessing(true));
    dispatch(setError(null));

    try {
      const provider = getPaymentProvider(checkout.paymentMethod);
      const orderId = generateId();

      const paymentResult = await provider.initiatePayment({
        amount: Math.round(total * 100),
        currency: "CAD",
        orderId,
        customerName: `${checkout.shippingAddress.firstName} ${checkout.shippingAddress.lastName}`,
        customerEmail: "customer@example.com",
        customerPhone: checkout.shippingAddress.phone,
      });

      if (paymentResult.success) {
        dispatch(placeOrder({
          id: orderId,
          orderNumber: generateOrderNumber(),
          items: items.map((i) => ({ ...i, subtotal: i.price * i.quantity })),
          shippingAddress: checkout.shippingAddress,
          deliveryMethod: checkout.deliveryMethod,
          subtotal,
          gst,
          shipping,
          discount,
          total,
          status: "confirmed",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          transaction: {
            id: generateId(),
            provider: checkout.paymentMethod,
            paymentId: paymentResult.paymentId ?? "",
            orderId: paymentResult.orderId ?? orderId,
            amount: total,
            currency: "CAD",
            status: "success",
            timestamp: new Date().toISOString(),
          },
        }));
        dispatch(clearCart());
        dispatch(resetCheckout());
        router.push("/store/order-success");
      } else {
        dispatch(setError(paymentResult.error ?? t("payment.errors.failed")));
      }
    } catch {
      dispatch(setError(t("payment.errors.unexpected")));
    } finally {
      dispatch(setProcessing(false));
    }
  };

  return (
    <div className="space-y-5">
      {checkout.shippingAddress && (
        <div className="rounded-2xl border border-border p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("checkout.shippingTo")}
          </p>
          <p className="text-sm font-semibold">
            {checkout.shippingAddress.firstName} {checkout.shippingAddress.lastName}
          </p>
          <p className="text-sm text-muted-foreground">{checkout.shippingAddress.addressLine1}</p>
          <p className="text-sm text-muted-foreground">
            {checkout.shippingAddress.city}, {checkout.shippingAddress.province} {checkout.shippingAddress.postalCode}
          </p>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => <CartItem key={item.productId} item={item} compact />)}
      </div>

      {checkout.error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
          {checkout.error}
        </div>
      )}

      <div className="flex gap-3">
        <button type="button" onClick={() => dispatch(prevStep())}
          className="flex-1 rounded-full border border-border py-3 font-medium transition hover:bg-muted">
          {t("checkout.back")}
        </button>
        <button
          type="button"
          onClick={handlePlaceOrder}
          disabled={checkout.isProcessing}
          className="flex-1 rounded-full bg-foreground py-3 font-bold text-cream transition hover:bg-warm-black disabled:opacity-50"
        >
          {checkout.isProcessing
            ? t("checkout.processing")
            : t("checkout.payAmount", { amount: formatPrice(total) })}
        </button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { t } = useTranslation("store");
  const checkout = useAppSelector(selectCheckout);
  const items = useAppSelector(selectCartItems);

  const stepComponents = {
    1: <ShippingStep />,
    2: <DeliveryStep />,
    3: <PaymentStep />,
    4: <ReviewStep />,
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24 text-center">
        <p className="font-display text-xl font-semibold">{t("empty.cartTitle")}</p>
        <a href="/store" className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-cream transition hover:bg-warm-black">
          {t("cart.browseProducts")}
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Breadcrumb items={[{ label: t("nav.checkout") }]} />
      <h1 className="font-display text-3xl font-bold">{t("checkout.title")}</h1>

      <CheckoutStepper currentStep={checkout.step} className="mb-8" />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div>
          <h2 className="mb-5 font-display text-xl font-semibold">
            {t(`checkout.stepTitles.${checkout.step}`)}
          </h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={checkout.step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {stepComponents[checkout.step]}
            </motion.div>
          </AnimatePresence>
        </div>

        <OrderSummary deliveryMethodId={checkout.deliveryMethod?.id} />
      </div>
    </div>
  );
}
