import { configureStore } from "@reduxjs/toolkit";
import productsReducer, {
  fetchProducts,
  setSearchTerm,
  selectAllProducts,
  selectProductsStatus,
  selectSearchTerm,
  selectFilteredAndSortedProducts,
} from "./productsSlice";
import * as fakeStoreApi from "../../api/fakeStoreApi";

vi.mock("../../api/fakeStoreApi");

describe("productsSlice (Minimal Tests)", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { products: productsReducer },
    });

    vi.clearAllMocks();
  });

  it("should have correct initial state", () => {
    expect(store.getState().products.items).toEqual([]);
    expect(store.getState().products.status).toEqual("idle");
    expect(store.getState().products.searchTerm).toEqual("");
  });

  it("should handle setSearchTerm", () => {
    store.dispatch(setSearchTerm("test query"));
    expect(selectSearchTerm(store.getState())).toEqual("test query");
  });

  it("should fetch products and update state on fulfilled", async () => {
    const mockProducts = [{ id: 1, title: "Product A", price: 100 }];
    fakeStoreApi.fetchProducts.mockResolvedValueOnce(mockProducts);

    await store.dispatch(fetchProducts());
    expect(selectProductsStatus(store.getState())).toEqual("succeeded");
    expect(selectAllProducts(store.getState())).toEqual(mockProducts);
  });

  it("should filter and sort products correctly via selector", () => {
    const preloadedState = {
      products: {
        items: [
          {
            id: 1,
            title: "Apple Laptop",
            price: 1500,
            category: "electronics",
          },
          { id: 2, title: "Banana Shirt", price: 20, category: "clothing" },
          {
            id: 3,
            title: "Cherry Keyboard",
            price: 80,
            category: "electronics",
          },
        ],
        searchTerm: "laptop",
        selectedCategory: "all",
        sortBy: "price-desc",
        status: "succeeded",
        error: null,
      },
    };
    const tempStore = configureStore({
      reducer: { products: productsReducer },
      preloadedState,
    });

    const result = selectFilteredAndSortedProducts(tempStore.getState());
    expect(result).toEqual([
      { id: 1, title: "Apple Laptop", price: 1500, category: "electronics" },
    ]);
  });
});
