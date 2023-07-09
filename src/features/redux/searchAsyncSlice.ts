import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postData from "../api/postData";
import { PostDataProps } from "../types/Api";

export interface SearchAsyncState {
  value: PostDataProps;
  status: "idle" | "loading" | "failed";
}

const initialState: SearchAsyncState = {
  value: {
    startDate: "2017-08-01",
    endDate: "2017-09-30",
    timeUnit: "month",
    category: "50000000",
    keyword: "정장",
    device: "",
    gender: "",
    ages: ["10", "20"],
  },
  status: "idle",
};

const searchAsync = createAsyncThunk(
  "searchAsyncSlice/searchAsync",
  async (value: PostDataProps) => {
    const response = await postData(value);
    return response;
  }
);

const searchAsyncSlice = createSlice({
  name: "searchAsync",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = action.payload;
      })
      .addCase(searchAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default searchAsyncSlice;
export { searchAsync };
