import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getBrand } from "../adapters/brand";
import { getProducts } from "../adapters/product";
import { ProductThumbnail } from "../components/Product/ProductThumbnail";
import { Loading } from "../helpers/Loading";

export const Brand = () => {
    const location = useLocation();
    const [products, setProducts] = useState([]);
    const [brandsPage, setBrandsPage] = useState(1);
    const [brand, setBrand] = useState(undefined);
    const brandId = location.pathname.split("/")[2];
    useEffect(() => {
        getProducts("brands=" + brandId)
            .then(response => setProducts(response.data))
            .catch(error => console.log(error))

        getBrand(brandId)
            .then(response => setBrand(response.data))
            .catch(error => console.log(error))
    }, [])


    return (
        <div>
            <div className="page-banner">

                <div className="container">
                    {brand ?

                        <>
                            <img src={brand.file ? process.env.REACT_APP_FILE_PATH + brand.file.path : brand.image_url} />
                            <h1>{brand.name}</h1>
                        </>
                        : ''
                    }
                </div>
                

            </div>

            <div className="container mt-4">

                <div id="catalog-container" className="row">
                    {products.length === 0 ?
                        <Loading />
                        : products.slice(0, (brandsPage * 8)).map((product, index) => <ProductThumbnail key={index} product={product} />)
                    }
                </div>

                <div className="d-flex justify-content-center my-3">
                    {
                        brandsPage < products.length / 8 ?
                            <button className="btn mx-2 btn-outline-primary" onClick={() => { setBrandsPage(brandsPage + 1) }}>View More</button>
                            : ''
                    }
                    {
                        brandsPage > 1 ?
                            <button className="btn mx-2 btn-outline-primary" onClick={() => { setBrandsPage(1) }}>Set default</button>
                            : ''
                    }
                </div>
            </div>
        </div>
    );
}