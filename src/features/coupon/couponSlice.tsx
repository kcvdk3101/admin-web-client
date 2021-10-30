import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import couponsApi from "../../api/couponsApi";
import { Coupon } from "../../models";

export interface CouponsSliceState {
  coupons: Coupon[];
}

const initialState: CouponsSliceState = {
  coupons: [],
};

export const getAllVendors = createAsyncThunk(
  "coupons/getAllCoupons",
  async () => {
    const coupons = await couponsApi.getAllCoupons(10, 0);
    return coupons;
  }
);

export const couponsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllVendors.fulfilled,
      (state, action: PayloadAction<Coupon[]>) => {
        state.coupons = action.payload;
      }
    );
  },
});

export default couponsSlice.reducer;
