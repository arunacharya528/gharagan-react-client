import { Footer } from "./layout/Footer";
import { Nav } from "./layout/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { ProductFilter } from "./pages/ProductFilter";
import { Login } from "./pages/Authenticate";
import { Cart } from "./pages/Cart";
import { UserLayout } from "./layout/UserLayout";
import { Order } from "./pages/Order";
import { Profile } from "./pages/Profile";
import { Brand } from "./pages/Brand";
import { Addresses } from "./pages/Addresses";

import { CloseIcon } from "./icons"
import { Toaster } from 'react-hot-toast';
import { Checkout } from "./pages/Checkout";
import { WishList } from "./pages/WishList";
import { CategoryMenu } from "./components/Nav/CategoryContent";
import { UserMenu } from "./components/Nav/UserMenu";
import { OrderDetail } from "./pages/OrderDetail";
import { ContextList } from "./context/ContextList";
import { Review } from "./pages/Review";
import { QuestionAnswers } from "./pages/QAs";
import { Page } from "./pages/Page";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PasswordReset } from "./pages/PasswordReset";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
function App() {

  // to scroll to top
  const [isGotoTopShown, showGoToTop] = useState(false);
  useEffect(() => {
    const main = document.getElementById("main")
    main.addEventListener("scroll", (e) => {
      const scrollPosition = main.scrollTop;
      if (scrollPosition > 0) {
        showGoToTop(true)
      } else {
        showGoToTop(false)
      }
    })
  }, [])
  const topRef = useRef(null);
  const goUpScrollAction = () => {
    topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <BrowserRouter>
      <ContextList>
        <div class="drawer drawer-end">
          <input id="rightDrawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <div class="drawer" >
              <input id="leftDrawer" type="checkbox" class="drawer-toggle" />
              <div class="drawer-content" id="main">
                <div ref={topRef}></div>
                <Nav />
                <Routes>
                  <Route element={<Home />} path="/" index />
                  <Route element={<Product />} path="/product">
                    <Route element={<Product />} path=":product_id" />
                  </Route>
                  <Route element={<ProductFilter />} path="/filter" />
                  <Route element={<Brand />} path="/brand/:brandId" />
                  <Route element={<Login />} path="/login" />
                  {/* <Route element={<Page />} path="/page/:slug" /> */}
                  <Route element={<PasswordReset />} path="/password-reset" />
                  <Route path="/user">
                    <Route element={<UserLayout component={<Login />} />} path="login" exact />
                    <Route element={<UserLayout component={<Profile />} />} path="profile" exact />
                    <Route element={<UserLayout component={<Cart />} />} path="cart" exact />
                    <Route element={<UserLayout component={<Checkout />} />} path="checkout" exact />
                    <Route element={<UserLayout component={<Order />} />} path="orders" exact />
                    <Route element={<UserLayout component={<OrderDetail />} />} path="orders/:orderId" exact />
                    <Route element={<UserLayout component={<Addresses />} />} path="addresses" exact />
                    <Route element={<UserLayout component={<WishList />} />} path="wishlist" exact />
                    <Route element={<UserLayout component={<Review />} />} path="reviews" exact />
                    <Route element={<UserLayout component={<QuestionAnswers />} />} path="qas" exact />
                  </Route>
                </Routes>
                <Footer />

                {
                  isGotoTopShown ?
                    <div class="fixed bottom-0 right-0 my-28 px-5" id="scrollToTop" onClick={goUpScrollAction}>
                      <button class="btn btn-primary gap-2 btn-circle">
                        <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                      </button>
                    </div>
                    : ''
                }


              </div>
              <div class="drawer-side">
                <label for="leftDrawer" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                  <div className="flex justify-end">
                    <label for="leftDrawer" class="btn btn-square btn-ghost">
                      <CloseIcon />
                    </label>
                  </div>


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

        <Toaster
          position="top-center"
          gutter={8}
          toastOptions={{
            className: "bg-base-300 text-current shadow-xl z-10"
          }}
        />
      </ContextList>
    </BrowserRouter>
  );
}

export default App;
