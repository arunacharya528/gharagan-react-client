import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../adapters/category";

export const Nav = () => {

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        getCategories()
            .then(response => {
                setCategories(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])
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
                        <div class="col-sm-4 d-flex justify-content-between">
                            <a href="#" class="icon-btn">
                                <span id="badge">1</span>
                                <i class="fa fa-cart-plus" aria-hidden="true"></i>
                                <span id="label">Cart</span>
                            </a>
                            <a href="#" class="icon-btn">
                                <span id="badge">1</span>
                                <i class="fa fa-heart-o" aria-hidden="true"></i>
                                <span id="label">Wishlist</span>
                            </a>
                            <div class="profile d-flex align-items-center">
                                <i class="fa fa-user-o" aria-hidden="true"></i>
                                <div>
                                    <div class="user">Welcome user</div>
                                    <a href="#">Login</a>
                                </div>
                            </div>
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