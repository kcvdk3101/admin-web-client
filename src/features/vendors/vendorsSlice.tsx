import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import categoriesApi from "../../api/categoriesApi";
import vendorsApi from "../../api/vendorsApi";
import { Category, ChilrenCategory, Vendor } from "../../models";

export interface VendorsSliceState {
  vendors: Vendor[];
}

const initialState: VendorsSliceState = {
  vendors: [],
};

export const getAllVendors = createAsyncThunk(
  "vendors/getAllVendors",
  async () => {
    const categories = await vendorsApi.getAllVendors();
    return categories;
  }
);

export const activateVendorById = createAsyncThunk(
  "vendors/activateVendorById",
  async (id: string) => {
    const activatedVendor = await axiosClient.patch<any, Vendor>(
      `/vendors/${id}`,
      {
        active: true,
      }
    );
    console.log(activatedVendor);
    return activatedVendor;
  }
);

export const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllVendors.fulfilled,
      (state, action: PayloadAction<Vendor[]>) => {
        state.vendors = action.payload;
      }
    );
    builder.addCase(
      activateVendorById.fulfilled,
      (state, action: PayloadAction<Vendor>) => {
        const vendor = state.vendors.findIndex(
          (vendor) => vendor.id === action.payload.id
        );
        state.vendors[vendor].isActive = action.payload.isActive;
      }
    );
  },
});

export default vendorsSlice.reducer;
