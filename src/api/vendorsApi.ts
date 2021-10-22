import axiosClient from "./axiosClient";

const vendorsApi = {
  getAllVendors() {
    const url = "/vendors";
    return axiosClient.get(url);
  },
};

export default vendorsApi;
