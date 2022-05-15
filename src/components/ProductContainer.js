import { useState } from "react";
import { Loading } from "../helpers/Loading";
import { LongProductThumbnail } from "./Product/LongProductThumbnail";

export const ProductContainer = ({ product, title }) => {

    const [page, setPage] = useState(1);
    return (
        <div className="container mx-auto mb-8 p-5">
            <div className="py-5 text-xl font-bold text-center sticky top-0 bg-base-100 z-10">{title}</div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 justify-center">

                {product.length === 0 ?
                    <Loading />
                    : product.slice(0, (page * 8)).map((product, index) => <LongProductThumbnail key={index} product={product} />)
                }
            </div>

            <div className="flex justify-center space-x-5 mt-8">
                {
                    page < product.length / 8 ?
                        <button className="btn btn-accent btn-outline" onClick={() => { setPage(page + 1) }}>View More</button>
                        : ''
                }
                {
                    page > 1 ?
                        <button className="btn btn-accent btn-outline" onClick={() => { setPage(1) }}>Set default</button>
                        : ''
                }
            </div>
        </div>
    );
}