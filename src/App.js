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

function App() {


  return (
    <div>
      <Nav />

<Banner/>
      <Social />
      <Footer />


    </div>
  );
}

export default App;
