import { Category, ChilrenCategory } from "../models";
import axiosClient from "./axiosClient";

const url = "/categories";

const categoriesApi = {
  getAllCategories() {
    return axiosClient.get<any, Category[]>(url);
  },
  addParent(data: FormData) {
    return axiosClient.post<any, Category>(url, data);
  },
  addChild(data: FormData) {
    return axiosClient.post<any, ChilrenCategory>(url, data);
  },
};

export default categoriesApi;
