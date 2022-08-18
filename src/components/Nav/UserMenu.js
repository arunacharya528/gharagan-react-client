import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { UserDashboard } from "../../layout/UserDashboard";
import { ThemeToggle } from "./ThemeSwitch";

export const UserMenu = () => {

    const { user, handleLogout } = useContext(UserContext)
    const { updateSession } = useContext(CartContext)

    return (
        <>
            {
                !user.loading ?
                    <UserDashboard short={true} />
                    : ''
            }

           
            <ul tabindex="0" class="menu bg-base-100 w-full p-2">
                {
                    !user.loading ?
                        <li className=""><a onClick={e => { handleLogout(); updateSession() }}>Logout</a></li>
                        :
                        <li><Link to={"/user/profile#login"}>Login</Link></li>
                }
                <li className="inline md:hidden">
                    <ThemeToggle showTitle={true} />
                </li>
            </ul>
        </>

    );
}