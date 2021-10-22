import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import categoriesApi from "../../api/categoriesApi";
import { Category } from "../../models";

const categoriesInitialState: Category[] = [];

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    const categories = await categoriesApi.getAllCategories();
    return categories;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: { categoriesInitialState },
  reducers: {},
  // extraReducers: (builder) => {
  //   builder.addCase(getAllCategories.fulfilled, (state, action) => {
  //     state.categoriesInitialState = action.payload;
  //   });
  // },
});
