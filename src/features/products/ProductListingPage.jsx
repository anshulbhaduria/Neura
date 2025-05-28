import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  setSearchTerm,
  setSelectedCategory,
  setSortBy,
  selectFilteredAndSortedProducts,
  selectProductsStatus,
  selectSearchTerm,
  selectSelectedCategory,
  selectSortBy,
  selectProductsError,
} from "./productsSlice";
import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import {
  Container,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { fetchCategories as fetchCategoriesApi } from "../../api/fakeStoreApi";
import useDebounce from "../../hooks/useDebounce";

const ProductListingPage = () => {
  const dispatch = useDispatch();

  const products = useSelector(selectFilteredAndSortedProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const productsError = useSelector(selectProductsError);
  const selectedCategory = useSelector(selectSelectedCategory);
  const sortBy = useSelector(selectSortBy);

  const searchTerm = useSelector(selectSearchTerm);
  const [inputValue, setInputValue] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(inputValue, 500);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const data = await fetchCategoriesApi();
        setCategories(["all", ...data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategories();
  }, []);

  useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  const handleSearchChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleCategoryChange = (event) => {
    dispatch(setSelectedCategory(event.target.value));
  };

  const handleSortChange = (event) => {
    dispatch(setSortBy(event.target.value));
  };

  if (productsStatus === "loading") {
    return <LoadingSpinner />;
  }

  if (productsStatus === "failed") {
    return (
      <Container sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error: {productsError}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Our Products
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          mb: 4,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <TextField
          label="Search by title"
          variant="outlined"
          value={inputValue}
          onChange={handleSearchChange}
          sx={{ minWidth: 200 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select value={sortBy} label="Sort By" onChange={handleSortChange}>
            <MenuItem value="price-asc">Price: Low to High</MenuItem>
            <MenuItem value="price-desc">Price: High to Low</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {products.length === 0 ? (
        <Typography align="center">No products found.</Typography>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ProductListingPage;
