import { createSlice } from "@reduxjs/toolkit";

import { extraReducers } from "../store";
import { ActionType } from "..";
import { BaseReducer } from "../type";
import { TDateRange } from "./type";
import { getReport } from "./report.action";

export type ReportState = {
  dateRange: TDateRange;
  file?: Blob;
} & BaseReducer;

const initialState: ReportState = {
  loading: false,
  error: false,
  errorMessg: "",
  dateRange: {
    fromDate: "",
    toDate: "",
  },
};

export const ReportSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDateRange: (state: ReportState, action: ActionType<TDateRange>) => {
      state.dateRange = action.payload;
      return state;
    },
  },
  extraReducers: (builder) => {
    extraReducers(builder, getReport, {
      pending: (state) => ({ ...state, loading: true, error: false }),
      fulfilled: (state, action: ActionType<Blob>) => {
        state.file = action.payload;
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

export const { setDateRange } = ReportSlice.actions;
// Action creators are generated for each case reducer function
export const ReportReducer = ReportSlice.reducer;
