import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { Banner } from "../components/Advertisement/Banner";
import BannerForHomePage from "../components/Advertisement/BannerForHomePage";
import { BrandCarousel } from "../components/Brand";
import { ProductContainer } from "../components/ProductContainer";
import { Loading } from "../helpers/Loading";

export const Home = () => {

    const [latestProducts, setLatestProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [controversialProducts, setControversialProducts] = useState([]);
    const [topRatedProducts, setTopRatedProducts] = useState([]);


    useEffect(() => {
        getProducts("sort=latest&orderBy=desc")
            .then((response) => {
                setLatestProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("sort=popular&orderBy=desc")
            .then((response) => {
                setPopularProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("sort=controversial&orderBy=desc")
            .then((response) => {
                setControversialProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("sort=rating&orderBy=desc")
            .then((response) => {
                setTopRatedProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>
            <BannerForHomePage />

            <ProductContainer product={latestProducts} title={"Latest Products"} />
            <ProductContainer product={topRatedProducts} title={"Top Rated Products"} />
            <ProductContainer product={popularProducts} title={"Popular Products"} />
            <ProductContainer product={controversialProducts} title={"Controversial Products"} />

            <BrandCarousel />
        </>
    );
}