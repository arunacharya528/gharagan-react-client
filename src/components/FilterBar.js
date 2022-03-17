import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBrands } from "../adapters/brand";
import { getCategories } from "../adapters/category";
const queryString = require('query-string')

export const FilterBar = () => {

    const navigate = useNavigate();
    const [query, setQuery] = useState({
        brand: [],
        category: [],
        page: 1
    });

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);


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
        setQuery({ brand: [], category: [], pmin: undefined, pmax: undefined, page: 1 });
        updateUrlQuery();
    }
    const updateUrlQuery = () => {
        const stringifiedQuery = queryString.stringify(query)
        console.log(stringifiedQuery)
        navigate('?' + stringifiedQuery)
    }

    // useEffect()

    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data)
                // console.log(response.data)
            })
            .catch(error => console.log(error))

        getBrands()
            .then(response => {
                setBrands(response.data)
                // console.log(response.data)
            })
            .catch(error => console.log(error))

        updateUrlQuery()
    }, [])
    return (
        <div id="sidebar">
            <div class="accordion">
                {
                    categories.map((category, index) =>
                        <div class="accordion-item" key={index}>
                            <h2 class="accordion-header">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#panelsStayOpen-collapse" + category.name}>
                                    {category.name}&emsp;{category.number_of_product}
                                </button>
                            </h2>
                            <div id={"panelsStayOpen-collapse" + category.name} class="accordion-collapse collapse">
                                <div class="accordion-body">
                                    <div class="product-list">
                                        {category.child_categories.map((childCategory, index) =>
                                            <div href="#" class="product" key={index}>
                                                <div class="name">
                                                    <input type="checkbox" class="form-check-input" value="1"
                                                        onChange={e => handleCategory(childCategory.id)}
                                                        checked={query.category.includes(childCategory.id) ? true : false}
                                                    /> {childCategory.name}
                                                </div>
                                                <div class="quantity">{childCategory.number_of_product}</div>
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
            <hr />
            <h6>Price</h6>
            <input type="range" class="form-range" id="customRange1" />

            <div class="d-flex">
                <div class="form-group w-50  px-1">
                    <label for="min">Min</label>
                    <input type="number" class="form-control" min={0} onChange={e => handleMin(e.target.value)} value={query.pmin} />
                </div>
                <div class="form-group w-50 px-1">
                    <label for="max">Max</label>
                    <input type="number" class="form-control" min={0} onChange={e => handleMax(e.target.value)} value={query.pmax} />
                </div>
            </div>

            <hr />
            <h6>Brands</h6>
            <div class="product-list">

                {brands.map((brand, index) =>
                    <div class="product">
                        <div class="name">
                            <input type="checkbox" class="form-check-input" value="1"
                                onChange={e => handleBrand(brand.id)}
                                checked={query.brand.includes(brand.id) ? true : false}
                            /> {brand.name}
                        </div>
                        <div class="quantity">{brand.number_of_products}</div>
                    </div>
                )}
            </div>

            <hr />

            <div class="form-group d-flex align-items-center">
                <label for="" class="text-nowrap">Sort By</label> &emsp;
                <select class="form-control" onChange={e => handleSort(e)}>
                    <option value={'latest'}>Latest</option>
                    <option value={'mostViewed'}>Most Viewed</option>
                </select>
            </div>

            <button class="btn btn-primary w-100 my-2" onClick={e => handleClear()}>
                Clear all
            </button>

        </div>
    );
}