import { Coupon } from "../models";
import axiosClient from "./axiosClient";

const url = "/coupons";

const couponsApi = {
  getAllCoupons(offset: number) {
    return axiosClient.get<string, { data: Coupon[]; pagination: any }>(
      `${url}/all?limit=6&offset=${offset}`
    );
  },

  addNewCoupon(data: FormData) {
    return axiosClient.post<string, Coupon>(`${url}`, data);
  },

  deleteCouponById(id: string) {
    return axiosClient.delete<string, Coupon>(`${url}/remove?id=${id}`);
  },

  updateCouponStatus(id: string) {
    return axiosClient.patch<string, Coupon>(`${url}/status?id=${id}`);
  },

  updateCouponInformation(id: string, information: any) {
    return axiosClient.patch<string, any>(`${url}?id=${id}`, information);
  },
};

export default couponsApi;
