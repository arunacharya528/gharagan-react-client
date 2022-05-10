import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BagIcon, CartIcon, CreditCardIcon, ListIcon, MapPinIcon, PersonIcon } from "../icons";

export const UserDashboard = () => { 
    const routes = [
        {
            title: "Dashboard",
            items: [
                {
                    icon: <BagIcon />,
                    name: "Orders",
                    path: "orders"
                },
                {
                    icon: <CartIcon />,
                    name: "Cart",
                    path: "cart"
                }
            ]
        },
        {
            title: "Account Settings",
            items: [
                {
                    icon: <PersonIcon />,
                    name: "Profile",
                    path: "profile"
                },
                {
                    icon: <MapPinIcon />,
                    name: "Addresses",
                    path: "addresses"
                },
                {
                    icon: <CreditCardIcon />,
                    name: "Payment Methods",
                    path: "payments"
                }

            ]
        }
    ];

    const location = useLocation();
    const navigate = useNavigate();
    const getIfActive = (path) => {
        if (location.pathname.includes(path)) {
            return 'active'
        }
    }

    return (
        <ul class="menu w-full bg-base-100 " >

            {
                routes.map((route, index) =>

                    <React.Fragment key={index}>
                        <li class="menu-title">
                            <span>{route.title}</span>
                        </li>
                        {
                            route.items.map((item, index) =>
                                <li key={index}>

                                    <Link to={"/user/" + item.path} className={getIfActive(item.path) + " relative"}>
                                        {item.icon}
                                        {item.name}
                                    </Link>
                                </li>
                            )
                        }

                    </React.Fragment>
                )
            }

        </ul>
    );
}