import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getBrand } from "../adapters/brand";
import { getProducts } from "../adapters/product";
import { LongProductThumbnail } from "../components/Thumbnail/LongProductThumbnail";
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

                <div className="flex flex-col space-y-5 items-center justify-center py-16 bg-base-300">
                    {brand ?

                        <>
                            <img src={brand.file ? process.env.REACT_APP_FILE_PATH + brand.file.path : brand.image_url} className={" w-64 rounded-xl"} />
                            <div className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{brand.name}</div>

                            <div className="flex flex-col space-y-2 text-center">
                                <span>Number of products: {products.length}</span>
                                <Link to={"/filter/?brands=" + brand.id} className="text-primary underline underline-offset-1">Filter with this brand</Link>
                            </div>

                        </>
                        : ''
                    }
                </div>


            </div>

            <div className="container mx-auto">

                <div className="grid grid-cols-4 gap-5 my-4">
                    {products.length === 0 ?
                        <Loading />
                        : products.map((product, index) => <LongProductThumbnail key={index} product={product} />)
                    }
                </div>

            </div>
        </div>
    );
}