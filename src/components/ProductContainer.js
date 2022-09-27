import { useState } from "react";
import { Loading } from "../helpers/Loading";
import { LongProductThumbnail } from "./Thumbnail/LongProductThumbnail";
import { ProductSkeleton, ProductThumbnailSkeleton } from "./Skeleton/ProductSkeleton";

export const ProductContainer = ({ products, title }) => {

    const [page, setPage] = useState(1);

    return (
        <div className="w-full md:w-11/12 mx-auto mb-8 p-4">
            <div className="text-center my-3">
                <span className="font-semibold text-lg text-center bg-base-100 rounded-full px-3 py-1 uppercase">{title}</span>
            </div>

            <div className="hidden md:block">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-center py-2">

                    {products.loading ?
                        <>{Array(5).fill({}).map((item, index) =>
                            <ProductThumbnailSkeleton key={index} />
                        )}</>
                        : products.data.slice(0, (page * 10)).map((product, index) => <LongProductThumbnail key={index} product={product} />)
                    }
                </div>

                <div className="flex justify-center space-x-5 mt-8">
                    {
                        page < products.data.length / 8 ?
                            <button className={"btn btn-primary"} onClick={() => { setPage(page + 1) }}>View More</button>
                            : ''
                    }
                    {
                        page > 1 ?
                            <button className="btn btn-primary btn-outline" onClick={() => { setPage(1) }}>Set default</button>
                            : ''
                    }
                </div>
            </div>

            <div class="flex md:hidden carousel carousel-center space-x-4  rounded-box">
                {products.loading ?
                    <>{Array(5).fill({}).map((item, index) =>
                        <div class="carousel-item w-11/12">
                            <ProductThumbnailSkeleton key={index} />
                        </div>
                    )}</>
                    : products.data.map((product, index) =>

                        <div class="carousel-item w-6/12">
                            <LongProductThumbnail key={index} product={product} />
                        </div>
                    )
                }
            </div>
        </div>
    );
}