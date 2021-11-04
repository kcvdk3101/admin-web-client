import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosClient from "../../api/axiosClient";
import vendorsApi from "../../api/vendorsApi";
import { Vendor } from "../../models";

export interface VendorsSliceState {
  fetchingVendor: boolean;
  vendors: Vendor[];
  pagination: VendorPagination;
}

export interface VendorPagination {
  total: number;
}

const initialState: VendorsSliceState = {
  vendors: [],
  fetchingVendor: false,
  pagination: { total: 0 },
};

export const getAllVendors = createAsyncThunk(
  "vendors/getAllVendors",
  async (offset: number) => {
    const response = await vendorsApi.getAllVendors(offset);
    console.log(response);
    return { ...response };
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
    return activatedVendor;
  }
);

export const vendorsSlice = createSlice({
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllVendors.pending, (state, action) => {
      state.fetchingVendor = true;
    });

    builder.addCase(
      getAllVendors.fulfilled,
      (
        state,
        action: PayloadAction<{ data: Vendor[]; pagination: VendorPagination }>
      ) => {
        state.fetchingVendor = false;
        state.vendors = action.payload.data;
        state.pagination.total = action.payload.pagination.total;
      }
    );
    builder.addCase(getAllVendors.rejected, (state, action) => {
      state.fetchingVendor = false;
    });
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
