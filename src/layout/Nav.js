export const Nav = () => { 
    return (
        <div id="nav">
            <div id="top-bar" class="">
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
            </div>
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
            <div id="nav-bar">
                <div class="container">
                    <div class="d-flex flex-wrap">
                        <a href="#">Nav component</a>
                        <a href="#">Nav component</a>
                        <a href="#">Nav component</a>
                        <a href="#">Nav component</a>
                        <a href="#">Nav component</a>
                        <a href="#">Nav component</a>
                    </div>
                </div>
            </div>
        </div>
    );
}