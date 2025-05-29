import { configureStore } from "@reduxjs/toolkit";
import productDetailsReducer, {
  fetchProductDetails,
  selectCurrentProduct,
  selectProductDetailsStatus,
} from "./productDetailsSlice";
import * as fakeStoreApi from "../../api/fakeStoreApi";

vi.mock("../../api/fakeStoreApi");

describe("productDetailsSlice (Minimal Tests)", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { productDetails: productDetailsReducer },
    });
    vi.clearAllMocks();
  });

  it("should have correct initial state", () => {
    expect(store.getState().productDetails.currentProduct).toBeNull();
    expect(store.getState().productDetails.status).toEqual("idle");
  });

  it("should fetch product details and update state on fulfilled", async () => {
    const mockProduct = { id: 1, title: "Single Product Detail", price: 200 };
    fakeStoreApi.fetchProductById.mockResolvedValueOnce(mockProduct);

    await store.dispatch(fetchProductDetails(1));
    expect(selectProductDetailsStatus(store.getState())).toEqual("succeeded");
    expect(selectCurrentProduct(store.getState())).toEqual(mockProduct);
  });
});
