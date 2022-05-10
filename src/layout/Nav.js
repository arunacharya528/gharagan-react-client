import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { getCategories } from "../adapters/category";
import { getProducts } from "../adapters/product";
import { getShoppingSession } from "../adapters/shoppingSession";
import { ProductThumbnail } from "../components/Product/ProductThumbnail";
import { CartContext } from "../context/CartContext";
import { UserContext, UserProvider } from "../context/UserContext";
import { Loading } from "../helpers/Loading";
import { CartIcon, PersonIcon } from "../icons";
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

    return (
        <>
            <div class="navbar bg-base-100">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a onClick={handleLogin}>Login</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                            <li><a>About</a></li>
                        </ul>
                    </div>
                </div>
                <div class="navbar-center">
                    <Link to="/" class="btn btn-ghost text-xl uppercase font-bold">
                        gaharagan
                    </Link>
                </div>
                <div class="navbar-end">
                    <button class="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </button>

                    {
                        user !== null && session !== null ?
                            <Link to={"/user/cart"} class="btn btn-ghost btn-circle">
                                <div class="indicator">
                                    <CartIcon />
                                    <span class="badge badge-xs badge-primary indicator-item">
                                        {session.cart_items.length}
                                    </span>
                                </div>
                            </Link>
                            : ''
                    }
                </div>
            </div>
            <div className="flex justify-center">
                <div class="tabs flex flex-col md:flex-row">
                    {categories.map((category, index) =>
                        <button class={"tab tab-bordered font-semibold ease-in-out duration-300 w-full md:w-auto " + (selectedTab === category.id ? 'tab-active text-primary' : '')} onClick={e => { setSelectedTab(category.id); handleCategorySelection(category) }} key={index}>{category.name}</button>
                    )}
                </div>
            </div>

            <div>

                {selectedCategory.length !== 0 ?


                    <div className="selectedCategory">
                        <div className="grid md:grid-cols-4">

                            <ul class="menu bg-base-100 w-60 sm:w-full p-2">
                                {
                                    selectedCategory.child_categories.map((category, index) =>
                                        <li key={index} className="w-full" ><button className=" w-full" onClick={e => {
                                            navigate(`/filter/?categories=${category.id}`)
                                            setSelectedCategory([]);
                                        }} >{category.name}</button></li>
                                    )
                                }
                            </ul>


                            <div className="col-span-3 p-3 relative">
                                <div className="text-right sticky z-10 top-0">
                                    <button class="btn btn-sm btn-circle" onClick={e => { setSelectedCategory([]); setSelectedTab(null); }}>✕</button>
                                </div>

                                <div className="d-flex justify-content-between align-items-start mb-5">
                                    <p>
                                        {selectedCategory.description}
                                    </p>
                                </div>
                                <section className="mb-4">
                                    <div className="flex justify-between">
                                        <h5>Latest Products</h5>
                                        <Link to={latestProductLink}>More <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-5">
                                        {latestProducts.length === 0 ?
                                            <Loading />
                                            : latestProducts.slice(0, 3).map((product, index) => <ProductThumbnail key={index} product={product} width={4} />)
                                        }
                                    </div>
                                </section>
                                <section className="mb-4">
                                    <div className="flex justify-between">
                                        <h5>Most Viewed Products</h5>
                                        <Link to={mostViewedProductLink}>More <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></Link>
                                    </div>
                                    <div className="grid md:grid-cols-3 gap-5">
                                        {mostViewedProducts.length === 0 ?
                                            <Loading />
                                            : mostViewedProducts.slice(0, 3).map((product, index) => <ProductThumbnail key={index} product={product} width={4} />)
                                        }
                                    </div>
                                </section>

                            </div>
                        </div>
                    </div>

                    : ''}

            </div>

        </>
        // <div id="nav">
        //     <div id="nav-search">
        //         <div class="container">
        //             <div class="row d-flex align-items-center">
        //                 <div class="col-sm-2">
        //                     <img src="https://via.placeholder.com/150x70" alt="gharagan logo" />
        //                 </div>
        //                 <div class="col">
        //                     <div id="search" class="d-flex align-items-center justify-content-center">
        //                         <div class="d-flex" id="container">
        //                             <div id="search-icon">
        //                                 <i class="fa fa-search" aria-hidden="true"></i>
        //                             </div>
        //                             <div id="search-input">
        //                                 <input type="text" placeholder="Search for Products" />
        //                             </div>
        //                         </div>

        //                     </div>
        //                 </div>
        //                 <div class="col-sm-3 d-flex justify-content-between">
        //                     {
        //                         user !== null && session !== null ?
        //                             <div className="">
        //                                 <Link to={"/user/cart"} class="icon-btn">
        //                                     <span id="badge">{session.cart_items.length}</span>
        //                                     <CartIcon />
        //                                     <span id="label">Cart</span>
        //                                 </Link>

        //                             </div>
        //                             : ''
        //                     }

        //                     <div class="profile d-flex align-items-center">
        //                         <PersonIcon />
        //                         <div>
        //                             <div class="user">{user ? user.first_name : 'user'}</div>
        //                             {user !== null ?
        //                                 <Link to={'/user/profile'}>Profile</Link>
        //                                 :
        //                                 <Link to={'/login'}>Login</Link>}
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className="col">
        //                     <div class="vstack gap-2 col-md-5 mx-auto">
        //                         <button type="button" class="btn btn-outline-primary" onClick={handleLogin}>Login</button>
        //                         <button type="button" class="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>

        //     </div>
        //     <nav id="nav-bar">
        //         <div class="">
        //             <div class="d-flex flex-wrap flex-row align-items-start">
        //                 <a href="#" onClick={e => toggleCategory(!isCategoryShown)}>Categories</a>
        //                 <Link to="/">Home</Link>
        //                 <Link to="/filter/">Filter</Link>
        //             </div>

        //             {
        //                 isCategoryShown ?
        //                     <div className="dropdown row">
        //                         <div className="col-sm-2 d-flex flex-column">
        //                             {categories.map((category, index) =>
        //                                 <a onClick={e => handleCategorySelection(category)} key={index} className={"dropdown-parent " + (selectedCategory.id === category.id ? 'active' : '')}>{category.name}</a>
        //                             )}
        //                         </div>
        //                         <div className="col">
        //                             <div className="col-sm-12 d-flex justify-content-end">
        //                                 <button className="btn btn-close text-white" onClick={e => { setSelectedCategory([]); toggleCategory(!isCategoryShown) }
        //                                 }></button>
        //                             </div>
        //                             {selectedCategory.length !== 0 ?


        //                                 <div className="selectedCategory">
        //                                     <div className="row">
        //                                         <div className="col-sm-2 col-lg-3 d-flex flex-column">
        //                                             {
        //                                                 selectedCategory.child_categories.map((category, index) =>
        //                                                     <div className="dropdown-child" key={index} onClick={e => {
        //                                                         navigate(`/filter/?categories=${category.id}`)
        //                                                         setSelectedCategory([]);
        //                                                     }}>{category.name}</div>
        //                                                 )
        //                                             }
        //                                         </div>
        //                                         <div className="col p-3">
        //                                             <div className="d-flex justify-content-between align-items-start mb-5">
        //                                                 <p>
        //                                                     {selectedCategory.description}
        //                                                 </p>
        //                                             </div>
        //                                             <section className="mb-4">
        //                                                 <div className="d-flex justify-content-between">
        //                                                     <h5>Latest Products</h5>
        //                                                     <Link to={latestProductLink}>More <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></Link>
        //                                                 </div>
        //                                                 <div id="catalog-container" className="row">
        //                                                     {latestProducts.length === 0 ?
        //                                                         <Loading />
        //                                                         : latestProducts.slice(0, 3).map((product, index) => <ProductThumbnail key={index} product={product} width={4} />)
        //                                                     }
        //                                                 </div>
        //                                             </section>
        //                                             <section className="mb-4">
        //                                                 <div className="d-flex justify-content-between">
        //                                                     <h5>Most Viewed Products</h5>
        //                                                     <Link to={mostViewedProductLink}>More <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></Link>
        //                                                 </div>
        //                                                 <div id="catalog-container" className="row">
        //                                                     {mostViewedProducts.length === 0 ?
        //                                                         <Loading />
        //                                                         : mostViewedProducts.slice(0, 3).map((product, index) => <ProductThumbnail key={index} product={product} width={4} />)
        //                                                     }
        //                                                 </div>
        //                                             </section>

        //                                         </div>
        //                                     </div>
        //                                 </div>

        //                                 : ''}
        //                         </div>
        //                     </div>
        //                     : ''
        //             }

        //         </div>
        //     </nav>
        // </div>
    );
}