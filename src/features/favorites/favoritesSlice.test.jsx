import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer, {
  toggleFavorite,
  selectFavoriteProducts,
} from "./favoritesSlice";

describe("favoritesSlice (Minimal Tests)", () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: { favorites: favoritesReducer },
    });
  });

  it("should start with an empty favorites list", () => {
    expect(store.getState().favorites.items).toEqual([]);
  });

  it("should add and then remove a product using toggleFavorite", () => {
    const product = { id: 1, title: "Favorite Item" };

    store.dispatch(toggleFavorite(product));
    expect(selectFavoriteProducts(store.getState())).toEqual([product]);

    store.dispatch(toggleFavorite(product));
    expect(selectFavoriteProducts(store.getState())).toEqual([]);
  });
});
