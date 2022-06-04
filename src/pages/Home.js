import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { Banner } from "../components/Advertisement/Banner";
import { BannerForHomePage } from "../components/Advertisement/BannerForHomePage";
import { BrandCarousel } from "../components/Brand";
import { ProductContainer } from "../components/ProductContainer";
import { Loading } from "../helpers/Loading";

export const Home = () => {
    const initialData = { data: [], loading: true };
    const [latestProducts, setLatestProducts] = useState(initialData);
    const [popularProducts, setPopularProducts] = useState(initialData);
    const [controversialProducts, setControversialProducts] = useState(initialData);
    const [topRatedProducts, setTopRatedProducts] = useState(initialData);


    useEffect(() => {
        getProducts("sort=latest&orderBy=desc")
            .then((response) => {
                setLatestProducts({ loading: false, data: response.data })
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("sort=popular&orderBy=desc")
            .then((response) => {
                setPopularProducts({ loading: false, data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("sort=controversial&orderBy=desc")
            .then((response) => {
                setControversialProducts({ loading: false, data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("sort=rating&orderBy=desc")
            .then((response) => {
                setTopRatedProducts({ loading: false, data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>
            <BannerForHomePage />

            <ProductContainer products={latestProducts} title={"Latest Products"} />
            <ProductContainer products={topRatedProducts} title={"Top Rated Products"} />
             <ProductContainer products={popularProducts} title={"Popular Products"} />
            <ProductContainer products={controversialProducts} title={"Controversial Products"} />

            <BrandCarousel />
        </>
    );
}