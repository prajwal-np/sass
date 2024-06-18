import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
// import logger from 'redux-logger';
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // .prepend(logger),
});

export type ActionType<T> = {
  payload: T;
  type: string;
  meta?: { arg: T };
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
