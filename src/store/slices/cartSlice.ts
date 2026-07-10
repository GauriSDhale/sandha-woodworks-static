import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CartItem, CartState, Coupon } from "../types/cart";
import { VALID_COUPONS } from "../types/cart";

const initialState: CartState = {
  items: [],
  coupon: null,
  isDrawerOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId,
      );
      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.isDrawerOpen = true;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.productId !== action.payload);
    },
    updateQuantity(
      state,
      action: PayloadAction<{ productId: string; quantity: number }>,
    ) {
      const item = state.items.find(
        (i) => i.productId === action.payload.productId,
      );
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
      }
    },
    clearCart(state) {
      state.items = [];
      state.coupon = null;
    },
    applyCoupon(state, action: PayloadAction<string>) {
      const code = action.payload.toUpperCase().trim();
      const coupon = VALID_COUPONS.find((c) => c.code === code);
      if (coupon) {
        state.coupon = coupon;
      }
    },
    removeCoupon(state) {
      state.coupon = null;
    },
    openDrawer(state) {
      state.isDrawerOpen = true;
    },
    closeDrawer(state) {
      state.isDrawerOpen = false;
    },
    toggleDrawer(state) {
      state.isDrawerOpen = !state.isDrawerOpen;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
  openDrawer,
  closeDrawer,
  toggleDrawer,
} = cartSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectCartItems = (state: { cart: CartState }) => state.cart.items;
export const selectCoupon = (state: { cart: CartState }) => state.cart.coupon;
export const selectIsDrawerOpen = (state: { cart: CartState }) =>
  state.cart.isDrawerOpen;

export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((acc, i) => acc + i.quantity, 0);

export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((acc, i) => acc + i.price * i.quantity, 0);

export const selectCartDiscount = (state: { cart: CartState }) => {
  const subtotal = selectCartSubtotal(state);
  const { coupon } = state.cart;
  if (!coupon) return 0;
  return coupon.type === "percentage"
    ? Math.round(subtotal * (coupon.value / 100))
    : coupon.value;
};

export const selectCartGST = (state: { cart: CartState }) => {
  const subtotal = selectCartSubtotal(state);
  const discount = selectCartDiscount(state);
  return Math.round((subtotal - discount) * 0.13); // Ontario HST 13%
};

export default cartSlice.reducer;
