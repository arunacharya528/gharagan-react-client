import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { getCategories } from "../adapters/category";
import { getProducts } from "../adapters/product";
import { getShoppingSession } from "../adapters/shoppingSession";
import { ProductThumbnail } from "../components/ProductThumbnail";
import { Loading } from "../helpers/Loading";
import { AuthLink, AuthUser } from "../pages/Authenticate";


export const Nav = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const [latestProducts, setLatestProducts] = useState([]);
    const [latestProductLink, setLatetstProductlink] = useState('');

    const [mostViewedProducts, setMostViewedProducts] = useState([]);
    const [mostViewedProductLink, setMostViewedProductLink] = useState('');


    const [session, setSession] = useState(undefined);
    const navigate = useNavigate();
    const cookie = new Cookies()
    const [userData, setUserData] = useState(undefined);

    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    // useEffect(() => {
    //     if (!userData) {
    //         setUserData(cookie.get('userData'));
    //     }
    // })

    // const [cartQuantity, setCartQuantity] = useState(undefined);

    // useEffect(() => {
    //     getShoppingSession(cookie.get('access_token'), cookie.get('session_id'))
    //         .then(response => {
    //             const cartSize = response.data.cart_items.length;
    //             setCartQuantity(cartSize);
    //         })
    //         .catch(error => console.log(error))
    // })

    const handleCategorySelection = (category) => {
        // extract ids of child categories in an array
        const childCategories = category.child_categories.map((category, index) => {
            return category.id;
        })

        // implode the array by joining with string and fetch data with contructed link
        const latestLink = "categories=" + childCategories.join(',') + "&sort=latest";
        getProducts(latestLink)
            .then(response => setLatestProducts(response.data.data))
            .catch(error => console.log(error))
        setLatetstProductlink("/filter/?" + latestLink);


        const mostViewedLink = "categories=" + childCategories.join(',') + "&sort=mostViewed";
        getProducts(mostViewedLink)
            .then(response => setMostViewedProducts(response.data.data))
            .catch(error => console.log(error))
        setMostViewedProductLink("/filter/?" + mostViewedLink);
        setSelectedCategory(category);

        setTimeout()
    }

    return (
        <div id="nav">
            <div id="nav-search">
                <div class="container">
                    <div class="row d-flex align-items-center">
                        <div class="col-sm-2">
                            <img src="https://via.placeholder.com/150x70" alt="gharagan logo" />
                        </div>
                        <div class="col">
                            <div id="search" class="d-flex align-items-center justify-content-center">
                                <div class="d-flex" id="container">
                                    <div id="search-icon">
                                        <i class="fa fa-search" aria-hidden="true"></i>
                                    </div>
                                    <div id="search-input">
                                        <input type="text" placeholder="Search for Products" />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-sm-3 d-flex justify-content-between">

                            {
                                userData ?
                                    <div className="position-relative">
                                        <Link to={"/cart"} class="icon-btn">
                                            <span id="badge"></span>
                                            <i class="fa fa-cart-plus" aria-hidden="true"></i>
                                            <span id="label">Cart</span>
                                        </Link>

                                        {
                                            session ?
                                                <div className="position-absolute card border-0 p-3 shadow" style={{ width: '400px', left: '-2rem' }}>
                                                    <div className="d-flex justify-content-end">
                                                        <button className="btn btn-close text-white" onClick={e =>
                                                            setSession(undefined)
                                                        }></button>
                                                    </div>
                                                </div>
                                                : ''
                                        }

                                    </div>
                                    : ''
                            }
                            <AuthUser />
                        </div>
                    </div>
                </div>

            </div>
            <nav id="nav-bar">
                <div class="container">
                    <div class="d-flex flex-wrap flex-row align-items-start">
                        <Link to="/">Home</Link>
                        <Link to="/filter/">Filter</Link>

                        {categories.map((category, index) =>
                            <a onClick={e => handleCategorySelection(category)} key={index}>{category.name}</a>
                        )}
                    </div>
                    {selectedCategory.length !== 0 ?


                        <div className="selectedCategory">
                            <div className="row">
                                <div className="col-sm-5 col-lg-3 d-flex flex-column">
                                    {
                                        selectedCategory.child_categories.map((category, index) =>
                                            <div className="nav-item" key={index} onClick={e => {
                                                navigate(`/filter/?categories=${category.id}`)
                                                setSelectedCategory([]);
                                            }}>{category.name}</div>
                                        )
                                    }
                                </div>
                                <div className="col p-3">
                                    <div className="d-flex justify-content-between align-items-start mb-5">
                                        <p>
                                            {selectedCategory.description}
                                        </p>
                                        <button className="btn btn-close text-white" onClick={e =>
                                            setSelectedCategory([])
                                        }></button>
                                    </div>
                                    <section className="mb-4">
                                        <div className="d-flex justify-content-between">
                                            <h5>Latest Products</h5>
                                            <Link to={latestProductLink}>More <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></Link>
                                        </div>
                                        <div id="catalog-container" className="row">
                                            {latestProducts.length === 0 ?
                                                <Loading />
                                                : latestProducts.slice(0, 3).map((product, index) => <ProductThumbnail key={index} product={product} width={4} />)
                                            }
                                        </div>
                                    </section>
                                    <section className="mb-4">
                                        <div className="d-flex justify-content-between">
                                            <h5>Most Viewed Products</h5>
                                            <Link to={mostViewedProductLink}>More <i class="fa fa-arrow-circle-right" aria-hidden="true"></i></Link>
                                        </div>
                                        <div id="catalog-container" className="row">
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
            </nav>
        </div>
    );
}