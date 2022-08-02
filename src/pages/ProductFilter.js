import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { FilterBar } from "../components/FilterBar";
import { ProductThumbnailSkeleton } from "../components/Skeleton/ProductSkeleton";
import { LongProductThumbnail } from "../components/Thumbnail/LongProductThumbnail";
import { FullScreenEnterIcon, FullScreenExitIcon, ListIcon } from "../icons";

export const ProductFilter = () => {

    const location = useLocation();
    const [products, setProducts] = useState({ loading: true, data: [] });

    useEffect(() => {
        getProducts(location.search)
            .then(response => {
                setProducts({ loading: false, data: response.data })
            })
            .catch(error => console.log(error))
    }, [location]);

    const [isDrawerFit, fitDrawer] = useState(false);
    return (
        <>
            <section class="">

                <div class={"drawer drawer-mobile " + (isDrawerFit ? "fixed top-0 bg-base-100 z-40" : '')}>
                    <input id="filterDrawer" type="checkbox" class="drawer-toggle" />
                    <div class="drawer-content relative">

                        <div className="flex justify-between items-center sticky top-0 bg-base-200 z-50 p-2 shadow-md">
                            <div className="flex flex-row space-x-2 items-center">
                                <label for="filterDrawer" class="btn btn-sm btn-circle rounded-full btn-ghost gap-2 my-2 lg:hidden">
                                    <ListIcon />
                                </label>
                                <span className="font-bold uppercase">filter</span>
                            </div>


                            <button className="btn btn-sm btn-ghost gap-2 rounded-full" onClick={e => fitDrawer(!isDrawerFit)}>
                                {isDrawerFit ? <>Exit fullscreen <FullScreenExitIcon /> </> : <>Fullscreen <FullScreenEnterIcon /></>}
                            </button>
                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 relative p-5">

                            {products.loading ?
                                <>{Array(4).fill({}).map((item, index) =>
                                    <ProductThumbnailSkeleton key={index} />
                                )}</>
                                :
                                products.data.length === 0 ?

                                    <div className="flex justify-center flex-col items-center w-full col-span-4 space-y-10">
                                        <span className="text-5xl">(･_･)</span>
                                        <span>No product found</span>
                                    </div>
                                    :
                                    products.data.map((product, index) => <LongProductThumbnail key={index} product={product} width={4} />)

                            }
                        </div>
                    </div>
                    <div class="drawer-side">
                        <label for="filterDrawer" class="drawer-overlay"></label>
                        <ul class="p-2 overflow-y-auto w-80 bg-base-100 text-base-content">
                            <FilterBar />
                        </ul>

                    </div>
                </div>

            </section>
        </>
    );
}