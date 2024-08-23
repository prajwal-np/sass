import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./auth/auth.reducer";
import { CategoryReducer } from "./menu/category/category.reducer";
import { ProductReducer } from "./menu/product/product.reducer";
import { OrderReducer } from "./order/order.reducer";
import { DashboardReducer } from "./dashboard/dashboard.reducer";
import { DeviceReducer } from "./devices/device.reducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
  Category: CategoryReducer,
  Product: ProductReducer,
  order: OrderReducer,
  Dashboard: DashboardReducer,
  Device: DeviceReducer,
});

export default rootReducer;
