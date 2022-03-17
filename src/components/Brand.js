import { useEffect, useState } from "react";
import { getBrand } from "../adapters/brand";
import { CarouselView } from "./OwlCarousel";

export const Brand = () => {

    const [brands, setBrands] = useState([]);
    useEffect(() => {
        getBrand()
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