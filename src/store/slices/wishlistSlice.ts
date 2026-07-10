import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WishlistState {
  productIds: string[];
}

const initialState: WishlistState = {
  productIds: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<string>) {
      if (!state.productIds.includes(action.payload)) {
        state.productIds.push(action.payload);
      }
    },
    removeFromWishlist(state, action: PayloadAction<string>) {
      state.productIds = state.productIds.filter((id) => id !== action.payload);
    },
    toggleWishlist(state, action: PayloadAction<string>) {
      const idx = state.productIds.indexOf(action.payload);
      if (idx === -1) {
        state.productIds.push(action.payload);
      } else {
        state.productIds.splice(idx, 1);
      }
    },
    clearWishlist(state) {
      state.productIds = [];
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export const selectWishlistIds = (state: { wishlist: WishlistState }) =>
  state.wishlist.productIds;

export const selectIsInWishlist =
  (productId: string) => (state: { wishlist: WishlistState }) =>
    state.wishlist.productIds.includes(productId);

export const selectWishlistCount = (state: { wishlist: WishlistState }) =>
  state.wishlist.productIds.length;

export default wishlistSlice.reducer;
