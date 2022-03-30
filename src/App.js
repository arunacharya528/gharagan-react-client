// import './App.scss';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import { getBanners } from "./adapters/banner";
import "./app.scss";
import { CarouselView } from "./components/OwlCarousel";
import { Banner } from "./components/Banner";

import { Footer } from "./layout/Footer";
import { Nav } from "./layout/Nav";
import { Social } from "./layout/Social";
import { getProducts } from "./adapters/product";
import { ProductThumbnail } from "./components/ProductThumbnail";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { ProductFilter } from "./pages/ProductFilter";
import ScrollToTop from "./helpers/ScrollToTop";
import { Login } from "./pages/Authenticate";
import { login } from "./adapters/auth";
import { Cart } from "./pages/Cart";
import { UserLayout } from "./layout/UserLayout";

function App() {

  return (
    <BrowserRouter>
      <Nav />
      {/* <ScrollToTop> */}
      <Routes>
        <Route element={<Home />} path="/" index />
        <Route element={<Product />} path="/product">
          <Route element={<Product />} path=":product_id" />
        </Route>
        <Route element={<ProductFilter />} path="/filter" />

        <Route element={<UserLayout component={<Cart />} />} path="/user">
          <Route element={<UserLayout component={<Cart />} />} path="cart" />
          <Route element={<Cart />} path="order" />
        </Route>

        <Route element={<Login />} path="/login" />

      </Routes>
      {/* </ScrollToTop> */}
      <Social />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
