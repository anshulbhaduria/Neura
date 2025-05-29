import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import productDetailsReducer from "../features/productDetails/productDetailsSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    favorites: favoritesReducer,
  },
});
