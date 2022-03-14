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

function App() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [])
  return (
    <div>
      <Nav />
      <Banner />


      <div className="container">

        <div class="header">
          <h5>Gharagan Sells</h5>
          <a href="#">More Products <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
        </div>

        <div id="catalog-container" className="row">
          {
            products.map((product, index) => <ProductThumbnail key={index} product={product} />)
          }
        </div>
      </div>
      <Social />
      <Footer />
    </div>
  );
}

export default App;
