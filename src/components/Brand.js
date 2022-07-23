import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBrands } from "../adapters/brand";
import Slider from "react-slick";
import { defaultSliderSetting } from "../helpers/defaultSliderSetting";

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
            <div onMouseEnter={e => showDetail(true)} onMouseLeave={e => showDetail(false)} className="relative mx-3">
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

            return (
                <>
                    <div className="block px-10 md:hidden">
                        <Slider {...defaultSliderSetting({ slidesToShow: 1, variableWidth: true, centerMode: true, rows: 1 })}>
                            {
                                brands.map((brand, index) =>
                                    <ImageContainer key={index} brand={brand} />
                                )
                            }
                        </Slider>
                    </div>
                    <div className="hidden md:block lg:hidden">
                        <Slider {...defaultSliderSetting({ slidesToShow: 3, variableWidth: true, centerMode: true })}>
                            {
                                brands.map((brand, index) =>
                                    <ImageContainer key={index} brand={brand} />
                                )
                            }
                        </Slider>
                    </div>
                    <div className="hidden lg:block">
                        <Slider {...defaultSliderSetting({ slidesToShow: 5, variableWidth: true, centerMode: true })}>
                            {
                                brands.map((brand, index) =>
                                    <ImageContainer key={index} brand={brand} />
                                )
                            }
                        </Slider>
                    </div>
                </>
            )

        } else {
            return <div class="shadow rounded-lg mx-3">
                <div className="animate-pulse flex flex-row space-x-5">
                    {Array(5).fill({}).map(() =>
                        <div className="h-52 w-1/5 p-3 rounded bg-base-200 flex justify-center items-center">
                            <div className="h-7 w-16 bg-base-300 rounded-lg"></div>
                        </div>
                    )}
                </div>
            </div>

        }

    }

    return (
        <div className="container mx-auto">
            {loadingData()}
        </div>
    );

}