import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { MoonIcon, SunIcon } from "../../icons";

export const UserMenu = () => {

    const { user, handleLogin, handleLogout } = useContext(UserContext)
    const { session, updateSession } = useContext(CartContext)

    const [themeIcon, setThemeIcon] = useState(<MoonIcon className="w-5 h-5" />);

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

    return (
        <ul tabindex="0" class="menu bg-base-200 w-full">

            {
                user !== null && session !== null ?
                    <>
                        <li>
                            <Link to={"/user/cart"}>Cart</Link>
                            <Link to={"/user/orders"}>Orders</Link>
                            <Link to={"/user/profile"}>Profile</Link>
                            <Link to={"/user/wishlist"}>Wish List</Link>
                        </li>
                    </>
                    : ''
            }

            {
                user !== null && session !== null ?
                    <li className=""><a onClick={e => { handleLogout(); updateSession() }}>Logout</a></li>
                    :
                    <li><a onClick={e => { handleLogin(); updateSession() }}>Login</a></li>

            }

            <li><a onClick={handleThemeChange}>{themeIcon} Toggle Theme</a></li>

        </ul>
    );
}