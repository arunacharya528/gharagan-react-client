import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { getCategories } from "../adapters/category";
import { getShoppingSession } from "../adapters/shoppingSession";
import { AuthLink, AuthUser } from "../pages/Authenticate";

export const Nav = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [session, setSession] = useState(undefined);
    const navigate = useNavigate();
    const cookie = new Cookies()
    const userData = cookie.get('userData')
    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    const handleCartClick = () => {
        getShoppingSession(userData.access_token, userData.user.id)
            .then(response => {
                setSession(response.data)
                console.log(response)
            })
            .catch(error => console.log(error))
    }
    return (
        <div id="nav">
            {/* {console.log(categories)} */}
            {/* <div id="top-bar" class="">
                <div class="container d-flex justify-content-between">
                    <div>
                        <a href="">Cart</a>
                        <a href="">Orders</a>
                        <a href="">Track Orders</a>
                        <a href="">Wishlist</a>
                    </div>
                    <div class="d-flex">
                        <a href="">Logout</a>
                        <div id="social-media">
                            <span>Follow Us</span>
                            <a href=""><i class="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href=""><i class="fa fa-instagram" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div> */}
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
                                        <a href="#" class="icon-btn" onClick={handleCartClick}>
                                            <span id="badge">1</span>
                                            <i class="fa fa-cart-plus" aria-hidden="true"></i>
                                            <span id="label">Cart</span>
                                        </a>

                                        {
                                            session ?
                                                <div className="position-absolute card border-0 p-3 shadow" style={{ width: '400px', left: '-2rem' }}>
                                                    <div className="d-flex justify-content-end">
                                                        <button className="btn btn-close text-white" onClick={e =>
                                                            setSession(undefined)
                                                        }></button>
                                                    </div>

                                                    {
                                                        session.cart_items.map((item, index) =>

                                                            <div className="row" key={index}>
                                                                <div className="col-2">
                                                                    <img src={item.product.images[0].image} style={{ width: '100%' }} />
                                                                </div>
                                                                <div className="col">{item.product.name}</div>
                                                                <div className="col-2">{item.quantity}</div>
                                                            </div>
                                                        )
                                                    }
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
                            <a onClick={e => setSelectedCategory(category)} key={index}>{category.name}</a>
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
                                    <div className="d-flex justify-content-end">
                                        <button className="btn btn-close text-white" onClick={e =>
                                            setSelectedCategory([])
                                        }></button>
                                    </div>
                                    <div></div>
                                    {selectedCategory.description}
                                </div>
                            </div>
                        </div>
                        : ''}
                </div>
            </nav>
        </div>
    );
}