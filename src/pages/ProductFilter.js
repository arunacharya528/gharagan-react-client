import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { FilterBar } from "../components/FilterBar";
import { ProductThumbnail } from "../components/ProductThumbnail";
import { Loading } from "../helpers/Loading";

const handleURL = require('../helpers/handleURL');

export const ProductFilter = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState([]);

    useEffect(() => {
        getProducts(location.search, 'item=9')
            .then(response => {
                setPagination(response.data.links)
                setProducts(response.data.data)
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
    return (
        <>
            <div id="page-ribbon">
                <div class="container">
                    <div class="d-flex justify-content-between my-4">
                        <h4>Filter Products</h4>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item"><a href="#">Library</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Data</li>
                            </ol>
                        </nav>
                    </div>
                </div>


            </div>
            <section class="container">

                <div class="row my-5">
                    <div class="col-lg-3">
                        <FilterBar />
                    </div>
                    <div class="col-lg-9 d-flex flex-column">
                        <div id="catalog-container" className="row">
                            {products.length === 0 ?
                                <Loading />
                                :
                                products.map((product, index) => <ProductThumbnail key={index} product={product} width={4} />)
                            }
                        </div>
                        <nav className="my-3">
                            <ul class="pagination justify-content-center">
                                {pagination.map((link, index) =>
                                    <li class={"page-item "
                                        + (link.active ? 'active' : "")
                                        + (link.url == null ? ' disabled' : '')}
                                        key={index}
                                        onClick={e => handlelinkClick(link)}
                                    >
                                        <a class="page-link" dangerouslySetInnerHTML={{ __html: link.label }}></a>
                                    </li>
                                )}
                            </ul>
                        </nav>
                    </div>
                </div>

            </section>
        </>
    );
}