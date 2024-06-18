import { createSlice } from "@reduxjs/toolkit";
import { BaseReducer } from "../../type";
import { Product } from "./type";
import { ActionType } from "../..";
import { extraReducers } from "../../store";
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
} from "./product.action";

export type ProductState = {
  products: Product[];
  product?: Product;
} & BaseReducer;

const initialState: ProductState = {
  loading: false,
  error: false,
  errorMessg: "",
  products: [],
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    extraReducers(builder, addProduct, {
      pending: (state) => state,
      fulfilled: (state) => {
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
    extraReducers(builder, getProduct, {
      pending: (state) => state,
      fulfilled: (state, action: ActionType<Product>) => {
        state.product = action.payload;
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
    extraReducers(builder, getProducts, {
      pending: (state) => state,
      fulfilled: (state, action: ActionType<Product[]>) => {
        state.products = action.payload;
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
    extraReducers(builder, updateProduct, {
      pending: (state) => state,
      fulfilled: (state, action: ActionType<Product>) => {
        state.product = action.payload;
        return state;
      },
      rejected: (state) => {
        return state;
      },
    });
  },
});

export const ProductReducer = ProductSlice.reducer;
