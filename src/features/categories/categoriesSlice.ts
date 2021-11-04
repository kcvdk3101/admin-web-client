import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import categoriesApi from "../../api/categoriesApi";
import { Category, ChilrenCategory } from "../../models";

export interface CategoriesSliceState {
  categories: Category[];
  fetchingCategories: boolean;
}

export const initialState: CategoriesSliceState = {
  categories: [],
  fetchingCategories: false,
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
    builder.addCase(getAllCategories.pending, (state, action) => {
      state.fetchingCategories = true;
    });
    builder.addCase(
      getAllCategories.fulfilled,
      (state, action: PayloadAction<Category[]>) => {
        state.fetchingCategories = false;
        state.categories = action.payload;
      }
    );
    builder.addCase(getAllCategories.rejected, (state, action) => {
      state.fetchingCategories = false;
    });
    builder.addCase(
      addParentCategory.fulfilled,
      (state, action: PayloadAction<Category>) => {
        state.categories = [...state.categories, action.payload];
      }
    );
    builder.addCase(addChildCategory.pending, (state, action) => {
      state.fetchingCategories = true;
    });
    builder.addCase(
      addChildCategory.fulfilled,
      (state, action: PayloadAction<ChilrenCategory>) => {
        (state.fetchingCategories = false),
          state.categories.find((category) =>
            category.id === action.payload.parentId
              ? category.children?.push(action.payload)
              : category.children?.find(
                  (child) =>
                    child.id === action.payload.parentId &&
                    child.children?.push(action.payload)
                )
          );
        console.log(state.categories);
      }
    );
  },
});

export default categoriesSlice.reducer;
