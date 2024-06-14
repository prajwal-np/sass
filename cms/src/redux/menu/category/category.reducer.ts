// import { createSlice } from "@reduxjs/toolkit";
// import { signIn } from "./category.action";
// import { extraReducers } from "../store";
// import { ActionType } from "..";

// export interface AuthState {
//   loading: boolean;
//   error: boolean;
//   signIn: boolean;
// }

// const initialState: AuthState = {
//   loading: false,
//   error: false,
//   signIn: false,
// };

// export const AuthSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setSignIn: (state, action: ActionType<boolean>) => {
//       state.signIn = action.payload;
//       return state;
//     },
//   },
//   extraReducers: (builder) => {
//     extraReducers(builder, signIn, {
//       pending: (state) => ({ ...state, loading: true, error: false }),
//       fulfilled: (state, action: ActionType<boolean>) => {
//         state.signIn = action.payload;
//         return state;
//       },
//       rejected: (state) => {
//         state.signIn = false;
//         state.loading = false;
//         state.error = true;
//         return state;
//       },
//     });
//   },
// });

// // Action creators are generated for each case reducer function
// export const { setSignIn } = AuthSlice.actions;
// export const AuthReducer = AuthSlice.reducer;
