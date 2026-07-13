import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ProductFilters, SortOption, CategoryId, Material, Finish, Availability } from "../types/product";
import { PRICE_RANGE } from "../data/products";

interface ProductsState {
  filters: ProductFilters;
  recentlyViewedIds: string[];
  searchHistory: string[];
  isSearchOpen: boolean;
}

const initialState: ProductsState = {
  filters: {
    category: null,
    priceRange: PRICE_RANGE,
    materials: [],
    finishes: [],
    availability: [],
    minRating: null,
    sortBy: "newest",
    searchQuery: "",
  },
  recentlyViewedIds: [],
  searchHistory: [],
  isSearchOpen: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<CategoryId | null>) {
      state.filters.category = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.filters.priceRange = action.payload;
    },
    toggleMaterial(state, action: PayloadAction<Material>) {
      const idx = state.filters.materials.indexOf(action.payload);
      if (idx === -1) {
        state.filters.materials.push(action.payload);
      } else {
        state.filters.materials.splice(idx, 1);
      }
    },
    toggleFinish(state, action: PayloadAction<Finish>) {
      const idx = state.filters.finishes.indexOf(action.payload);
      if (idx === -1) {
        state.filters.finishes.push(action.payload);
      } else {
        state.filters.finishes.splice(idx, 1);
      }
    },
    toggleAvailability(state, action: PayloadAction<Availability>) {
      const idx = state.filters.availability.indexOf(action.payload);
      if (idx === -1) {
        state.filters.availability.push(action.payload);
      } else {
        state.filters.availability.splice(idx, 1);
      }
    },
    setMinRating(state, action: PayloadAction<number | null>) {
      state.filters.minRating = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortOption>) {
      state.filters.sortBy = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.searchQuery = action.payload;
    },
    resetFilters(state) {
      state.filters = { ...initialState.filters, priceRange: PRICE_RANGE };
    },
    addRecentlyViewed(state, action: PayloadAction<string>) {
      state.recentlyViewedIds = [
        action.payload,
        ...state.recentlyViewedIds.filter((id) => id !== action.payload),
      ].slice(0, 10);
    },
    addSearchHistory(state, action: PayloadAction<string>) {
      const q = action.payload.trim();
      if (!q) return;
      state.searchHistory = [
        q,
        ...state.searchHistory.filter((h) => h !== q),
      ].slice(0, 10);
    },
    clearSearchHistory(state) {
      state.searchHistory = [];
    },
    openSearch(state) {
      state.isSearchOpen = true;
    },
    closeSearch(state) {
      state.isSearchOpen = false;
    },
  },
});

export const {
  setCategory,
  setPriceRange,
  toggleMaterial,
  toggleFinish,
  toggleAvailability,
  setMinRating,
  setSortBy,
  setSearchQuery,
  resetFilters,
  addRecentlyViewed,
  addSearchHistory,
  clearSearchHistory,
  openSearch,
  closeSearch,
} = productsSlice.actions;

export const selectFilters = (state: { products: ProductsState }) =>
  state.products.filters;
export const selectRecentlyViewedIds = (state: { products: ProductsState }) =>
  state.products.recentlyViewedIds;
export const selectSearchHistory = (state: { products: ProductsState }) =>
  state.products.searchHistory;
export const selectIsSearchOpen = (state: { products: ProductsState }) =>
  state.products.isSearchOpen;

export default productsSlice.reducer;
