import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage";
import cartReducer from "./slices/cartSlice";
import wishlistReducer from "./slices/wishlistSlice";
import productsReducer from "./slices/productsSlice";
import userReducer from "./slices/userSlice";
import checkoutReducer from "./slices/checkoutSlice";
import ordersReducer from "./slices/ordersSlice";

const rootReducer = combineReducers({
  cart: cartReducer,
  wishlist: wishlistReducer,
  products: productsReducer,
  user: userReducer,
  checkout: checkoutReducer,
  orders: ordersReducer,
});

const persistConfig = {
  key: "sandha-store",
  version: 1,
  storage,
  whitelist: ["cart", "wishlist", "user", "orders", "products"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function makeStore() {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  const persistor = persistStore(store);
  return { store, persistor };
}

export type AppStore = ReturnType<typeof makeStore>["store"];
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
