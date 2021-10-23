import { Category } from "../models";
import axiosClient from "./axiosClient";

const categoriesApi = {
  getAllCategories() {
    const url = "/categories";
    return axiosClient.get<Category[], any>(url);
  },
};

export default categoriesApi;
