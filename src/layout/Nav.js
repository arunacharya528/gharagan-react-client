import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { getCategories } from "../adapters/category";
import { getProducts } from "../adapters/product";
import { getShoppingSession } from "../adapters/shoppingSession";
import { ShortProductThumbnail } from "../components/Product/ShortProductThumbnail";
import { CartContext } from "../context/CartContext";
import { UserContext, UserProvider } from "../context/UserContext";
import { Loading } from "../helpers/Loading";
import { CartIcon, MoonIcon, PersonIcon, SunIcon, ListIcon } from "../icons";
import { AuthLink, AuthUser } from "../pages/Authenticate";


export const Nav = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const [latestProducts, setLatestProducts] = useState([]);
    const [latestProductLink, setLatetstProductlink] = useState('');

    const [mostViewedProducts, setMostViewedProducts] = useState([]);
    const [mostViewedProductLink, setMostViewedProductLink] = useState('');


    // const [session, setSession] = useState(undefined);
    const navigate = useNavigate();
    const cookie = new Cookies()
    const [userData, setUserData] = useState(undefined);

    const [isCategoryShown, toggleCategory] = useState(false);

    const { user, setUser } = useContext(UserContext);
    const { session, updateSession } = useContext(CartContext);
    const [selectedTab, setSelectedTab] = useState(null);
    // console.log(user.id);
    // console.log(session.cart_items.length)

    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


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

    const handleLogin = () => {
        setUser(
            {
                "id": 1,
                "email": "eoconner@example.net",
                "first_name": "Lyla",
                "last_name": "Kassulke",
                "contact": "737.557.3779",
                "type": 2,
                "created_at": "2022-05-04T09:13:12.000000Z",
                "updated_at": "2022-05-04T09:13:12.000000Z"
            }
        )
        updateSession();

    }

    const handleLogout = () => {
        setUser(null)
        updateSession();
    }

    const [themeIcon, setThemeIcon] = useState(<MoonIcon className="w-5 h-5" />);

    const forwardTo = (link) => {
        setSelectedCategory([])
        navigate(link)
        setSelectedTab(null)
    }

    const handleThemeChange = (e) => {

        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme')
        switch (currentTheme) {
            case 'light':
                htmlElement.setAttribute('data-theme', 'dark')
                setThemeIcon(<SunIcon className="w-5 h-5" />)
                break;
            case 'dark':
                htmlElement.setAttribute('data-theme', 'light')
                setThemeIcon(<MoonIcon className="w-5 h-5" />)
                break;
            default:
                htmlElement.setAttribute('data-theme', 'dark')
                setThemeIcon(<SunIcon className="w-5 h-5" />)
                break;
        }

    }

    const categoryContent = () => {
        return (
            <>
                {categories.map((category, index) =>
                    <li class={""} onClick={e => { setSelectedTab(category.id); handleCategorySelection(category) }} key={index}>
                        <a className={(selectedTab === category.id ? 'active' : '')}>{category.name}</a>
                    </li>
                )}
            </>
        );
    }


    return (
        <>
            <div className="container mx-auto flex justify-between items-center py-8 px-2">
                <div>
                    <Link to="/">
                        <img src="http://via.placeholder.com/200x75?text=Gharagan%20logo" />

                    </Link>

                </div>

                <div className="grow flex justify-center">
                    <div class="form-control w-2/3">
                        <div class="input-group w-full">
                            <input type="text" placeholder="Search…" class="input input-bordered w-full !rounded-l-full" />
                            <button class="btn btn-primary btn-square !rounded-r-full">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row">

                    <button tabindex="0" class="btn btn-ghost btn-circle" onClick={handleThemeChange}>
                        {themeIcon}
                    </button>
                    <div class="dropdown dropdown-end">
                        <label tabindex="0" class="btn btn-ghost btn-circle">
                            <PersonIcon className="h-5 w-5" />
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">

                            {
                                user !== null && session !== null ?
                                    <>
                                        <li class="menu-title">
                                            <span>Profile</span>
                                        </li>
                                        <li>
                                            <Link to={"/user/cart"}>Cart</Link>
                                            <Link to={"/user/orders"}>Orders</Link>
                                            <Link to={"/user/profile"}>Profile</Link>
                                            <Link to={"/user/wishlist"}>Wish List</Link>
                                        </li>
                                    </>
                                    : ''
                            }

                            <li class="menu-title">
                                <span>Account</span>
                            </li>
                            {
                                user !== null && session !== null ?
                                    <li className="btn btn-outline btn-error"><a onClick={handleLogout}>Logout</a></li>
                                    :
                                    <li><a onClick={handleLogin}>Login</a></li>

                            }

                        </ul>
                    </div>
                    {
                        user !== null && session !== null ?
                            <label for="rightDrawer" to={"/user/cart"} class="btn btn-ghost btn-circle">
                                <div class="indicator">
                                    <CartIcon />
                                    <span class="badge badge-xs badge-primary indicator-item">
                                        {session.cart_items.length}
                                    </span>
                                </div>
                            </label>
                            : ''
                    }
                </div>

            </div>

            <div class="container mx-auto navbar bg-base-100">


                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost gap-2 lg:hidden">
                            <ListIcon />
                            Categories
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {categoryContent()}
                        </ul>
                    </div>
                    {/* <a class="btn btn-ghost normal-case text-xl">daisyUI</a> */}
                </div>
                <div class="navbar-center hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">
                        {categoryContent()}
                    </ul>
                </div>

                <div className="navbar-end"></div>
            </div>


            <div className="relative">
                <div className="absolute bg-base-200 border-b w-full z-20">
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