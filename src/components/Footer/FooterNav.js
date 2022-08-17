import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { CartIcon, HeartIcon, HomeIcon, PersonIcon, SearchIcon } from "../../icons";

export const FooterNav = () => {

    const { user } = useContext(UserContext)
    const { session } = useContext(CartContext)

    const location = useLocation();

    return (
        <>
            <div class="btm-nav flex lg:hidden btm-nav-lg">
                <Link to="/" className={location.pathname === "/" ? 'active' : ''}>
                    <HomeIcon className="h-7 w-7" />
                </Link>

                <Link to="/filter" className={location.pathname === "/filter" ? 'active' : ''}>
                    <SearchIcon className="h-7 w-7" />
                </Link>

                <Link to={"/user/wishlist"} className={location.pathname === "/user/wishlist" ? 'active' : ''}>
                    <HeartIcon className="h-7 w-7" />
                </Link>

                {
                    !user.loading && session !== null ?
                        <label for="rightDrawer">
                            <div class="indicator">
                                <CartIcon className="w-6 h-6" />
                                <span class="badge badge-xs badge-primary indicator-item">
                                    {session.cart_items.length}
                                </span>
                            </div>
                        </label>
                        :
                        <Link to={"/user/cart"} className={location.pathname === "/user/cart" ? 'active' : ''}>
                            <CartIcon className="h-7 w-7" />
                        </Link>

                }
            </div>
        </>

    );
}