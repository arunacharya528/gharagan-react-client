import { useState } from "react";
import { Loading } from "../helpers/Loading";
import { LongProductThumbnail } from "./Product/LongProductThumbnail";

export const ProductContainer = ({ product, title }) => {

    const [page, setPage] = useState(1);
    return (
        <div className="container mx-auto mb-8 p-5">
            <div className="sticky top-20 z-10 text-center my-3">
                <span className="text-lg font-semibold text-center sticky top-16 z-10 bg-base-100 rounded-full px-3 py-1 uppercase">{title}</span>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-center py-2">

                {product.length === 0 ?
                    <Loading />
                    : product.slice(0, (page * 10)).map((product, index) => <LongProductThumbnail key={index} product={product} />)
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