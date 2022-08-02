import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { getCategories } from "../adapters/category";
import { getProducts } from "../adapters/product";
import { getShoppingSession } from "../adapters/shoppingSession";
import { CategoryMenu } from "../components/Nav/CategoryContent";
import { UserMenu } from "../components/Nav/UserMenu";
import { CartContext } from "../context/CartContext";
import { CategoryContext } from "../context/CategoryContext";
import { UserContext, UserProvider } from "../context/UserContext";
import { Loading } from "../helpers/Loading";
import { CartIcon, MoonIcon, PersonIcon, SunIcon, ListIcon, SearchIcon, CloseIcon } from "../icons";
import { AuthLink, AuthUser } from "../pages/Authenticate";

import logo from "../assets/image/logo.png";
import lgLogo from "../assets/image/lg-logo.png";
import { SearchBar } from "../components/Search";
import { NavProductContainer } from "../components/Nav/NavProductContainer";
import { PageLinkContext } from "../context/PageLinkContext"
import { SiteDetailContext } from "../context/SiteDetailContext";
import { ProfileImage } from "../components/Avatar";
import { ModalContext } from "../context/ModalContext";
import { ThemeToggle } from "../components/Nav/ThemeSwitch";
const queryString = require('query-string')


export const Nav = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const parsedData = queryString.parse(location.search);

    const { user } = useContext(UserContext);
    const { session } = useContext(CartContext);
    const { categories } = useContext(CategoryContext);

    const [selectedCategory, setSelectedCategory] = useState([]);

    const [latestProducts, setLatestProducts] = useState({ link: '', products: [] });
    const [topRatedProducts, setTopRatedProducts] = useState({ link: '', products: [] });


    const [selectedTab, setSelectedTab] = useState(null);

    const selectedCategoryNumber = parsedData.selectedCategory;

    const { setModalData, openModal, closeModal } = useContext(ModalContext);

    const forwardTo = (link) => {
        setSelectedCategory([])
        navigate(link)
        setSelectedTab(null)
        showDetailBar(false)
        closeModal()
    }

    const handleCategoryView = (category) => {
        setModalData({
            title: `Category: ${category.name}`,
            size: "max-w-5xl ",
            body: <>
                <div className="grid md:grid-cols-4 gap-5 px-3 h-full">
                    <div className="">
                        <div className="grid grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-2">
                            {
                                category.child_categories.map((category, index) =>
                                    <button key={index} className="btn btn-ghost capitalize" onClick={e => { e.stopPropagation(); forwardTo(`/filter/?categories=${category.id}`) }} >{category.name}</button>
                                )
                            }

                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-start">
                        <p>
                            {selectedCategory.description}
                        </p>
                    </div>

                    <div className="md:col-span-2">
                        <NavProductContainer title={"Latest Products"} products={latestProducts.products} link={latestProducts.link} forward={forwardTo} />
                        <NavProductContainer title={"Top Rated Products"} products={topRatedProducts.products} link={topRatedProducts.link} forward={forwardTo} />
                    </div>
                </div>
            </>
        })
        openModal()
    }
    // console.log(selectedCategory)
    useEffect(() => {
        if (parsedData.selectedCategory && categories.length !== 0) {
            categories.data.map((category) => {
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
        const latestLink = "?categories=" + childCategories.join(',') + "&sort=latest&orderBy=desc";
        getProducts(latestLink)
            .then(response => {
                setLatestProducts({
                    products: response.data,
                    link: "/filter/" + latestLink
                })
            })
            .catch(error => console.log(error))

        const topRatedLink = "?categories=" + childCategories.join(',') + "&sort=rating&orderBy=desc";
        getProducts(topRatedLink)
            .then(response => {
                setTopRatedProducts({
                    products: response.data,
                    link: "/filter/" + topRatedLink
                })
            })
            .catch(error => console.log(error))


        // setSelectedCategory(category);
        handleCategoryView(category);

    }

    const { getLinks } = useContext(PageLinkContext);
    const { getSiteData } = useContext(SiteDetailContext);

    const [notificationShown, setNotificationDisplay] = useState(true);

    const [isDetailBarShown, showDetailBar] = useState(false);

    return (
        <>
            <div className="sticky top-0 z-40 bg-base-100 flex flex-col">
                {
                    notificationShown && getSiteData('notification').trim() !== "-" ?
                        <div className="container mx-auto m-2 p-1 bg-red-400/10 border border-red-500 rounded-full  flex items-center">
                            <div className="grow text-center" dangerouslySetInnerHTML={{ __html: getSiteData('notification') }} />
                            <button className="btn btn-ghost btn-circle btn-xs" onClick={e => setNotificationDisplay(false)}>
                                <CloseIcon className="" />
                            </button>
                        </div>
                        : ''
                }

                <div className="lg:container mx-auto flex justify-between items-center space-x-10 p-2 flex-nowrap w-full">

                    <div className="flex flex-row space-x-2 items-stretch flex-grow-0 flex-nowrap">
                        <div className="lg:hidden ">
                            <label for="leftDrawer" class="btn btn-ghost btn-square drawer-button">
                                <ListIcon className="w-6 h-6" />
                            </label>
                        </div>

                        <Link to="/" className="hidden lg:block">
                            <img src={getSiteData('lg_logo_url')} className="w-32" />
                        </Link>

                    </div>

                    <div className="md:grow flex justify-center">

                        <Link to="/" className="block lg:hidden">
                            <img src={getSiteData('logo_url')} alt="Gharagan logo" className="w-10" />
                        </Link>

                        <div className="bg-base-200 hidden lg:flex space-x-2 items-center rounded-lg p-2 w-full">
                            <SearchBar />
                        </div>

                    </div>

                    <div className="flex flex-row items-center space-x-2">
                        <span className="">
                            <ThemeToggle showTitle={false} />
                        </span>
                        {
                            !user.loading && session !== null ?
                                <label for="rightDrawer" to={"/user/cart"} class="hidden lg:flex btn btn-ghost btn-circle">
                                    <div class="indicator">
                                        <CartIcon className="w-6 h-6" />
                                        <span class="badge badge-xs badge-primary indicator-item">
                                            {session.cart_items.length}
                                        </span>
                                    </div>
                                </label>
                                : ''
                        }

                        <div className="flex-row space-x-2 items-center">
                            
                            <div class="dropdown dropdown-end">
                                <label tabindex="0" class="btn btn-ghost btn-circle">
                                    {
                                        user.loading ?
                                            <PersonIcon className="h-6 w-6" />
                                            :
                                            <div class="avatar">
                                                <div class="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <ProfileImage name={user.data.name} />
                                                </div>
                                            </div>
                                    }
                                </label>
                                <div className="dropdown-content w-52 py-2 rounded-xl shadow-md bg-base-100">
                                    <UserMenu />
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <div className="block lg:hidden  lg:container mx-auto w-full py-2 px-5">
                    <div className="bg-base-200 flex space-x-2 items-center rounded-lg p-2  w-full">
                        <SearchBar />
                    </div>
                </div>
            </div>

            {/* <div className="container mx-auto py-2 flex flex-row overflow-x-auto items-center space-x-5">
                <div className="btn btn-ghost" onClick={e => showDetailBar(!isDetailBarShown)}>Categories</div>
                {
                    getLinks('head').map((link, index) =>
                        <Link to={"/page/" + link['url-slug']} key={index} className="capitalize hover:text-primary">{link.name}</Link>
                    )
                }
            </div> */}

            <div className="hidden md:flex justify-center py-10 ">
                <ul class="menu menu-horizontal bg-base-100 rounded-box">
                    <CategoryMenu />
                </ul>
            </div>

            {/* {isDetailBarShown ?

                <div className="fixed top-0 z-50 bg-base-100 flex justify-center items-center h-screen w-screen" onClick={e => showDetailBar(false)}>
                    <div className="absolute top-5 w-full text-center">Click outside container to close</div>

                    <div className="bg-base-200 w-full h-4/5 overflow-x-auto relative border border-gray-700">
                        <div className="flex flex-col md:flex-row container mx-auto py-6 items-stretch">
                            <ul class="menu menu-vertical p-0">
                                {
                                    categories.data.map((category, index) =>
                                        <li onClick={e => { e.stopPropagation(); handleCategorySelection(category); }} key={index} className={"capitalize "}>
                                            <a className={(selectedCategory.id === category.id ? 'active' : '')}>{category.name}</a>
                                        </li>
                                    )
                                }
                            </ul>

                            <div>
                                {
                                    selectedCategory.length !== 0 ?
                                        <div className="grid md:grid-cols-4 gap-5 px-3 h-full">
                                            <div className="">
                                                <div className="grid grid-cols-4 md:grid-cols-1 lg:grid-cols-2 gap-2">
                                                    {
                                                        selectedCategory.child_categories.map((category, index) =>
                                                            <button key={index} className="btn btn-ghost capitalize" onClick={e => { e.stopPropagation(); forwardTo(`/filter/?categories=${category.id}`) }} >{category.name}</button>
                                                        )
                                                    }

                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-start">
                                                <p>
                                                    {selectedCategory.description}
                                                </p>
                                            </div>

                                            <div className="md:col-span-2">
                                                <NavProductContainer title={"Latest Products"} products={latestProducts.products} link={latestProducts.link} forward={forwardTo} />
                                                <NavProductContainer title={"Top Rated Products"} products={topRatedProducts.products} link={topRatedProducts.link} forward={forwardTo} />
                                            </div>
                                        </div>
                                        :
                                        ''
                                }
                            </div>



                        </div>

                    </div>
                </div>
                : ''
            } */}





        </>
    );
}