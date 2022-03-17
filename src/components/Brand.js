import { useEffect, useState } from "react";
import { getBrands } from "../adapters/brand";
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
                    <img src={brand.image} />
                </div>
            );
        })} displayItems={5}></CarouselView>
    );

}