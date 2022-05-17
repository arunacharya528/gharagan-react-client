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
                <img src={getImageLink()} className="rounded-xl px-2  h-40 w-72" />
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

        // return (Array(5).fill({}).map(() =>
        //     <div class=" shadow rounded-md p-4 max-w-sm w-full mx-3">
        //         <div class="animate-pulse flex space-x-4">

        //             <div className="h-52 w-full p-3 rounded bg-slate-700"></div>
        //         </div>
        //     </div>
        // ))
    }


    return (
        <CarouselView items={loadingData()} displayItems={5}></CarouselView>

        // <div class="carousel w-full">

        //     {
        //         brands.map((brand, index) =>
        //             <div id="slide1" class="carousel-item relative w-full">
        //                 <img src="https://api.lorem.space/image/car?w=800&h=200&hash=8B7BCDC2" class="w-full" />
        //                 <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        //                     <a href={"#slide" + (index === 0 ? brands.length - 1 : index - 1)} class="btn btn-circle">❮</a>
        //                     <a href={"#slide" + (index === brands.length - 1 ? 0 : index + 1)} class="btn btn-circle">❯</a>
        //                 </div>
        //             </div>
        //         )
        //     }
        //     {/* <div id="slide1" class="carousel-item relative w-full">
        //         <img src="https://api.lorem.space/image/car?w=800&h=200&hash=8B7BCDC2" class="w-full" />
        //         <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        //             <a href="#slide4" class="btn btn-circle">❮</a>
        //             <a href="#slide2" class="btn btn-circle">❯</a>
        //         </div>
        //     </div>
        //     <div id="slide2" class="carousel-item relative w-full">
        //         <img src="https://api.lorem.space/image/car?w=800&h=200&hash=500B67FB" class="w-full" />
        //         <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        //             <a href="#slide1" class="btn btn-circle">❮</a>
        //             <a href="#slide3" class="btn btn-circle">❯</a>
        //         </div>
        //     </div>
        //     <div id="slide3" class="carousel-item relative w-full">
        //         <img src="https://api.lorem.space/image/car?w=800&h=200&hash=A89D0DE6" class="w-full" />
        //         <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        //             <a href="#slide2" class="btn btn-circle">❮</a>
        //             <a href="#slide4" class="btn btn-circle">❯</a>
        //         </div>
        //     </div>
        //     <div id="slide4" class="carousel-item relative w-full">
        //         <img src="https://api.lorem.space/image/car?w=800&h=200&hash=225E6693" class="w-full" />
        //         <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        //             <a href="#slide3" class="btn btn-circle">❮</a>
        //             <a href="#slide1" class="btn btn-circle">❯</a>
        //         </div>
        //     </div> */}
        // </div>
    );

}