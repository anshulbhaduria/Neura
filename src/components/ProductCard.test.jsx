import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import ProductCard from "./ProductCard";

describe("ProductCard (Minimal Tests)", () => {
  const mockProduct = {
    id: 1,
    title: "Test Product",
    price: 50.0,
    image: "test-image.jpg",
    category: "test",
    description: "desc",
  };

  it('should render product title, price, image and "Add to Favorites" button', () => {
    render(
      <Router>
        <ProductCard
          product={mockProduct}
          onToggleFavorite={() => {}}
          isFavorite={false}
        />
      </Router>
    );

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();
    expect(screen.getByAltText("Test Product")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add to favorites/i })
    ).toBeInTheDocument();
  });

  it("should call onToggleFavorite when button is clicked", () => {
    const mockToggle = vi.fn();
    render(
      <Router>
        <ProductCard
          product={mockProduct}
          onToggleFavorite={mockToggle}
          isFavorite={false}
        />
      </Router>
    );

    const button = screen.getByRole("button", { name: /add to favorites/i });
    fireEvent.click(button);
    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(mockProduct);
  });
});
