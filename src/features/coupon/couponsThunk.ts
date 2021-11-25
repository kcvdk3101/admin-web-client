import { createAsyncThunk } from "@reduxjs/toolkit";
import couponsApi from "../../api/couponsApi";

type UpdateCouponInformation = {
  couponName: string;
  description: string;
  isUnlimited: boolean;
  limit: number;
  usage: number;
  pointToAchieve: number;
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
    await couponsApi.addNewCoupon(data);
  }
);

export const updateCouponInformation = createAsyncThunk(
  "coupons/updateCouponInformation",
  async ({
    id,
    data,
  }: {
    id: string | undefined;
    data: UpdateCouponInformation;
  }) => {
    console.log(data);
    await couponsApi.updateCouponInformation(id, data);
    // console.log(response);
    // return { ...response };
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
