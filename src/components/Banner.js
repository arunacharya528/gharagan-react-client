import { useEffect, useState } from "react";
import { getBanners } from "../adapters/banner";
import { CarouselView } from "./OwlCarousel";

export const Banner = () => {

    const [banners, setBanners] = useState([]);
    useEffect(() => {
        getBanners()
            .then((response) => {
                setBanners(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);


    return (
        <CarouselView items={banners.map((banner, index) => {
            return (
                <div class="item">
                    <img src={banner.image} />
                </div>
            );
        })} displayItems={1}></CarouselView>
    );

}