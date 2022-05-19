import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { getCategories } from "../adapters/category";
import { getProducts } from "../adapters/product";
import { getShoppingSession } from "../adapters/shoppingSession";
import { CategoryMenu } from "../components/Nav/CategoryContent";
import { UserMenu } from "../components/Nav/UserMenu";
import { ShortProductThumbnail } from "../components/Product/ShortProductThumbnail";
import { CartContext } from "../context/CartContext";
import { CategoryContext } from "../context/CategoryContext";
import { UserContext, UserProvider } from "../context/UserContext";
import { Loading } from "../helpers/Loading";
import { CartIcon, MoonIcon, PersonIcon, SunIcon, ListIcon, SearchIcon } from "../icons";
import { AuthLink, AuthUser } from "../pages/Authenticate";

import logo from "../assets/image/logo.png";
import lgLogo from "../assets/image/lg-logo.png";

const queryString = require('query-string')


export const Nav = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const parsedData = queryString.parse(location.search);

    const { user } = useContext(UserContext);
    const { session } = useContext(CartContext);
    const { categories } = useContext(CategoryContext);

    const [selectedCategory, setSelectedCategory] = useState([]);

    const [latestProducts, setLatestProducts] = useState([]);
    const [latestProductLink, setLatetstProductlink] = useState('');

    const [mostViewedProducts, setMostViewedProducts] = useState([]);
    const [mostViewedProductLink, setMostViewedProductLink] = useState('');


    const [selectedTab, setSelectedTab] = useState(null);

    const selectedCategoryNumber = parsedData.selectedCategory;
    useEffect(() => {
        if (parsedData.selectedCategory && categories.length !== 0) {
            categories.map((category) => {
                if (category.id + "" === parsedData.selectedCategory) {
                    setSelectedCategory(category);
                    handleCategorySelection(category);
                }
            })
        }
    }, [selectedCategoryNumber])


    const handleCategorySelection = (category) => {
        // extract ids of child categories in an array
        const childCategories = category.child_categories.map((category, index) => {
            return category.id;
        })

        // implode the array by joining with string and fetch data with contructed link
        const latestLink = "categories=" + childCategories.join(',') + "&sort=latest";
        getProducts(latestLink)
            .then(response => setLatestProducts(response.data))
            .catch(error => console.log(error))
        setLatetstProductlink("/filter/?" + latestLink);


        const mostViewedLink = "categories=" + childCategories.join(',') + "&sort=mostViewed";
        getProducts(mostViewedLink)
            .then(response => setMostViewedProducts(response.data))
            .catch(error => console.log(error))
        setMostViewedProductLink("/filter/?" + mostViewedLink);
        setSelectedCategory(category);

    }


    const forwardTo = (link) => {
        setSelectedCategory([])
        navigate(link)
        setSelectedTab(null)
    }

    return (
        <>
            <div className="sticky top-0 z-40 bg-base-100 flex flex-col">
                <div className="lg:container mx-auto flex justify-between items-center space-x-10 p-2 flex-nowrap w-full">

                    <div className="flex flex-row space-x-2 items-stretch flex-grow-0 flex-nowrap">
                        <div className="lg:hidden ">
                            <label for="leftDrawer" class="btn btn-ghost btn-square drawer-button">
                                <ListIcon className="w-6 h-6" />
                            </label>
                        </div>

                        <Link to="/" className="hidden lg:block">
                            {/* <img src={logo} className="w-10" /> */}
                            <img src={lgLogo} className="w-32" />
                        </Link>

                    </div>

                    <div className="md:grow flex justify-center">

                        <Link to="/" className="block lg:hidden">
                            {/* <img src={logo} className="w-10" /> */}
                            <img src={lgLogo} className="w-32" />
                        </Link>

                        <div className="bg-base-200 hidden lg:flex space-x-2 items-center rounded-lg p-2 w-full">
                            <input className="rounded-full bg-transparent outline-none px-2 w-full" placeholder="Search at Gharagan" />

                            <button class="btn btn-ghost btn-circle btn-sm">
                                <SearchIcon className="w-6 h-6 text-gray-400"/>
                            </button>
                        </div>

                    </div>

                    <div className="flex flex-row space-x-2">

                        {/* {
                            user !== null && session !== null ?
                                <label for="rightDrawer" to={"/user/cart"} class="btn btn-ghost btn-circle">
                                    <div class="indicator">
                                        <CartIcon className="w-6 h-6"/>
                                        <span class="badge badge-xs badge-primary indicator-item">
                                            {session.cart_items.length}
                                        </span>
                                    </div>
                                </label>
                                : ''
                        } */}

                        <div className="flex-row space-x-2">

                            <div class="dropdown dropdown-end">
                                <label tabindex="0" class="btn btn-ghost btn-circle">
                                    <PersonIcon className="h-6 w-6" />
                                </label>
                                <div className="dropdown-content w-52 py-2 rounded-xl shadow-md">
                                    <UserMenu />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="block lg:hidden  lg:container mx-auto w-full py-2 px-5">
                    <div className="bg-base-200 flex space-x-2 items-center rounded-lg p-2  w-full">
                        <input className="rounded-full bg-transparent outline-none px-2 w-full" placeholder="Search at Gharagan" />

                        <button class="btn btn-ghost btn-circle btn-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                    </div>
                </div>
            </div>


            <div class="container mx-auto navbar bg-base-100 hidden lg:flex">


                <div class="navbar-start">

                </div>
                <div class="navbar-center hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">
                        <CategoryMenu setSelectedTab={setSelectedTab} handleCategorySelection={handleCategorySelection} selectedTab={selectedTab} />
                    </ul>
                </div>

                <div className="navbar-end"></div>
            </div>


            <div className="relative">
                <div className="absolute bg-base-200 w-full z-20 shadow-md">
                    {selectedCategory.length !== 0 ?
                        <div className="container mx-auto relative">
                            <div className="grid md:grid-cols-4">

                                <div className="md:col-span-4 text-right sticky z-10 top-0">
                                    <button class="btn btn-sm btn-ghost rounded-full gap-2 bg-base-200 mt-1" onClick={e => { setSelectedCategory([]); setSelectedTab(null); }}>
                                        Close Nav
                                        ✕
                                    </button>
                                </div>


                                <div className="p-2">
                                    <div className="py-3 grid grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-2">
                                        {
                                            selectedCategory.child_categories.map((category, index) =>
                                                <span key={index} className="font-semibold cursor-pointer" onClick={e => forwardTo(`/filter/?categories=${category.id}`)} >{category.name}</span>
                                            )
                                        }

                                    </div>
                                </div>


                                <div className="md:col-span-3 p-3">

                                    <div className="d-flex justify-content-between align-items-start mb-5">
                                        <p>
                                            {selectedCategory.description}
                                        </p>
                                    </div>
                                    <section className="mb-4">
                                        <div className="flex justify-between py-3">
                                            <span className="text-xl font-bold">Latest Products</span>
                                            <Link to={latestProductLink} className="btn btn-sm btn-ghost rounded-full">More</Link>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 items-stretch">
                                            {latestProducts.length === 0 ?
                                                <Loading />
                                                : latestProducts.slice(0, 5).map((product, index) => <ShortProductThumbnail key={index} product={product} width={4} moveForward={link => forwardTo(link)} />)
                                            }
                                        </div>
                                    </section>
                                    <section className="mb-4">
                                        <div className="flex justify-between py-3">
                                            <span className="text-xl font-bold">Most Viewed Products</span>
                                            <Link to={mostViewedProductLink} className="btn btn-sm btn-ghost rounded-full">More</Link>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-5 items-stretch">
                                            {mostViewedProducts.length === 0 ?
                                                <Loading />
                                                : mostViewedProducts.slice(0, 5).map((product, index) => <ShortProductThumbnail key={index} product={product} width={4} />)
                                            }
                                        </div>
                                    </section>

                                </div>
                            </div>
                        </div>
                        : ''}
                </div>
            </div>




        </>
    );
}