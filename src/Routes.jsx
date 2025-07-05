import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import Homepage from "pages/homepage";
import ShoppingCart from "pages/shopping-cart";
import UserAuthentication from "pages/user-authentication";
import ProductDetail from "pages/product-detail";
import ProductCatalog from "pages/product-catalog";
import CheckoutProcess from "pages/checkout-process";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/user-authentication" element={<UserAuthentication />} />
        <Route path="/product-detail" element={<ProductDetail />} />
        <Route path="/product-catalog" element={<ProductCatalog />} />
        <Route path="/checkout-process" element={<CheckoutProcess />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;