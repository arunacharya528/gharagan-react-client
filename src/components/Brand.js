import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBrands } from "../adapters/brand";
import { Banner } from "./Advertisement/Banner";
import { CarouselView } from "./Carousel";

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


    const ImageContainer = ({ brand }) => {
        const [isDetailShown, showDetail] = useState(false)

        const getImageLink = () => {
            if (brand.file) {
                return process.env.REACT_APP_FILE_PATH + brand.file.path
            } else {
                return brand.image_url;
            }

        }
        return (
            <div onMouseEnter={e => showDetail(true)} onMouseLeave={e => showDetail(false)} className="relative">
                <img src={getImageLink()} className="rounded-xl h-32 w-auto" />
                {
                    isDetailShown ?
                        <div className="absolute top-0 flex items-center justify-center w-full h-full bg-base-200/50">
                            <Link to={"/brand/" + brand.id} className="btn btn-sm btn-primary">View</Link>
                        </div>
                        : ''
                }

            </div>
        )
    }

    const loadingData = () => {
        if (brands.length !== 0) {
            return brands.map((brand, index) =>
                <ImageContainer key={index} brand={brand} />
            );
        } else {
            return Array(3).fill({}).map(() =>
                <div class=" shadow rounded-md p-4 max-w-sm w-full mx-3">
                    <div class="animate-pulse flex space-x-4">

                        <div className="h-52 w-full p-3 rounded bg-slate-700"></div>
                    </div>
                </div>
            )
        }

    }


    return (
        <CarouselView items={loadingData()} displayItems={5}></CarouselView>

    );

}