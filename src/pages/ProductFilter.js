import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { FilterBar } from "../components/FilterBar";
import { LongProductThumbnail } from "../components/Product/LongProductThumbnail";
import { Loading } from "../helpers/Loading";
import { FullScreenEnterIcon, FullScreenExitIcon, ListIcon } from "../icons";

const handleURL = require('../helpers/handleURL');

export const ProductFilter = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts(location.search, 'item=9')
            .then(response => {
                setProducts(response.data)
            })
            .catch(error => console.log(error))
    }, [location]);


    const handlelinkClick = (link) => {
        // get json object of location
        // const parsedLocation = queryString.parse(location)
        // get page number from clicked page link
        var linkPage = link.url !== null ? link.url.split("?")[1] : '';
        linkPage = linkPage !== '' ? linkPage.split("=")[1] : linkPage;
        if (linkPage !== '') {
            handleURL.handleURLUpdate(linkPage, 'page', 'single', location, navigate)
        }

    }
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
                            {products.length === 0 ?
                                <Loading />
                                :
                                products.map((product, index) => <LongProductThumbnail key={index} product={product} width={4} />)
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