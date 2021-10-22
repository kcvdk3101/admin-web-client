import { Category } from "../models";
import axiosClient from "./axiosClient";

const categoriesApi = {
  getAllCategories() {
    const url = "/categories";
    return axiosClient.get<Category[]>(url);
  },
};

export default categoriesApi;
