import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProductDetails,
  clearProductDetails,
  selectCurrentProduct,
  selectProductDetailsStatus,
  selectProductDetailsError,
} from "./productDetailsSlice";
import {
  toggleFavorite,
  selectFavoriteProductIds,
} from "../favorites/favoritesSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Container, Typography, Box, CardMedia, Button } from "@mui/material";

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectCurrentProduct);
  const status = useSelector(selectProductDetailsStatus);
  const error = useSelector(selectProductDetailsError);
  const favoriteProductIds = useSelector(selectFavoriteProductIds);

  const isFavorite = product ? favoriteProductIds.includes(product.id) : false;
  useEffect(() => {
    dispatch(fetchProductDetails(id));
    return () => {
      dispatch(clearProductDetails());
    };
  }, [dispatch, id]);

  const handleToggleFavorite = () => {
    if (product) {
      dispatch(toggleFavorite(product));
    }
  };

  if (status === "loading") {
    return <LoadingSpinner />;
  }

  if (status === "failed") {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="error">
          Error: {error || "Failed to fetch product details."}
        </Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="h6" color="text.secondary">
          Product not found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 4,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 4,
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          image={product.image}
          alt={product.title}
          sx={{ maxWidth: "100%", maxHeight: 400, objectFit: "contain" }}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {product.title}
        </Typography>
        <Typography variant="h6" color="primary" gutterBottom>
          ${product.price.toFixed(2)}
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Category: {product.category}
        </Typography>
        <Typography variant="body1" paragraph>
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {product.rating.rate} ({product.rating.count} reviews)
        </Typography>
        <Button
          variant="contained"
          color={isFavorite ? "secondary" : "primary"}
          onClick={handleToggleFavorite}
          sx={{ mt: 3 }}
          fullWidth
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Box>
    </Container>
  );
};

export default ProductDetailPage;
