import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserState, UserProfile } from "../types/user";
import type { ShippingAddress } from "../types/order";

const initialState: UserState = {
  profile: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<UserProfile>) {
      state.profile = action.payload;
      state.isLoggedIn = true;
    },
    updateProfile(state, action: PayloadAction<Partial<UserProfile>>) {
      if (state.profile) {
        Object.assign(state.profile, action.payload);
      }
    },
    addAddress(state, action: PayloadAction<ShippingAddress>) {
      if (state.profile) {
        state.profile.addresses.push(action.payload);
      }
    },
    setDefaultAddress(state, action: PayloadAction<number>) {
      if (state.profile) {
        state.profile.defaultAddressIndex = action.payload;
      }
    },
    logout(state) {
      state.profile = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setProfile, updateProfile, addAddress, setDefaultAddress, logout } =
  userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.profile;
export const selectIsLoggedIn = (state: { user: UserState }) =>
  state.user.isLoggedIn;

export default userSlice.reducer;
