import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./auth/auth.reducer";

const rootReducer = combineReducers({
  Auth: AuthReducer,
});

export default rootReducer;
