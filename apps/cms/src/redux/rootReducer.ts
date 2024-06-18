import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./auth/auth.reducer";
import { CategoryReducer } from "./menu/category/category.reducer";
import { ProductReducer } from "./menu/product/product.reducer";
import { OrderReducer } from "./order/order.reducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Category: CategoryReducer,
  Product: ProductReducer,
  order: OrderReducer,
});

export default rootReducer;
