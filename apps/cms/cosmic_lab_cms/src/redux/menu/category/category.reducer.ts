import { createSlice } from "@reduxjs/toolkit";
import { BaseReducer } from "../../type";
import { TCategory } from "./type";
import { ActionType } from "../..";
import { extraReducers } from "../../store";
import {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "./category.action";

export type CategoryState = {
  categories: TCategory[];
  category?: TCategory;
} & BaseReducer;

const initialState: CategoryState = {
  loading: false,
  error: false,
  errorMessg: "",
  categories: [],
};

export const CategorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducers(builder, addCategory, {
      pending: (state) => state,
      fulfilled: (state) => {
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
    extraReducers(builder, getCategory, {
      pending: (state) => state,
      fulfilled: (state, action: ActionType<TCategory>) => {
        state.category = action.payload;
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
    extraReducers(builder, getCategories, {
      pending: (state) => state,
      fulfilled: (state, action: ActionType<TCategory[]>) => {
        state.categories = action.payload;
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
    extraReducers(builder, updateCategory, {
      pending: (state) => state,
      fulfilled: (state, action: ActionType<TCategory>) => {
        state.category = action.payload;
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
  },
});

export const CategoryReducer = CategorySlice.reducer;
