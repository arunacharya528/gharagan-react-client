import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const queryString = require('query-string')

export const FilterBar = () => {

    const navigate = useNavigate();
    const [query, setQuery] = useState({
        brand: [],
        category: []
    });

    const handleCategory = (category_id) => {
        if (query.category.includes(category_id)) {
            query.category.splice(query.category.indexOf(category_id), 1)
        } else {
            query.category = [...query.category, category_id]
        }
        setQuery(query)
        updateUrlQuery()
    }

    const handleBrand = (brand_id) => {
        if (query.brand.includes(brand_id)) {
            query.brand.splice(query.brand.indexOf(brand_id), 1)
        } else {
            query.brand = [...query.brand, brand_id]
        }
        setQuery(query)
        updateUrlQuery()
    }

    const handleMin = (minValue) => {
        query.pmin = minValue;
        setQuery(query)
        updateUrlQuery()
    }

    const handleMax = (maxValue) => {
        query.pmax = maxValue;
        setQuery(query)
        updateUrlQuery()
    }

    const handleSort = (e) => {
        query.sort = e.target.value;
        setQuery(query);
        updateUrlQuery();
    }

    const handleClear = () => {
        setQuery({ brand: [], category: [] });
        updateUrlQuery();
    }
    const updateUrlQuery = () => {
        const stringifiedQuery = queryString.stringify(query)
        console.log(stringifiedQuery)
        navigate('?' + stringifiedQuery)
    }


    return (
        <div id="sidebar">
            <div class="accordion">
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne">
                            Electronic appliances
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            <div class="product-list">
                                <div href="#" class="product" onClick={e => handleCategory(1)}>
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product" onClick={e => handleCategory(2)}>
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo">
                            Shoes
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <div class="product-list">
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="panelsStayOpen-headingOne">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree">
                            Gadgets
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <div class="product-list">
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                                <div href="#" class="product">
                                    <div class="name">Product name</div>
                                    <div class="quantity">100</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <h6>Price</h6>
            <input type="range" class="form-range" id="customRange1" />

            <div class="d-flex">
                <div class="form-group w-50  px-1">
                    <label for="min">Min</label>
                    <input type="number" class="form-control" id="min" min={0} onChange={e => handleMin(e.target.value)} />
                </div>
                <div class="form-group w-50 px-1">
                    <label for="max">Max</label>
                    <input type="number" class="form-control" id="max" min={0} onChange={e => handleMax(e.target.value)} />
                </div>
            </div>

            <hr />
            <h6>Brands</h6>
            <div class="product-list">
                <div href="#" class="product">
                    <div class="name">
                        <input type="checkbox" class="form-check-input" value="1"
                            onChange={e => handleBrand(1)}
                            checked={query.brand.includes(1) ? true : false}
                        /> Product name
                    </div>
                    <div class="quantity">100</div>
                </div>
                <div href="#" class="product">
                    <div class="name">
                        <input type="checkbox" class="form-check-input"
                            onChange={e => handleBrand(2)}
                            checked={query.brand.includes(2) ? true : false}
                        /> Product name
                    </div>
                    <div class="quantity">100</div>
                </div>
                <div href="#" class="product">
                    <div class="name">
                        <input type="checkbox" class="form-check-input" /> Product name
                    </div>
                    <div class="quantity">100</div>
                </div>
                <div href="#" class="product">
                    <div class="name">
                        <input type="checkbox" class="form-check-input" /> Product name
                    </div>
                    <div class="quantity">100</div>
                </div>

            </div>

            <hr />

            <div class="form-group d-flex align-items-center">
                <label for="" class="text-nowrap">Sort By</label> &emsp;
                <select class="form-control" onChange={e => handleSort(e)}>
                    <option value={'latest'}>Latest</option>
                    <option value={'mostViewed'}>Most Viewed</option>
                    <option value={'highestRated'}>Highest Rated</option>
                </select>
            </div>

            <button class="btn btn-primary w-100 my-2" onClick={e => handleClear()}>
                Clear all
            </button>

        </div>
    );
}