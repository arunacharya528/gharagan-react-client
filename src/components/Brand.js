import { useEffect, useState } from "react";
import { getBrands } from "../adapters/brand";
import { Banner } from "./Advertisement/Banner";
import { CarouselView } from "./OwlCarousel";

export const Brand = () => {

    const [brands, setBrands] = useState([]);
    useEffect(() => {
        getBrands()
            .then((response) => {
                setBrands(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);


    return (
        <CarouselView items={brands.map((brand, index) => {
            return (
                <div class="item">
                    <img src={brand.file ? process.env.REACT_APP_FILE_PATH + brand.file.path : brand.image_url} />
                </div>
            );
        })} displayItems={5}></CarouselView>
    );

}