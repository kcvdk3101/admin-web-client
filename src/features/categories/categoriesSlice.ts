import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import categoriesApi from "../../api/categoriesApi";
import { Category, ChilrenCategory } from "../../models";

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

export const addParentCategory = createAsyncThunk(
  "categories/addParent",
  async (data: FormData) => {
    const parentCategory = await categoriesApi.addParent(data);
    return parentCategory;
  }
);

export const addChildCategory = createAsyncThunk(
  "categories/addChild",
  async (data: FormData) => {
    const childCategory = await categoriesApi.addChild(data);
    return childCategory;
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
    builder.addCase(
      addParentCategory.fulfilled,
      (state, action: PayloadAction<Category>) => {
        state.categories = [...state.categories, action.payload];
      }
    );
    builder.addCase(
      addChildCategory.fulfilled,
      (state, action: PayloadAction<ChilrenCategory>) => {
        state.categories
          .find((category) => category.id === action.payload.parentId)
          ?.children?.push(action.payload);
      }
    );
  },
});

export const {} = categoriesSlice.actions;

export default categoriesSlice.reducer;
