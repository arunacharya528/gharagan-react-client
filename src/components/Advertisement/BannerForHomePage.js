import React, { useContext, useState } from "react";


import Carousel, { Dots, autoplayPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { defaults } from "autoprefixer";
import { CarouselView } from "../Carousel";
import { AdvertisementContext } from "../../context/AdvertisementContext";
import { Link } from "react-router-dom";

export const BannerForHomePage = () => {

  const { getAdvertisement } = useContext(AdvertisementContext);

  const sideView = () => {
    const data = getAdvertisement('home', 'banner');
    if (data.length > 3) {
      return data.slice(data.length - 4, data.length - 1)
    } else {
      return data;
    }
  };


  const mainView = () => {
    const data = getAdvertisement('home', 'banner');

    if (data.length > 3) {
      return data.slice(0, data.length - 4)

    } else {
      return data;
    }
  }


  const slides = () => {
    return mainView().map((ad, index) => {
      return (
        <div
          class=" duration-700 ease-in-out max-auto h-auto grid grid-rows-2 md:grid-cols-2  md:grid-rows-none gap-x-20  items-center justify-between md:space-x-10  "
          data-carousel-item
          key={index}>
          <img
            class="block mx-auto order-2 mt-2 object-contain bannerImage h-96"
            src={process.env.REACT_APP_FILE_PATH + ad.file.path}
            alt="VR Collection"
          />
          <div className="order-last md:order-first md:mr-10 md:text-left  text-center m-0">
            <h1 className="text-5xl md:text-6xl font-bold py-2 transition delay-150 duration-400 ease-in-out">
              {ad.name}
            </h1>
            <h5 className="text-xl transition delay-150 duration-500 ease-in-out">
              {ad.summary}
            </h5>

            <a href={ad.url_slug} target="_blank" className="btn btn-primary p-3 mt-4 ">
              View More
            </a>
          </div>
        </div>
      );
    })
  }

  const sideBar = () => {
    return (

      <div class="carousel carousel-center w-full lg:w-1/3 p-4 space-x-4 lg:space-x-0 lg:space-y-4 rounded-box lg:flex-col lg:justify-center order-last lg:order-1">

        {sideView().map((ad, index) =>
          <a className="flex carousel-item items-center w-11/12 md:w-5/12 lg:w-full rounded-md shadow-md backdrop-blur-sm" key={index} href={ad.url_slug} target="_blank">
            <img
              className="backdrop-blur-none rounded-l-md h-full w-32 object-cover"
              src={process.env.REACT_APP_FILE_PATH + ad.file.path}
            />
            <div className="flex flex-col p-3">
              <span className="font-semibold">{ad.name}</span>
              <p className="text-clip h-20 overflow-hidden">{ad.summary}</p>
              <span className="font-semibold">View More</span>
            </div>
          </a>

        )}
      </div>
    );

  }

  return (
    <>
      <div className="">
        <div className="container mx-auto p-5 flex flex-col lg:flex-row ">
          {sideBar()}
          <Carousel
            className="col-span-4 md:-mt-40 md:pt-20 grow"
            value={0}
            slides={slides()}
            onChange={() => { }}
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
        </div>
      </div>
    </>
  );
}

