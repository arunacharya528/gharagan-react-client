import React from "react";


import Carousel, { Dots, autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { defaults } from "autoprefixer";
import { CarouselView } from "../Carousel";

export default class BannerForHomePage extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 0,
      slides: [
        (this.fristSlider()),
        (this.secondSlider()),
        (this.thirdSlider()),
      ],
    }
    this.onchange = this.onchange.bind(this);
  }




  onchange(value) {
    this.setState({ value });
  }

  secondSlider = () => {
    return (
      <div
        class=" duration-700 ease-in-out max-auto h-auto grid grid-rows-2 md:grid-cols-2 md:grid-rows-none gap-x-20 items-center justify-between md:space-x-20"
        data-carousel-item
      >
        <img
          class="block mx-auto order-2 mt-2 object-contain bannerImage "
          src="https://www.holonsolutions.com/wp-content/uploads/2018/02/laptop-floating-1.png"
          alt="VR Collection"
        />

        <div className="order-last md:order-first md:mr-10 md:text-left text-center m-0 -mt-40 md:mt-0">
          <h2 className="text-3xl py-2 transition delay-150 duration-300 ease-in-out">
            Check Our Huge
          </h2>
          <h1 className="text-5xl md:text-6xl font-bold py-2 transition delay-150 duration-400 ease-in-out">
            Smartphones
          </h1>
          <h5 className="text-xl transition delay-150 duration-500 ease-in-out">
            & Accessories collection
          </h5>

          <button className="btn btn-primary p-3 mt-4 ">
            Shop Now
          </button>
        </div>
      </div>
    );
  }
  fristSlider = () => {
    return (
      <div
        class=" duration-700 ease-in-out max-auto h-auto grid grid-rows-2 md:grid-cols-2  md:grid-rows-none gap-x-20  items-center justify-between md:space-x-20  "
        data-carousel-item
      >

        <img
          class="block mx-auto order-2 mt-2 object-contain bannerImage  h-96 "
          src="https://images.dailyobjects.com/marche/product-images/1101/dailyobjects-latte-icon-blue-hybrid-clear-case-cover-for-iphone-13-pro-max-images/blue-designer-hybrid-clear-case-iphone-13-pro-10.png?tr=cm-pad_resize,w-412,h-490,dpr-2"
          alt="VR Collection"
        />
        <div className="order-last md:order-first md:mr-10 md:text-left m-0 text-center -mt-40 mt-0">
          <h2 className="text-3xl py-2 transition delay-150 duration-300 ease-in-out">
            Check Our Huge
          </h2>
          <h1 className="text-5xl md:text-6xl font-bold py-2 transition delay-150 duration-400 ease-in-out">
            Smartphones
          </h1>
          <h5 className="text-xl transition delay-150 duration-500 ease-in-out">
            & Accessories collection
          </h5>

          <button className="btn btn-primary p-3 mt-4 ">
            Shop Now
          </button>
        </div>
      </div>
    );
  }
  thirdSlider = () => {
    return (
      <div
        class=" duration-700 ease-in-out max-auto h-auto grid grid-rows-2 md:grid-cols-2  md:grid-rows-none gap-x-20  items-center justify-between md:space-x-10  "
        data-carousel-item
      >
        {/* <img
        class="block mx-auto order-2 mt-2 "
          src="https://cartzilla.createx.studio/img/home/mono-product/colors/color-option01.jpg"
          alt="VR Collection"
        /> */}
        <img
          class="block mx-auto order-2 mt-2 object-contain bannerImage h-96"
          src="https://www.kindpng.com/picc/m/655-6552604_dxracer-chair-png-photo-dxracer-pink-gaming-chair.png"
          alt="VR Collection"
        />
        <div className="order-last md:order-first md:mr-10 md:text-left  text-center m-0 -mt-10 mt-0">
          <h2 className="text-3xl py-2 transition delay-150 duration-300 ease-in-out">
            Check Our Huge
          </h2>
          <h1 className="text-5xl md:text-6xl font-bold py-2 transition delay-150 duration-400 ease-in-out">
            Smartphones
          </h1>
          <h5 className="text-xl transition delay-150 duration-500 ease-in-out">
            & Accessories collection
          </h5>

          <button className="btn btn-primary p-3 mt-4 ">
            Shop Now
          </button>
        </div>
      </div>
    );
  }


  render() {
    return (
      <>
        {/* Banners and slider */}
        <div className="">
          <div className="container mx-auto flex flex-col  md:grid md:grid-cols-5   md:ml-30 ">
            {/* banners container */}
            <div className="grid grid-rows-3 space-y-2 hidden md:block  md:mt-10 col-start-1 col-end-2">
              <a className="flex flex-col-2 rounded-md bg-gray-100 px-5 text-black backdrop-blur-sm">
                <img
                  className="backdrop-blur-none"
                  width={125}
                  src="https://cartzilla.createx.studio/img/home/banners/banner-sm01.png"
                ></img>
                <div className="flex items-center">
                  <h5>
                    Next Gen <br />
                    <span>
                      <b>Video</b> With{" "}
                    </span>
                    <br></br>
                    <span>
                      <b>360 Cam</b>
                    </span>
                    <br />
                    <a href="">Shope Now</a>
                  </h5>
                </div>
              </a>
              <a className="flex flex-col-2 rounded-md bg-amber-100 px-5 text-black ">
                <img
                  width={125}
                  src="https://cartzilla.createx.studio/img/home/banners/banner-sm02.png"
                ></img>
                <div className="flex items-center">
                  <h5>
                    Next Gen <br />
                    <span>
                      <b>Video</b> With{" "}
                    </span>
                    <br></br>
                    <span>
                      <b>360 Cam</b>
                    </span>
                    <br />
                    <a href="">Shope Now</a>
                  </h5>
                </div>
              </a>
              <a className="flex flex-col-2 rounded-md bg-green-100 px-5 text-black ">
                <img
                  width={125}
                  src="https://cartzilla.createx.studio/img/home/banners/banner-sm03.png"
                ></img>
                <div className="flex items-center">
                  <h5>
                    Next Gen <br />
                    <span>
                      <b>Video</b> With{" "}
                    </span>
                    <br></br>
                    <span>
                      <b>360 Cam</b>
                    </span>
                    <br />
                    <a href="">Shope Now</a>
                  </h5>
                </div>
              </a>
            </div>
            {/* slider container */}
            <Carousel
              className="col-span-4 md:-mt-40 md:pt-20 "
              value={this.state.value}
              slides={this.state.slides}
              onChange={this.onchange}
              plugins={[
                'infinite',
                {
                  resolve: autoplayPlugin,
                  options: {
                    interval: 3000,
                  }
                },
              ]}
              animationSpeed={1000}
            />
            {/* <Dots value={this.state.value} onChange={this.onchange} number={this.state.slides.length} /> */}
            <div class="carousel carousel-center  max-w-md p-4 space-x-4  rounded-box md:hidden">
              <a className="carousel-item flex flex-col-2 rounded-md bg-gray-200 px-5 text-black">
                <img
                  width={125}
                  src="https://cartzilla.createx.studio/img/home/banners/banner-sm01.png"
                ></img>
                <div className="flex items-center">
                  <h5>
                    Next Gen <br />
                    <span>
                      <b>Video</b> With{" "}
                    </span>
                    <br></br>
                    <span>
                      <b>360 Cam</b>
                    </span>
                    <br />
                    <a href="">Shope Now</a>
                  </h5>
                </div>
              </a>
              <a className="carousel-item flex flex-col-2 rounded-md bg-amber-200 px-5 text-black">
                <img
                  width={125}
                  src="https://cartzilla.createx.studio/img/home/banners/banner-sm02.png"
                ></img>
                <div className="flex items-center">
                  <h5>
                    Next Gen <br />
                    <span>
                      <b>Video</b> With{" "}
                    </span>
                    <br></br>
                    <span>
                      <b>360 Cam</b>
                    </span>
                    <br />
                    <a href="">Shope Now</a>
                  </h5>
                </div>
              </a>
              <a className="carousel-item flex flex-col-2 rounded-md bg-green-200 px-5 text-black">
                <img
                  width={125}
                  src="https://cartzilla.createx.studio/img/home/banners/banner-sm03.png"
                ></img>
                <div className="flex items-center">
                  <h5>
                    Next Gen <br />
                    <span>
                      <b>Video</b> With{" "}
                    </span>
                    <br></br>
                    <span>
                      <b>360 Cam</b>
                    </span>
                    <br />
                    <a href="">Shope Now</a>
                  </h5>
                </div>
              </a>
            </div>







          </div>
        </div>
      </>
    );
  }
}

