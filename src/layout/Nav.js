import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../adapters/product";
import { CategoryMenu } from "../components/Nav/CategoryContent";
import { UserMenu } from "../components/Nav/UserMenu";
import { CartContext } from "../context/CartContext";
import { CategoryContext } from "../context/CategoryContext";
import { UserContext } from "../context/UserContext";
import { Loading } from "../helpers/Loading";
import { CartIcon, PersonIcon, ListIcon, CloseIcon } from "../icons";
import { SearchBar } from "../components/Search";
import { NavProductContainer } from "../components/Nav/NavProductContainer";
import { SiteDetailContext } from "../context/SiteDetailContext";
import { ProfileImage } from "../components/Avatar";
import { ModalContext } from "../context/ModalContext";
import { ThemeToggle } from "../components/Nav/ThemeSwitch";
const queryString = require('query-string')


export const Nav = () => {

    const navigate = useNavigate();

    const { user } = useContext(UserContext);
    const { session } = useContext(CartContext);
    const { categories } = useContext(CategoryContext);
    const { getSiteData } = useContext(SiteDetailContext);

    const [selectedCategory, setSelectedCategory] = useState(null)
    const { setModalData, openModal, closeModal } = useContext(ModalContext);

    const initialState = { loading: true, link: '', products: [] };
    const [latestProducts, setLatestProducts] = useState(initialState);
    const [topRatedProducts, setTopRatedProducts] = useState(initialState);

    const location = useLocation();
    const parsedData = queryString.parse(location.search);
    const selectedCategoryNumber = parsedData.selectedCategory;
    const [toggleLoading, setToggleLoading] = useState(false);

    useEffect(() => {

        if (!latestProducts.loading && !topRatedProducts.loading) {

            setToggleLoading(false)
            setModalData({
                title: `Category: ${selectedCategory.name}`,
                size: "max-w-5xl ",
                body: <>
                    <div className="hidden md:flex justify-center py-3 ">
                        <ul class="menu menu-horizontal bg-base-100 rounded-box">
                            <CategoryMenu />
                        </ul>
                    </div>
                    <div className="grid md:grid-cols-3 gap-5 h-full">
                        <div className="">
                            <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-2">
                                {
                                    selectedCategory.child_categories.map((category, index) =>
                                        <button key={index} className="btn btn-ghost capitalize" onClick={e => { e.stopPropagation(); forwardTo(`/filter/?categories=${category.id}`) }} >{category.name}</button>
                                    )
                                }

                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <NavProductContainer title={"Latest Products"} products={latestProducts.products} link={latestProducts.link} forward={forwardTo} />
                            <NavProductContainer title={"Top Rated Products"} products={topRatedProducts.products} link={topRatedProducts.link} forward={forwardTo} />
                        </div>
                    </div>
                </>
            })
            openModal()
        } else {
            if (selectedCategory !== null) {
                setToggleLoading(true)
            }
        }
    }, [latestProducts, topRatedProducts])


    useEffect(() => {
        if (parsedData.selectedCategory && categories.length !== 0) {
            categories.data.map((category) => {
                if (category.id + "" === parsedData.selectedCategory) {
                    setSelectedCategory(category);

                    const childCategories = category.child_categories.map((category, index) => {
                        return category.id;
                    })

                    // implode the array by joining with string and fetch data with contructed link
                    const latestLink = "?categories=" + childCategories.join(',') + "&sort=latest&orderBy=desc";
                    setLatestProducts(initialState)
                    getProducts(latestLink)
                        .then(response => {
                            setLatestProducts({
                                loading: false,
                                products: response.data,
                                link: "/filter/" + latestLink
                            })
                        })
                        .catch(error => console.log(error))

                    const topRatedLink = "?categories=" + childCategories.join(',') + "&sort=rating&orderBy=desc";
                    setTopRatedProducts(initialState)
                    getProducts(topRatedLink)
                        .then(response => {
                            setTopRatedProducts({
                                loading: false,
                                products: response.data,
                                link: "/filter/" + topRatedLink
                            })
                        })
                        .catch(error => console.log(error))

                }
            })
        }
    }, [selectedCategoryNumber])

    const forwardTo = (link) => {
        navigate(link)
        closeModal()
    }

    const Notification = () => {
        const intitalState = { display: false, data: "" }
        const [notificationShown, setNotificationDisplay] = useState(intitalState);

        useEffect(() => {
            if (getSiteData('notification').trim() === "-" || getSiteData('notification').trim() === "") {
                setNotificationDisplay(intitalState)
            } else {
                setNotificationDisplay({ display: true, data: getSiteData('notification') })
            }
        }, [getSiteData('notification')])


        return (
            <>
                {

                    notificationShown.display ?
                        <div className="container mx-auto m-2 p-1 bg-red-400/10 border border-red-500 rounded-full  flex items-center">
                            <div className="grow text-center" dangerouslySetInnerHTML={{ __html: notificationShown.data }} />
                            <button className="btn btn-ghost btn-circle btn-xs" onClick={e => setNotificationDisplay(false)}>
                                <CloseIcon className="" />
                            </button>
                        </div>
                        : ''
                }
            </>
        );
    }


    return (
        <>
            {
                toggleLoading ?
                    <div className="fixed w-full h-full z-50 flex items-center justify-center text-base-100 bg-slate-600/50 ">
                        <Loading />
                    </div>
                    : ''
            }

            <div className="sticky top-0 z-40 bg-base-100 flex flex-col">
                <Notification />

                <div className="lg:w-10/12 mx-auto flex justify-between items-center space-x-10 p-2 flex-nowrap w-full">

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

                        <Link to="/" className="block mx-auto lg:hidden">
                            <img src={getSiteData('logo_url')} alt="Gharagan logo" className="w-10" />
                        </Link>

                        <div className="bg-base-200 hidden lg:flex space-x-2 items-center rounded-lg p-2 w-full">
                            <SearchBar />
                        </div>

                    </div>

                    <div className="flex flex-row items-center space-x-2">
                        <span className="hidden md:inline">
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

                        {
                            user.loading ?
                                <ul class="hidden lg:flex menu menu-horizontal bg-primary menu-compact rounded-md uppercase font-semibold text-white">
                                    <li><Link to={"/user/profile#login"}>Login</Link></li>
                                    <li><Link to={"/user/profile#register"}>Register</Link></li>
                                </ul>
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

            {
                location.pathname.split("/")[1] !== 'filter' ?
                    <div className="hidden md:flex justify-center py-10 ">
                        <ul class="menu menu-horizontal bg-base-100 rounded-box">
                            <CategoryMenu />
                        </ul>
                    </div>
                    : ''
            }

        </>
    );
}