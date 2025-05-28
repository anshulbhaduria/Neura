import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductById as fetchProductByIdApi } from "../../api/fakeStoreApi";

export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const product = await fetchProductByIdApi(productId);
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState: {
    currentProduct: null,
    status: "idle",
    error: null,
  },
  reducers: {
    clearProductDetails: (state) => {
      state.currentProduct = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.status = "loading";
        state.currentProduct = null;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProductDetails } = productDetailsSlice.actions;

export const selectCurrentProduct = (state) =>
  state.productDetails.currentProduct;
export const selectProductDetailsStatus = (state) =>
  state.productDetails.status;
export const selectProductDetailsError = (state) => state.productDetails.error;

export default productDetailsSlice.reducer;
