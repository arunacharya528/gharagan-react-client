import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { CartIcon, HomeIcon, PersonIcon, SearchIcon } from "../../icons";

export const FooterNav = () => {

    const { user } = useContext(UserContext)
    const { session } = useContext(CartContext)

    return (
        <ul class="menu menu-horizontal w-full flex lg:hidden justify-around sticky bottom-0 py-3 z-50 bg-base-200">
            <li>
                <Link to="/" className="flex flex-col">
                    <HomeIcon className="h-7 w-7" />
                </Link>
            </li>
            <li>
                <Link to="/filter" className="flex flex-col">
                    <SearchIcon className="h-7 w-7" />
                </Link>
            </li>
            <li>
                <a className="flex flex-col">
                    <PersonIcon className="h-7 w-7" />
                </a>
            </li>
            {
                user !== null && session !== null ?
                    <label for="rightDrawer" to={"/user/cart"} class="btn btn-ghost btn-circle">
                        <div class="indicator">
                            <CartIcon className="w-6 h-6" />
                            <span class="badge badge-xs badge-primary indicator-item">
                                {session.cart_items.length}
                            </span>
                        </div>
                    </label>
                    : ''
            }
        </ul>
    );
}