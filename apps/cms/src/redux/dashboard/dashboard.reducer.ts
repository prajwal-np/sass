import { createSlice } from "@reduxjs/toolkit";
import {
  getBarData,
  getDashboardCard,
  getLineData,
  getOrderOverview,
  getPaymentOverview,
} from "./dashboard.action";
import { extraReducers } from "../store";
import { ActionType } from "..";
import { BaseReducer } from "../type";
import { CardResponse, TChartData } from "./type";

export type DashboardState = {
  cardValue: CardResponse;
  lineData: TChartData[];
  barData: TChartData[];
  paymentOverView: TChartData[];
  orderOverView: TChartData[];
} & BaseReducer;

const initialState: DashboardState = {
  loading: false,
  error: false,
  errorMessg: "",
  cardValue: {
    totalOrderCount: 0,
    totalOrderTodayCount: 0,
    totalRevenue: "",
  },
  lineData: [],
  barData: [],
  paymentOverView: [],
  orderOverView: [],
};

export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducers(builder, getDashboardCard, {
      pending: (state) => ({ ...state, loading: true, error: false }),
      fulfilled: (state, action: ActionType<CardResponse>) => {
        state.cardValue = action.payload;
        return state;
      },
      rejected: (state) => {
        state.loading = false;
        state.error = true;
        return state;
      },
    });
    extraReducers(builder, getLineData, {
      pending: (state) => ({ ...state, loading: true, error: false }),
      fulfilled: (state, action: ActionType<TChartData[]>) => {
        state.lineData = action.payload;
        return state;
      },
      rejected: (state) => {
        state.loading = false;
        state.error = true;
        return state;
      },
    });
    extraReducers(builder, getBarData, {
      pending: (state) => ({ ...state, loading: true, error: false }),
      fulfilled: (state, action: ActionType<TChartData[]>) => {
        state.barData = action.payload;
        return state;
      },
      rejected: (state) => {
        state.loading = false;
        state.error = true;
        return state;
      },
    });
    extraReducers(builder, getPaymentOverview, {
      pending: (state) => ({ ...state, loading: true, error: false }),
      fulfilled: (state, action: ActionType<TChartData[]>) => {
        state.paymentOverView = action.payload;
        return state;
      },
      rejected: (state) => {
        state.loading = false;
        state.error = true;
        return state;
      },
    });
    extraReducers(builder, getOrderOverview, {
      pending: (state) => ({ ...state, loading: true, error: false }),
      fulfilled: (state, action: ActionType<TChartData[]>) => {
        state.orderOverView = action.payload;
        return state;
      },
      rejected: (state) => {
        state.loading = false;
        state.error = true;
        return state;
      },
    });
  },
});

// Action creators are generated for each case reducer function
export const DashboardReducer = DashboardSlice.reducer;
