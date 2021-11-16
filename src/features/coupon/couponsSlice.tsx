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

export const getAllCouponsByCouponType = createAsyncThunk(
  "coupons/getAllCouponsByCouponType",
  async ({ offset, couponType }: { offset: number; couponType: string }) => {
    const couponsFilteredByCouponType =
      await couponsApi.getAllCouponsByCouponType(offset, couponType);
    return couponsFilteredByCouponType;
  }
);

export const addNewCoupon = createAsyncThunk(
  "coupons/addNewCoupon",
  async (data: FormData) => {
    const coupon = await couponsApi.addNewCoupon(data);
    console.log(coupon);
    return { ...coupon };
  }
);

export const updateStatusCoupon = createAsyncThunk(
  "coupons/updateStatusCoupon",
  async (id: string) => {
    const response = await couponsApi.updateCouponStatus(id);
    return { ...response };
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
    // Get all coupons
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

    // Get coupons by couponType
    builder.addCase(getAllCouponsByCouponType.pending, (state, action) => {
      state.fetchingCoupons = true;
    });
    builder.addCase(
      getAllCouponsByCouponType.fulfilled,
      (
        state,
        action: PayloadAction<{ data: Coupon[]; pagination: CouponsPagination }>
      ) => {
        state.fetchingCoupons = false;
        state.coupons = action.payload.data;
        state.pagination.total = action.payload.pagination.total;
      }
    );
    builder.addCase(getAllCouponsByCouponType.rejected, (state, action) => {
      state.fetchingCoupons = false;
    });

    // Delete coupon by id
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

    // Add new coupon
    builder.addCase(addNewCoupon.pending, (state, action) => {
      state.fetchingCoupons = true;
    });
    builder.addCase(addNewCoupon.fulfilled, (state, action) => {
      state.fetchingCoupons = false;
    });
    builder.addCase(addNewCoupon.rejected, (state, action) => {
      state.fetchingCoupons = false;
    });

    // Update activation of coupon
    builder.addCase(
      updateStatusCoupon.fulfilled,
      (state, action: PayloadAction<Coupon>) => {
        const coupon = state.coupons.findIndex(
          (coupon) => coupon.id === action.payload.id
        );
        state.coupons[coupon].isActive = action.payload.isActive;
      }
    );
  },
});

export default couponsSlice.reducer;
