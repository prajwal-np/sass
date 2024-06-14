/* eslint-disable*/
import {
  type ActionReducerMapBuilder,
  type PayloadAction,
  type Draft,
  type AsyncThunk,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import type { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";

interface ReduxStatusType<T, A> {
  pending(_state: Draft<T>, _action: A): T;
  fulfilled(_state: Draft<T>, _action: A): T;
  rejected(_state: Draft<T>, _action: A): T;
}

export function extraReducers<T, R, P>(
  builder: ActionReducerMapBuilder<T>,
  actionCreator: AsyncThunk<R, P, any>,
  reduxStatus: ReduxStatusType<T, PayloadAction<unknown>>
) {
  return builder
    .addCase(actionCreator.fulfilled, (state, action) =>
      reduxStatus.fulfilled(state, action)
    )
    .addCase(actionCreator.pending, (state, action) =>
      reduxStatus.pending(state, action)
    )
    .addCase(actionCreator.rejected, (state, action: any) =>
      reduxStatus.rejected(state, action)
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
      const errorObj = err.response.data.error;
      if (!err.response.config.url.includes("pos/order")) {
        if (typeof errorObj === "object") {
          const entries: any = Object.entries(errorObj);
        } else if (err.response.data.message)
          if (
            err.response.status == 401 ||
            err.response.data.message === "Device not found"
          ) {
            // thunkAPI.dispatch(clearLocal());
            // thunkAPI.dispatch(setDrawerStatus(false));
          }
      }
      return thunkAPI.rejectWithValue(err.response);
    }
  });
}
