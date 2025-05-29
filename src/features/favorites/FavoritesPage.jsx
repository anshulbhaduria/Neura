import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectFavoriteProducts, removeFavorite } from "./favoritesSlice";
import ProductCard from "../../components/ProductCard";
import { Container, Grid, Typography, Box } from "@mui/material";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(selectFavoriteProducts);

  const handleRemoveFavorite = (product) => {
    dispatch(removeFavorite(product.id));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        My Favorites
      </Typography>
      {favoriteProducts.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            You haven't added any favorites yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {favoriteProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard
                product={product}
                onToggleFavorite={handleRemoveFavorite}
                isFavorite={true}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoritesPage;
