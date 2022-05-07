// import './App.scss';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import "./app.scss";
import { CarouselView } from "./components/OwlCarousel";
import { Banner } from "./components/Advertisement/Banner";

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
import { Order } from "./pages/Order";
import { Profile } from "./pages/Profile";
import { Brand } from "./pages/Brand";
import { UserProvider } from "./context/UserContext";
import { CartProvider } from "./context/CartContext";
import { Addresses } from "./pages/Addresses";

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
        <Route element={<Brand />} path="/brand/:brandId" />
        <Route element={<Login />} path="/login" />

        <Route path="/user">
          <Route element={<UserLayout component={<Profile />} />} path="profile" exact />
          <Route element={<UserLayout component={<Cart />} />} path="cart" exact />
          <Route element={<UserLayout component={<Order />} />} path="orders" exact />
          <Route element={<UserLayout component={<Addresses />} />} path="addresses" exact />
        </Route>
      </Routes>

      {/* <UserProvider>
        <CartProvider>
          <Routes>
            <Route path="/user">
              <Route element={<Profile />} path="profile" exact />
              <Route element={<Cart />} path="cart" exact />
              <Route element={<Order />} path="orders" exact />
            </Route>
          </Routes>
        </CartProvider>
      </UserProvider> */}
      {/* </ScrollToTop> */}
      <Social />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
