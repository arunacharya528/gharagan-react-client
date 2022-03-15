import { useEffect, useState } from "react";
import { getProducts } from "../adapters/product";
import { Banner } from "../components/Banner";
import { ProductThumbnail } from "../components/ProductThumbnail";

export const Home = () => {

    const [latestProducts, setLatestProducts] = useState([]);
    const [mostViewedProducts, setMostViewedProducts] = useState([]);

    useEffect(() => {
        getProducts("item=8&page=1&latest=true")
            .then((response) => {
                setLatestProducts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("item=8&page=1&mostViewed=true")
            .then((response) => {
                setMostViewedProducts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    return (
        <>
            <Banner />
            <div className="container">

                <section className="mb-5">
                    <div class="header">
                        <h5>Latest Products</h5>
                        <a href="#">More Products <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
                    </div>

                    <div id="catalog-container" className="row">
                        {
                            latestProducts.map((product, index) => <ProductThumbnail key={index} product={product} />)
                        }
                    </div>
                </section>

                <section className="mb-5">
                    <div class="header">
                        <h5>Most Viewed Products</h5>
                        <a href="#">More Products <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
                    </div>

                    <div id="catalog-container" className="row">
                        {
                            mostViewedProducts.map((product, index) => <ProductThumbnail key={index} product={product} />)
                        }
                    </div>
                </section>

            </div>
        </>
    );
}