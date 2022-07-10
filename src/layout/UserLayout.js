import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { UserContext, UserProvider } from "../context/UserContext";
import { ArrowLeftIcon, BagIcon, CartIcon, ChevronLeftIcon, CreditCardIcon, FullScreenEnterIcon, FullScreenExitIcon, ListIcon, MapPinIcon, PersonIcon } from "../icons";
import bag from "../icons/bag.svg"
import { Login } from "../pages/Authenticate";
import { UserDashboard } from "./UserDashboard";

export const UserLayout = ({ component }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useContext(UserContext)
    const [isDrawerFit, fitDrawer] = useState(false);
    
    return (
        <>
            {
                !user.loading ?
                    <div class={"drawer drawer-mobile " + (isDrawerFit ? "fixed top-0 bg-base-100 z-40" : '')} >
                        <input id="dashboardDrawer" type="checkbox" class="drawer-toggle" />
                        <div class="drawer-content">
                            <div class="navbar bg-base-200 shadow-md sticky top-0 z-50">
                                <div class="flex-1 flex space-x-3">
                                    <label for="dashboardDrawer" class="btn btn-ghost btn-square drawer-button lg:hidden">
                                        <ListIcon className="w-6 h-6" />
                                    </label>
                                    {
                                        location.pathname.split('/').length >= 4 ?
                                            <button className="btn btn-circle btn-ghost" onClick={e => navigate(-1)}>
                                                <ArrowLeftIcon />
                                            </button>
                                            : ''
                                    }
                                    <span className="uppercase text-xl font-bold">{location.pathname.split("/")[2]}</span>
                                </div>
                                <div class="flex-none">

                                    <div className="tooltip tooltip-left" data-tip={isDrawerFit ? "Exit Fullscreen" : "Fullscreen"}>
                                        <button className="btn btn-ghost btn-circle" onClick={e => fitDrawer(!isDrawerFit)}>
                                            {isDrawerFit ? <FullScreenExitIcon /> : <FullScreenEnterIcon />}
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