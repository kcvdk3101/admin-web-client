import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import categoriesApi from "../../api/categoriesApi";
import { Category } from "../../models";

export interface CategoriesSliceState {
  categories: Category[];
}

const initialState: CategoriesSliceState = {
  categories: [],
};

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async () => {
    const categories = await categoriesApi.getAllCategories();
    return categories;
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllCategories.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.categories = action.payload;
      }
    );
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
