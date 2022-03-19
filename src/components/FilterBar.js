import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBrands } from "../adapters/brand";
import { getCategories } from "../adapters/category";
import { Loading } from "../helpers/Loading";


const handleURL = require('../helpers/handleURL');

export const FilterBar = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    const handleUpdate = (value, type, stat) => {
        handleURL.handleURLUpdate(value, type, stat, location, navigate)
    }

    const getStatus = (id, type, status) => {
        return handleURL.getURLStatus(id, type, status, location);
    }

    const handleClear = () => {
        navigate('?')
    }

    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => console.log(error))

        getBrands()
            .then(response => {
                setBrands(response.data)
            })
            .catch(error => console.log(error))
    }, [])

    return (

        <div id="sidebar">
            <div class="accordion">
                {categories.length === 0 ?
                    <Loading size="50px" text="Loading Categories" />
                    :
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
                                                        onChange={e => handleUpdate(childCategory.id, 'categories')}
                                                        checked={getStatus(childCategory.id + '', 'categories')}
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
                    <input type="number" class="form-control" min={0} onChange={e => handleUpdate(e.target.value, 'pmin', 'single')} value={getStatus(null, 'pmin', 'single')} />
                </div>
                <div class="form-group w-50 px-1">
                    <label for="max">Max</label>
                    <input type="number" class="form-control" min={0} onChange={e => handleUpdate(e.target.value, 'pmax', 'single')} value={getStatus(null, 'pmax', 'single')} />
                </div>
            </div>

            <hr />
            <h6>Brands</h6>
            <div class="product-list">
                {
                    brands.length === 0 ?
                        <Loading text="Loading brands" size="50px" />
                        : brands.map((brand, index) =>
                            <div class="product" key={index}>
                                <div class="name">
                                    <input type="checkbox" class="form-check-input" value="1"
                                        onChange={e => handleUpdate(brand.id, 'brands')}
                                        checked={getStatus(brand.id + "", 'brands')}
                                    /> {brand.name}
                                </div>
                                <div class="quantity">{brand.number_of_products}</div>
                            </div>
                        )}
            </div>
            <hr />
            <div class="form-group d-flex align-items-center">
                <label for="" class="text-nowrap">Sort By</label> &emsp;
                <select class="form-control" onChange={e => handleUpdate(e.target.value, 'sort', 'single')} value={getStatus(null, 'sort', 'single')}>
                    <option value={0}>Select sorting method</option>
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