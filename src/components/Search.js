import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { CloseIcon, SearchIcon } from "../icons";
import { RateDisplayByNumber } from "./Rating";

export const SearchBar = () => {

    const [searchResult, setSearchResult] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (searchQuery !== '') {
            getProducts(`name=${searchQuery}&sort=rating&orderBy=desc`)
                .then((response) => {
                    setSearchResult(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [searchQuery]);

    const navigate = useNavigate();
    const forward = (link) => {
        navigate(link)
        setSearchQuery('');
        setSearchResult([]);
    }
    return (
        <div className="flex flex-col grow">

            <div className="flex">
                <input className="rounded-full bg-transparent outline-none px-2 w-full" placeholder="Enter product name" onChange={e => setSearchQuery(e.target.value)} value={searchQuery} />

                {
                    searchQuery !== '' ?
                        <button class="btn btn-ghost btn-circle btn-sm" onClick={e => forward('?')}>
                            <CloseIcon className="w-6 h-6 stroke-2 text-gray-400" />
                        </button>

                        :
                        <button class="btn btn-ghost btn-circle btn-sm">
                            <SearchIcon className="w-6 h-6 text-gray-400" />
                        </button>
                }

            </div>
            {
                searchQuery !== '' ?
                    <div className="relative">
                        <div className="absolute w-full h-96 overflow-y-auto lg:h-fit bg-base-100 inset-y-2 rounded-b-xl shadow-md flex flex-col divide-y " style={{ zIndex: "100" }}>
                            {

                                searchResult.filter((product, index) => index < 5).map((product, index) =>
                                    <div className="flex flex-row p-5 space-x-5 hover:bg-base-200 cursor-pointer items-center" onClick={e => forward(`/product/${product.id}`)}>

                                        <figure>
                                            {product.images.filter((image, index) => index < 1).map((image, index) =>
                                                <img src={image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url} key={index} className="rounded-xl w-28 h-16 object-cover" />
                                            )}
                                        </figure>
                                        <div class="grow h-full w-full flex flex-col space-y-1">
                                            <div className="text-md">
                                                {product.name}
                                            </div>
                                            <RateDisplayByNumber rating={product.ratings_avg_rate ? parseFloat(product.ratings_avg_rate) : 0} />
                                            <div className="flex space-x-3 uppercase text-xs font-semibold">
                                                <span>{product.category.name}</span>
                                                <span>{product.brand.name}</span>
                                            </div>
                                        </div>

                                    </div>
                                )

                            }

                            <div className="flex justify-between p-5">
                                <div>Total <span className="font-semibold">{searchResult.length}</span> results</div>
                                <div onClick={e => forward(`/filter?name=${searchQuery}&sort=rating&orderBy=desc`)} className="text-primary underline underline-offset-1 cursor-pointer">View More</div>
                            </div>
                        </div>
                    </div>
                    : ''
            }


        </div>
    );
}