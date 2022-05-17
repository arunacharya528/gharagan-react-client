import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { Banner } from "../components/Advertisement/Banner";
import { BrandCarousel } from "../components/Brand";
import { ProductContainer } from "../components/ProductContainer";
import { Loading } from "../helpers/Loading";

export const Home = () => {

    const [latestProducts, setLatestProducts] = useState([]);
    const [mostViewedProducts, setMostViewedProducts] = useState([]);
    const [latestPage, setLatestPage] = useState(1);
    const [mostViewedPage, setMostViewedPage] = useState(1);

    useEffect(() => {
        getProducts("sort=latest")
            .then((response) => {
                setLatestProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("sort=mostViewed")
            .then((response) => {
                setMostViewedProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>

            <ProductContainer product={latestProducts} title={"Latest Products"} />
            <ProductContainer product={mostViewedProducts} title={"Most Viewed Products"} />


            <BrandCarousel />
        </>
    );
}