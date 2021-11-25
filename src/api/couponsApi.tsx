import { Coupon } from "../models";
import axiosClient from "./axiosClient";

const url = "/coupons";

const couponsApi = {
  getAllCoupons(offset: number) {
    return axiosClient.get<string, { data: Coupon[]; pagination: any }>(
      `${url}/all?limit=6&offset=${offset}`
    );
  },

  getAllCouponsByCouponType(offset: number, couponType: string) {
    return axiosClient.get<string, { data: Coupon[]; pagination: any }>(
      `${url}/all/type?limit=6&offset=${offset}&couponType=${couponType}`
    );
  },

  addNewCoupon(data: FormData) {
    return axiosClient.post<string, Coupon>(`${url}`, data);
  },
  updateCouponInformation(id: string | undefined, information: any) {
    return axiosClient.patch<string, any>(`${url}?id=${id}`, information);
  },

  updateCouponStatus(id: string) {
    return axiosClient.patch<string, Coupon>(`${url}/status?id=${id}`);
  },

  deleteCouponById(id: string) {
    return axiosClient.delete<string, Coupon>(`${url}/remove?id=${id}`);
  },
};

export default couponsApi;
