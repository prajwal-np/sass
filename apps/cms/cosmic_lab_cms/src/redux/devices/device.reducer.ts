import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "../store";
import { ActionType } from "..";
import { BaseReducer } from "../type";
import { TDevice } from "./type";
import { getDevices } from "./device.action";
import { BasePagination, Pagination } from "../../types/api";

export type DeivceState = {
  devices: TDevice[];
  pagination: BasePagination;
} & BaseReducer;

const initialState: DeivceState = {
  loading: false,
  error: false,
  errorMessg: "",
  devices: [],
  pagination: {
    limit: 10,
    page: 1,
    total: 1,
  },
};

export const DeviceSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducers(builder, getDevices, {
      pending: (state) => ({ ...state, loading: true, error: false }),
      fulfilled: (state, action: ActionType<Pagination<TDevice[]>>) => {
        state.devices = action.payload.data;
        state.pagination = action.payload;
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
export const DeviceReducer = DeviceSlice.reducer;
