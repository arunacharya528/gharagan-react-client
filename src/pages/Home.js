import { useEffect, useState } from "react";
import { getProducts } from "../adapters/product";
import { Banner } from "../components/Banner";
import { ProductThumbnail } from "../components/ProductThumbnail";

export const Home = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((response) => {
                console.log(response.data);
                setProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    return (
        <>
            <Banner />


            <div className="container">

                <div class="header">
                    <h5>Gharagan Sells</h5>
                    <a href="#">More Products <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
                </div>

                <div id="catalog-container" className="row">
                    {
                        products.map((product, index) => <ProductThumbnail key={index} product={product} />)
                    }
                </div>
            </div>
        </>
    );
}