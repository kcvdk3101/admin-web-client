import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import couponsApi from "../../api/couponsApi";
import { Coupon } from "../../models";

export interface CouponsSliceState {
  fetchingCoupons: boolean;
  coupons: Coupon[];
  pagination: CouponsPagination;
}

export interface CouponsPagination {
  total: number;
}

const initialState: CouponsSliceState = {
  fetchingCoupons: false,
  coupons: [],
  pagination: { total: 0 },
};

export const getAllCoupons = createAsyncThunk(
  "coupons/getAllCoupons",
  async (offset: number) => {
    const coupons = await couponsApi.getAllCoupons(offset);
    return { ...coupons };
  }
);

export const deleteCouponById = createAsyncThunk(
  "coupons/deleteCouponById",
  async (id: string) => {
    const coupon = await couponsApi.deleteCouponById(id);
    return coupon;
  }
);

export const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCoupons.pending, (state, action) => {
      state.fetchingCoupons = true;
    });
    builder.addCase(
      getAllCoupons.fulfilled,
      (
        state,
        action: PayloadAction<{ data: Coupon[]; pagination: CouponsPagination }>
      ) => {
        state.fetchingCoupons = false;
        state.coupons = action.payload.data;
        state.pagination.total = action.payload.pagination.total;
      }
    );
    builder.addCase(getAllCoupons.rejected, (state, action) => {
      state.fetchingCoupons = false;
    });

    builder.addCase(deleteCouponById.pending, (state, action) => {
      state.fetchingCoupons = true;
    });
    builder.addCase(
      deleteCouponById.fulfilled,
      (state, action: PayloadAction<Coupon>) => {
        state.fetchingCoupons = false;
        state.coupons = [
          ...state.coupons.filter((coupon) => coupon.id !== action.payload.id),
        ];
      }
    );
    builder.addCase(deleteCouponById.rejected, (state, action) => {
      state.fetchingCoupons = false;
    });
  },
});

export default couponsSlice.reducer;
