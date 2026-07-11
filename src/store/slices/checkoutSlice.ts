import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CheckoutState, CheckoutStep } from "../types/checkout";
import type { ShippingAddress, DeliveryMethod } from "../types/order";

const initialState: CheckoutState = {
  step: 1,
  shippingAddress: null,
  deliveryMethod: null,
  paymentMethod: null,
  isProcessing: false,
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<CheckoutStep>) {
      state.step = action.payload;
    },
    nextStep(state) {
      if (state.step < 4) {
        state.step = (state.step + 1) as CheckoutStep;
      }
    },
    prevStep(state) {
      if (state.step > 1) {
        state.step = (state.step - 1) as CheckoutStep;
      }
    },
    setShippingAddress(state, action: PayloadAction<ShippingAddress>) {
      state.shippingAddress = action.payload;
    },
    setDeliveryMethod(state, action: PayloadAction<DeliveryMethod>) {
      state.deliveryMethod = action.payload;
    },
    setPaymentMethod(
      state,
      action: PayloadAction<"razorpay" | "stripe" | "paypal">,
    ) {
      state.paymentMethod = action.payload;
    },
    setProcessing(state, action: PayloadAction<boolean>) {
      state.isProcessing = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetCheckout() {
      return initialState;
    },
  },
});

export const {
  setStep,
  nextStep,
  prevStep,
  setShippingAddress,
  setDeliveryMethod,
  setPaymentMethod,
  setProcessing,
  setError,
  resetCheckout,
} = checkoutSlice.actions;

export const selectCheckout = (state: { checkout: CheckoutState }) =>
  state.checkout;
export const selectCheckoutStep = (state: { checkout: CheckoutState }) =>
  state.checkout.step;

export default checkoutSlice.reducer;
