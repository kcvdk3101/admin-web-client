import { Vendor } from "../models";
import axiosClient from "./axiosClient";

const url = "/vendors?limit=8&offset=0";

const vendorsApi = {
  getAllVendors() {
    return axiosClient.get<
      string,
      { data: Vendor[]; pagination: { total: number } }
    >(url);
  },
};

export default vendorsApi;
