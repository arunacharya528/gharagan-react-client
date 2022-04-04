import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { Banner } from "../components/Banner";
import { Brand } from "../components/Brand";
import { ProductThumbnail } from "../components/ProductThumbnail";
import { Loading } from "../helpers/Loading";

export const Home = () => {

    const [latestProducts, setLatestProducts] = useState([]);
    const [mostViewedProducts, setMostViewedProducts] = useState([]);

    useEffect(() => {
        getProducts("sort=latest")
            .then((response) => {
                setLatestProducts(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });

        getProducts("sort=mostViewed")
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
                        <Link to="/filter?sort=latest">More Products <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></Link>
                    </div>

                    <div id="catalog-container" className="row">
                        {latestProducts.length === 0 ?
                            <Loading />
                            : latestProducts.map((product, index) => <ProductThumbnail key={index} product={product} />)
                        }
                    </div>
                </section>

                <section className="mb-5">
                    <div class="header">
                        <h5>Most Viewed Products</h5>
                        <Link to={"/filter?sort=mostViewed"}>More Products <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></Link>
                    </div>

                    <div id="catalog-container" className="row">
                        {
                            mostViewedProducts.length === 0 ?
                                <Loading />
                                :
                                mostViewedProducts.map((product, index) => <ProductThumbnail key={index} product={product} />)
                        }
                    </div>
                </section>

            </div>

            <Brand />
        </>
    );
}