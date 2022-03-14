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

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Product />} path="/product">
          <Route element={<Product />} path=":product_id" />
        </Route>
      </Routes>
      <Social />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
