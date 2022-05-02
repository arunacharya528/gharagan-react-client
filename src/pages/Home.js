import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { Banner } from "../components/Advertisement/Banner";
import { Brand } from "../components/Brand";
import { ProductThumbnail } from "../components/ProductThumbnail";
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
            <Banner />
            <div className="container">
                <section className="mb-5">
                    <div class="header">
                        <h5>Latest Products</h5>
                    </div>

                    <div id="catalog-container" className="row">
                        {latestProducts.length === 0 ?
                            <Loading />
                            : latestProducts.slice(0, (latestPage * 8)).map((product, index) => <ProductThumbnail key={index} product={product} />)
                        }
                    </div>

                    <div className="d-flex justify-content-center my-3">
                        {
                            latestPage < latestProducts.length / 8 ?
                                <button className="btn mx-2 btn-outline-primary" onClick={() => { setLatestPage(latestPage + 1) }}>View More</button>
                                : ''
                        }
                        {
                            latestPage > 1 ?
                                <button className="btn mx-2 btn-outline-primary" onClick={() => { setLatestPage(1) }}>Set default</button>
                                : ''
                        }
                    </div>
                </section>

                <section className="mb-5">
                    <div class="header">
                        <h5>Most Viewed Products</h5>
                    </div>

                    {/* <div id="catalog-container" className="row">
                        {
                            mostViewedProducts.length === 0 ?
                                <Loading />
                                :
                                mostViewedProducts.map((product, index) => <ProductThumbnail key={index} product={product} />)
                        }
                    </div> */}

                    <div id="catalog-container" className="row">
                        {mostViewedProducts.length === 0 ?
                            <Loading />
                            : mostViewedProducts.slice(0, (mostViewedPage * 8)).map((product, index) => <ProductThumbnail key={index} product={product} />)
                        }
                    </div>

                    <div className="d-flex justify-content-center my-3">
                        {
                            mostViewedPage < mostViewedProducts.length / 8 ?
                                <button className="btn mx-2 btn-outline-primary" onClick={() => { setMostViewedPage(mostViewedPage + 1) }}>View More</button>
                                : ''
                        }
                        {
                            mostViewedPage > 1 ?
                                <button className="btn mx-2 btn-outline-primary" onClick={() => { setMostViewedPage(1) }}>Set default</button>
                                : ''
                        }
                    </div>
                </section>

            </div>

            <Brand />
        </>
    );
}