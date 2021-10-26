import { Category } from "../models";
import axiosClient from "./axiosClient";

const url = "/categories";

const categoriesApi = {
  getAllCategories() {
    return axiosClient.get<Category[], any>(url);
  },
  addParent(data: FormData) {
    return axiosClient.post<Category, Category>(url, data);
  },
};

export default categoriesApi;
