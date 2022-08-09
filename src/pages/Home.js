import { useEffect, useState } from "react";
import { getProducts } from "../adapters/product";
import { Banner } from "../components/Advertisement/Banner";
import { CategoryAd } from "../components/Advertisement/Category";
import { Promotion } from "../components/Advertisement/Promotion";
import { VerticalList } from "../components/Advertisement/VerticalList";
import { BrandCarousel } from "../components/Brand";
import { ProductContainer } from "../components/ProductContainer";

export const Home = () => {
    const initialData = { data: [], loading: true };
    const [latestProducts, setLatestProducts] = useState(initialData);
    const [popularProducts, setPopularProducts] = useState(initialData);
    const [controversialProducts, setControversialProducts] = useState(initialData);
    const [topRatedProducts, setTopRatedProducts] = useState(initialData);


    useEffect(() => {
        getProducts("?sort=latest&orderBy=desc")
            .then((response) => {
                setLatestProducts({ loading: false, data: response.data })
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("?sort=popular&orderBy=desc")
            .then((response) => {
                setPopularProducts({ loading: false, data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("?sort=controversial&orderBy=desc")
            .then((response) => {
                setControversialProducts({ loading: false, data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("?sort=rating&orderBy=desc")
            .then((response) => {
                setTopRatedProducts({ loading: false, data: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <>

            <div className="container mx-auto p-5 grid grid-cols-6 gap-12 items-center">
                <div className="col-span-6 md:col-span-2 order-last md:order-1">
                    <VerticalList />
                </div>
                <div className="col-span-6 md:col-span-4 md:order-2">
                    <Banner />
                </div>
            </div>

            <ProductContainer products={latestProducts} title={"Latest Products"} />
            <ProductContainer products={topRatedProducts} title={"Top Rated Products"} />

            <Promotion />

            <ProductContainer products={popularProducts} title={"Popular Products"} />
            <ProductContainer products={controversialProducts} title={"Controversial Products"} />
            
            <CategoryAd />
            
            <BrandCarousel />
        </>
    );
}