import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchAsyncSlice from "../features/redux/searchAsyncSlice";

export const store = configureStore({
  reducer: {
    searchAsync: searchAsyncSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
