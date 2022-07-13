import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BagIcon, CartIcon, CreditCardIcon, HeartIcon, ListIcon, MapPinIcon, PersonIcon, StarIcon } from "../icons";

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
                },
                {
                    icon: <HeartIcon />,
                    name: "Wish List",
                    path: "wishlist"
                },
                {
                    icon: <StarIcon className="w-5 h-5" />,
                    name: "Reviews",
                    path: "reviews"
                },
                {
                    icon: <StarIcon className="w-5 h-5" />,
                    name: "Question Answers",
                    path: "qas"
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
        <ul class="menu w-80 bg-base-100 p-2" >

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