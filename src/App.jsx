import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import ProductListingPage from "./features/products/productListingPage";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                Product Dashboard
              </Link>
            </Typography>
            <Box>
              <Button color="inherit" component={Link} to="/">
                Products
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<ProductListingPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
