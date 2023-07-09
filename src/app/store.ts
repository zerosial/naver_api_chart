import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import searchAsyncSlice from "../features/redux/searchAsyncSlice";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Redux-persist
const rootReducer = combineReducers({
  searchAsync: searchAsyncSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["searchAsync"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store
export const store = configureStore({
  reducer: persistedReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
