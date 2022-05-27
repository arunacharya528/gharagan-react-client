import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { CartIcon, HeartIcon, HomeIcon, PersonIcon, SearchIcon } from "../../icons";

export const FooterNav = () => {

    const { user } = useContext(UserContext)
    const { session } = useContext(CartContext)

    return (
        <ul class="menu menu-horizontal w-full flex lg:hidden justify-around sticky bottom-0 py-3 z-50 bg-base-200">
            <li>
                <Link to="/" className="btn btn-ghost">
                    <HomeIcon className="h-7 w-7" />
                </Link>
            </li>
            <li>
                <Link to="/filter" className="btn btn-ghost">
                    <SearchIcon className="h-7 w-7" />
                </Link>
            </li>
            <li>
                <Link to={"/user/wishlist"} className="btn btn-ghost">
                    <HeartIcon className="h-7 w-7" />
                </Link>
            </li>
            {
                user !== null && session !== null ?
                    <label for="rightDrawer" class="btn btn-ghost">
                        <div class="indicator">
                            <CartIcon className="w-6 h-6" />
                            <span class="badge badge-xs badge-primary indicator-item">
                                {session.cart_items.length}
                            </span>
                        </div>
                    </label>
                    : <li>
                        <Link to={"/user/cart"} className="btn btn-ghost">
                            <CartIcon className="h-7 w-7" />
                        </Link>
                    </li>
            }
        </ul>
    );
}