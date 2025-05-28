import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Card
      sx={{
        maxWidth: 300,
        margin: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {" "}
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain", padding: "16px" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {product.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
