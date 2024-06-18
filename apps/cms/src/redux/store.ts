/* eslint-disable*/
import {
  type ActionReducerMapBuilder,
  type PayloadAction,
  type Draft,
  type AsyncThunk,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import { BaseReducer, StateReducer } from "./type";
import { toast } from "react-toastify";
interface ReduxStatusType<T, A> {
  pending(_state: Draft<T>, _action: A): T;
  fulfilled(_state: Draft<T>, _action: A): T;
  rejected(_state: Draft<T>, _action: A): T;
}

export function extraReducers<T, R, P>(
  builder: ActionReducerMapBuilder<T & BaseReducer>,
  actionCreator: AsyncThunk<R, P, any>,
  reduxStatus: ReduxStatusType<T & BaseReducer, PayloadAction<unknown>>
) {
  return builder
    .addCase(actionCreator.fulfilled, (state, action) =>
      reduxStatus.fulfilled(
        { ...state, loading: false, error: false, errorMessg: "" },
        action
      )
    )
    .addCase(actionCreator.pending, (state, action) =>
      reduxStatus.pending(
        { ...state, loading: true, error: false, errorMessg: "" },
        action
      )
    )
    .addCase(actionCreator.rejected, (state, action: any) =>
      reduxStatus.rejected(
        {
          ...state,
          loading: false,
          error: true,
          errorMessg: action.payload.error,
        },
        action
      )
    );
}
export function createThunk<Returned, ThunkArg = any>(
  type: string,
  thunk: AsyncThunkPayloadCreator<Promise<Returned>, ThunkArg>
): AsyncThunk<Returned, ThunkArg, any> {
  return createAsyncThunk<Returned, ThunkArg>(type, async (arg, thunkAPI) => {
    try {
      return await thunk(arg, thunkAPI);
    } catch (err: any) {
      toast(err.message, {
        type: "error",
        hideProgressBar: true,
      });
      return thunkAPI.rejectWithValue(err);
    }
  });
}
