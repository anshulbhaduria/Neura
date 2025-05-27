import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsStatus,
  selectProductsError,
} from "./productsSlice";
import ProductCard from "../../components/ProductCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Container, Grid, Typography } from "@mui/material";

const ProductListingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const productsError = useSelector(selectProductsError);

  useEffect(() => {
    if (productsStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productsStatus, dispatch]);

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
        All Products
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ProductListingPage;
