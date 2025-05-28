import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProducts as fetchProductsApi } from "../../api/fakeStoreApi";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProductsApi();
      return products;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    searchTerm: "",
    selectedCategory: "all",
    sortBy: "price-asc",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const { setSearchTerm, setSelectedCategory, setSortBy } =
  productsSlice.actions;
export const selectSearchTerm = (state) => state.products.searchTerm;
export const selectSelectedCategory = (state) =>
  state.products.selectedCategory;
export const selectSortBy = (state) => state.products.sortBy;

export const selectFilteredAndSortedProducts = (state) => {
  const products = selectAllProducts(state);
  const searchTerm = selectSearchTerm(state).toLowerCase();
  const selectedCategory = selectSelectedCategory(state);
  const sortBy = selectSortBy(state);

  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );

  if (selectedCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === selectedCategory
    );
  }

  return filteredProducts.slice().sort((a, b) => {
    if (sortBy === "price-asc") {
      return a.price - b.price;
    } else if (sortBy === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });
};

export default productsSlice.reducer;
