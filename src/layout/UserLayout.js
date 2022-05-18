import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { UserContext, UserProvider } from "../context/UserContext";
import { BagIcon, CartIcon, CreditCardIcon, FullScreenEnterIcon, FullScreenExitIcon, ListIcon, MapPinIcon, PersonIcon } from "../icons";
import bag from "../icons/bag.svg"
import { Login } from "../pages/Authenticate";
import { UserDashboard } from "./UserDashboard";

export const UserLayout = ({ component }) => {
    const location = useLocation();
    const { user } = useContext(UserContext)
    const [isDrawerFit, fitDrawer] = useState(false);

    return (
        <>
            {
                user !== null ?
                    <div class={"drawer drawer-mobile " + (isDrawerFit ? "fixed top-0 bg-base-100 z-40" : '')} >
                        <input id="dashboardDrawer" type="checkbox" class="drawer-toggle" />
                        <div class="drawer-content">


                            <div class="navbar bg-base-200 shadow-lg sticky top-0 z-50">
                                <div class="flex-1">
                                    <label for="dashboardDrawer" class="btn btn-ghost btn-square drawer-button lg:hidden">
                                        <ListIcon className="w-6 h-6" />
                                    </label>
                                    <span className="uppercase text-xl font-bold px-5">{location.pathname.split("/")[2]}</span>
                                </div>
                                <div class="flex-none">

                                    <div className="tooltip tooltip-left" data-tip={isDrawerFit ? "Exit Fullscreen" : "Fullscreen"}>
                                        <button className="btn btn-ghost btn-circle" onClick={e => fitDrawer(!isDrawerFit)}>
                                            {isDrawerFit ? <FullScreenExitIcon className="w-5 h-5" /> : <FullScreenEnterIcon className="w-5 h-5" />}
                                        </button>
                                    </div>

                                </div>
                            </div>

                            <div className="p-5">
                                {component}
                            </div>

                        </div>
                        <div class="drawer-side">
                            <label for="dashboardDrawer" class="drawer-overlay"></label>
                            <UserDashboard />
                        </div>
                    </div>

                    : <Login />
            }
        </>
    );
}