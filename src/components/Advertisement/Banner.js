import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { getActiveAdvertisements } from "../../adapters/advertisement";
import { AdvertisementContext } from "../../context/AdvertisementContext";
import { defaultSliderSetting } from "../../helpers/defaultSliderSetting";
import { Loading } from "../../helpers/Loading";
import { CarouselView } from "../Carousel";

export const Banner = ({ page }) => {
    const { getAdvertisement } = useContext(AdvertisementContext);

    return (
        <div>
            <Slider {...defaultSliderSetting({})}>
                {getAdvertisement(page, 'banner').map((ad, index) =>
                    <div
                        class=" duration-700 ease-in-out max-auto h-auto !grid grid-rows-2 md:grid-cols-2  md:grid-rows-none gap-x-20  items-center justify-between md:space-x-10  "
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
                )}

            </Slider>

        </div>


    );

}