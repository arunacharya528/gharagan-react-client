import { useContext } from "react";
import Slider from "react-slick";
import { AdvertisementContext } from "../../context/AdvertisementContext";
import { calculateDate } from "../../helpers/calculateDate";
import { defaultSliderSetting } from "../../helpers/defaultSliderSetting";

const moment = require('moment')
export const Promotion = () => {

    const { getAdvertisement } = useContext(AdvertisementContext);

    return (
        <div className="container mx-auto px-10">
            <Slider {...defaultSliderSetting({ autoplaySpeed: 5000 })}>
                {getAdvertisement('promotion').map((ad, index) =>
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

                            <div className="text-2xl py-3">
                                Offer ends in {calculateDate(new Date(ad.active_to), new Date())}
                            </div>

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