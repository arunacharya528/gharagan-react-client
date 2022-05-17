import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { FilterBar } from "../components/FilterBar";
import { LongProductThumbnail } from "../components/Product/LongProductThumbnail";
import { Loading } from "../helpers/Loading";
import { ListIcon } from "../icons";

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
                    <div class="drawer-content p-5 relative">

                        <label for="filterDrawer" class="btn btn-ghost drawer-button gap-2 my-2 lg:hidden">
                            <ListIcon />
                            Open drawer
                        </label>


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 relative">
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
                            <button className="btn btn-sm rounded-full" onClick={e => fitDrawer(!isDrawerFit)}>
                                {isDrawerFit ? "Reverse full screen" : "Fullscreen"}
                            </button>
                            <FilterBar />

                        </ul>

                    </div>
                </div>

            </section>
        </>
    );
}