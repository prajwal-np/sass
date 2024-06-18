import { createSlice } from "@reduxjs/toolkit";

import { OrderResponse } from "./type";

import { getOrders, getOrder, updateOrder } from "./order.action";
import { extraReducers } from "../store";
import { ActionType } from "..";
import { BaseReducer } from "../type";

export type OrderState = {
  orders: OrderResponse[];
  order?: OrderResponse;
} & BaseReducer;

const initialState: OrderState = {
  loading: false,
  error: false,
  errorMessg: "",
  orders: [],
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducers(builder, getOrder, {
      pending: (state) => state,
      fulfilled: (state, action: ActionType<OrderResponse>) => {
        state.order = action.payload;
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
    extraReducers(builder, getOrders, {
      pending: (state) => state,
      fulfilled: (state, action: ActionType<OrderResponse[]>) => {
        state.orders = action.payload;
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
    extraReducers(builder, updateOrder, {
      pending: (state) => state,
      fulfilled: (state, action: ActionType<OrderResponse>) => {
        state.order = action.payload;
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
  },
});

export const OrderReducer = OrderSlice.reducer;
