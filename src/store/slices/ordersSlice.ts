import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Order } from "../types/order";

interface OrdersState {
  items: Order[];
  currentOrder: Order | null;
}

const initialState: OrdersState = {
  items: [],
  currentOrder: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    placeOrder(state, action: PayloadAction<Order>) {
      state.items.unshift(action.payload);
      state.currentOrder = action.payload;
    },
    setCurrentOrder(state, action: PayloadAction<Order | null>) {
      state.currentOrder = action.payload;
    },
    updateOrderStatus(
      state,
      action: PayloadAction<{ orderId: string; status: Order["status"] }>,
    ) {
      const order = state.items.find((o) => o.id === action.payload.orderId);
      if (order) {
        order.status = action.payload.status;
        order.updatedAt = new Date().toISOString();
      }
    },
  },
});

export const { placeOrder, setCurrentOrder, updateOrderStatus } =
  ordersSlice.actions;

export const selectOrders = (state: { orders: OrdersState }) =>
  state.orders.items;
export const selectCurrentOrder = (state: { orders: OrdersState }) =>
  state.orders.currentOrder;

export default ordersSlice.reducer;
