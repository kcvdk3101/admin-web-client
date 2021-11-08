import { Coupon } from "../models";
import axiosClient from "./axiosClient";

const url = "/coupons/all?limit=6&offset=";

const couponsApi = {
  getAllCoupons(offset: number) {
    return axiosClient.get<string, { data: Coupon[]; pagination: any }>(
      `/coupons/all?limit=6&offset=${offset}`
    );
  },
};

export default couponsApi;
