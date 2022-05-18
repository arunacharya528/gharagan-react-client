import { useContext, useEffect, useState } from "react";
import { Banner } from "./components/Advertisement/Banner";

import { Footer } from "./layout/Footer";
import { Nav } from "./layout/Nav";
import { Social } from "./layout/Social";
import { getProducts } from "./adapters/product";
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
import { ModalProvider } from "./context/ModalContext";
import { UserDashboard } from "./layout/UserDashboard";

import toast, { Toaster } from 'react-hot-toast';
import { Checkout } from "./pages/Checkout";
import { WishList } from "./pages/WishList";
import { CategoryProvider } from "./context/CategoryContext";
import { CategoryMenu } from "./components/Nav/CategoryContent";
import { UserMenu } from "./components/Nav/UserMenu";
function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <CartProvider>
          <ModalProvider>
            <CategoryProvider>

              <div class="drawer drawer-end">
                <input id="rightDrawer" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content">

                  {/* <label for="rightDrawer" class="drawer-button btn btn-primary">Open drawer</label> */}


                  {/* <ScrollToTop> */}

                  <div class="drawer">
                    <input id="leftDrawer" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content">

                      <Nav />

                      {/* <button className="btn btn-primary" onClick={() => toast.success("Yay a toast")}>Make a toast</button> */}
                      <Toaster
                        position="top-center"
                        gutter={8}
                        toastOptions={{
                          className: "bg-base-200 text-current shadow-xl border-2 mr-5 z-10"
                        }}
                      />
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
                          <Route element={<UserLayout component={<Checkout />} />} path="checkout" exact />
                          <Route element={<UserLayout component={<Order />} />} path="orders" exact />
                          <Route element={<UserLayout component={<Addresses />} />} path="addresses" exact />
                          <Route element={<UserLayout component={<WishList />} />} path="wishlist" exact />
                        </Route>
                      </Routes>
                      <Footer />

                      {/* <label for="my-drawer" class="btn btn-primary drawer-button">Open drawer</label> */}
                    </div>
                    <div class="drawer-side">
                      <label for="leftDrawer" class="drawer-overlay"></label>
                      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">

                        {/* <li><a>Sidebar Item 1</a></li>
                      <li><a>Sidebar Item 2</a></li> */}
                        <div className="flex justify-end">
                          <label for="leftDrawer" class="btn btn-square">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                          </label>
                        </div>
                        {/* <UserDashboard /> */}

                        <div class="collapse collapse-arrow border rounded-xl ease-in-out duration-300 bg-base-200">
                          <input type="checkbox" />
                          <div class="collapse-title">
                            Profile
                          </div>
                          <div class="collapse-content p-0">
                            <UserMenu />
                          </div>
                        </div>

                        <span className="font-bold mx-4 mt-5">Categories</span>
                        <CategoryMenu />


                      </ul>
                    </div>
                  </div>


                </div>
                <div class="drawer-side">
                  <label for="rightDrawer" class="drawer-overlay"></label>
                  <ul class="menu p-4 overflow-y-auto w-11/12 md:w-2/3 lg:w-1/3 bg-base-100 text-base-content">
                    <div className="flex justify-end">
                      <label for="rightDrawer" class="btn btn-square">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                      </label>
                    </div>


                    <Cart />
                  </ul>
                </div>
              </div>
            </CategoryProvider>
          </ModalProvider>
        </CartProvider>
      </UserProvider>
      {/* <Social /> */}
    </BrowserRouter>
  );
}

export default App;
