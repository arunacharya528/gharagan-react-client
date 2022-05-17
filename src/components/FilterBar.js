import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBrands } from "../adapters/brand";
import { getCategories } from "../adapters/category";
import { Loading } from "../helpers/Loading";
const queryString = require('query-string')

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


    const determineIfOpen = (childCategories, TYPE) => {
        // extract child category id from provided categories
        const categories = childCategories.map((category) => { return category.id })
        // extract categories from address bar
        const addressBar = queryString.parse(location.search)
        const categoriesInAddressBar = addressBar.categories ? addressBar.categories.split(",") : [];

        var isOpen = false;
        // search and see if there are matching categories with provided category
        categoriesInAddressBar.map((category) => {
            if (categories.includes(parseInt(category))) {
                isOpen = true;
            }
        })

        return isOpen;
    }

    return (
        <div className="">
            <div className="shadow-md flex flex-col divide-y rounded-xl py-2  bg-base-200">
                <div class="flex flex-col divide-y">
                    {categories.length === 0 ?
                        <Loading size="50px" text="Loading Categories" />
                        :
                        categories.map((category, index) =>
                            <div tabIndex="0" class="collapse collapse-arrow" key={index}>
                                <input type="checkbox" defaultChecked={determineIfOpen(category.child_categories)} />
                                <div class="collapse-title text-base font-medium w-full flex flex-row justify-between">
                                    <span>{category.name}</span>
                                    <span>{category.number_of_product}</span>
                                </div>
                                <div class="collapse-content">

                                    {category.child_categories.map((childCategory, index) =>
                                        <div class="product" key={index}>
                                            <div class="form-control flex flex-row">
                                                <label class="label cursor-pointer flex flex-row justify-start items-center space-x-3 w-full">
                                                    <input type="checkbox" class="checkbox checkbox-primary" onChange={e => handleUpdate(childCategory.id, 'categories')} checked={getStatus(childCategory.id + '', 'categories')} />
                                                    <span class="label-text">{childCategory.name}</span>

                                                </label>
                                                <div class="quantity">{childCategory.number_of_product}</div>

                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                </div>


                <div className="p-2">
                    <span className="font-bold">Price</span>
                    <input type="range" class="range range-primary" />
                </div>


                <div class="grid grid-cols-2 gap-3 p-2">
                    <div class="form-control w-full">
                        <label class="label font-bold">
                            Min
                        </label>
                        <input type="number" class="input input-bordered input-primary w-full" min={0} onChange={e => handleUpdate(e.target.value, 'pmin', 'single')} value={getStatus(null, 'pmin', 'single')} />
                    </div>
                    <div class="form-group w-full">
                        <label class="label font-bold">
                            Max
                        </label>
                        <input type="number" class="input input-bordered input-primary w-full" min={0} onChange={e => handleUpdate(e.target.value, 'pmax', 'single')} value={getStatus(null, 'pmax', 'single')} />
                    </div>
                </div>

                <div className="p-2">
                    <span className="font-bold">Brands</span>
                    <div class="p-3">
                        {
                            brands.length === 0 ?
                                <Loading text="Loading brands" size="50px" />
                                : brands.map((brand, index) =>
                                    <div class="form-control flex flex-row" key={index}>
                                        <label class="label cursor-pointer flex flex-row justify-start items-center space-x-3 w-full">
                                            <input type="checkbox" class="checkbox checkbox-primary" onChange={e => handleUpdate(brand.id, 'brands')} checked={getStatus(brand.id + "", 'brands')} />
                                            <span class="label-text">{brand.name}</span>

                                        </label>
                                        <div class="quantity">{brand.number_of_products}</div>

                                    </div>

                                )}
                    </div>
                </div>

                <div class="p-2">
                    <span className="font-bold">Sort by</span>
                    <select class="select select-primary w-full max-w-xs" onChange={e => handleUpdate(e.target.value, 'sort', 'single')} value={getStatus(null, 'sort', 'single')}>
                        <option value={0}>Select sorting method</option>
                        <option value={'latest'}>Latest</option>
                        <option value={'mostViewed'}>Most Viewed</option>
                    </select>
                </div>
            </div>

            <button class="btn btn-primary btn-block mt-4" onClick={e => handleClear()}>
                Clear all
            </button>
        </div>

    );
}