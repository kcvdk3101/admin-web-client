import { Vendor } from "../models";
import axiosClient from "./axiosClient";

const url = "/vendors";

const vendorsApi = {
  getAllVendors() {
    return axiosClient.get<any, Vendor[]>(url);
  },
};

export default vendorsApi;
