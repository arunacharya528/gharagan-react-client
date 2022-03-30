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

    useEffect(() => {
        if (!userData) {
            setUserData(cookie.get('userData'));
        }
    })

    const [cartQuantity, setCartQuantity] = useState(undefined);

    useEffect(() => {
        getShoppingSession(cookie.get('access_token'), cookie.get('session_id'))
            .then(response => {
                if (cartQuantity != response.data.cart_items.length) {
                    setCartQuantity(response.data.cart_items.length);
                }
            })
            .catch(error => console.log(error))
    })

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
                                        <Link to={"/user/cart"} class="icon-btn">
                                            <span id="badge">{cartQuantity ? cartQuantity :
                                                <div class="spinner-border spinner-border-sm" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            }</span>
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