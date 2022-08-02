import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { ThemeToggle } from "./ThemeSwitch";

export const UserMenu = () => {

    const { user, handleLogout } = useContext(UserContext)
    const { updateSession } = useContext(CartContext)

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

            <li className="inline md:hidden">
                <ThemeToggle showTitle={true} />
            </li>
        </ul>
    );
}