import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBrands } from "../adapters/brand";
import { Banner } from "./Advertisement/Banner";
import { CarouselView } from "./OwlCarousel";

export const BrandCarousel = () => {

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
                <React.Fragment key={index}>
                    <div className="detail">
                        <div className="heading">{brand.name}</div>

                        <div className="link-container">
                            <Link to={"/brand/" + brand.id}>View More</Link>
                        </div>
                    </div>
                    <img src={brand.file ? process.env.REACT_APP_FILE_PATH + brand.file.path : brand.image_url} />

                </React.Fragment>
            );
        })} displayItems={5}></CarouselView>
    );

}