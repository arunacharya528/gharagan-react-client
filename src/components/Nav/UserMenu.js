import { useEffect } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { MoonIcon, SunIcon } from "../../icons";

export const UserMenu = () => {

    const { user, handleLogout } = useContext(UserContext)
    const { updateSession } = useContext(CartContext)

    const icons = {
        light: <MoonIcon className="w-5 h-5" />,
        dark: <SunIcon className="w-5 h-5" />
    };
    const [themeIcon, setThemeIcon] = useState(null);

    const setTheme = (mode) => {
        const htmlElement = document.documentElement;
        htmlElement.setAttribute('data-theme', mode)
        setThemeIcon(icons[mode])
    }

    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        } else {
            setTheme('light');
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
            event.matches ? setTheme('dark') : setTheme('light');
        });
    }, [])


    const handleThemeChange = (e) => {

        const htmlElement = document.documentElement;
        const currentTheme = htmlElement.getAttribute('data-theme')

        switch (currentTheme) {
            case 'light':
                setTheme('dark')
                break;
            case 'dark':
                setTheme('light')
                break;
        }
    }



    return (
        <ul tabindex="0" class="menu bg-base-200 w-full">

            {
                !user.loading ?
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
                !user.loading ?
                    <li className=""><a onClick={e => { handleLogout(); updateSession() }}>Logout</a></li>
                    :
                    <li><Link to={"/user/profile"}>Login</Link></li>


            }

            <li><a onClick={handleThemeChange}>{themeIcon} Toggle Theme</a></li>

        </ul>
    );
}