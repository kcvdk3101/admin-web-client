import { Coupon } from "../models";
import axiosClient from "./axiosClient";

const url = "/coupons/all";

const couponsApi = {
  getAllCoupons(limit: number, offset: number) {
    return axiosClient.get<any, Coupon[]>(url);
  },
};

export default couponsApi;
