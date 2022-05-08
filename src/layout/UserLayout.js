import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { UserContext, UserProvider } from "../context/UserContext";
import { BagIcon, CartIcon, CreditCardIcon, MapPinIcon, PersonIcon } from "../icons";
import bag from "../icons/bag.svg"
import { Login } from "../pages/Authenticate";

export const UserLayout = ({ component }) => {
    const routes = [
        {
            title: "Dashboard",
            items: [
                {
                    icon: <BagIcon />,
                    name: "Orders",
                    value: '',
                    path: "orders"
                },
                {
                    icon: <CartIcon />,
                    name: "Cart",
                    value: '',
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
                    value: '',
                    path: "profile"
                },
                {
                    icon: <MapPinIcon />,
                    name: "Addresses",
                    value: '',
                    path: "addresses"
                },
                {
                    icon: <CreditCardIcon />,
                    name: "Payment Methods",
                    value: '',
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
    const { user } = useContext(UserContext)
    return (
        <>
            {
                user !== null ?
                
                    <div className="container my-4">
                        <div className="row">
                            <div className="col-lg-3">
                                <div id="profile-card">

                                    <div id="profile">
                                        <div className="name">{user.first_name + " " + user.last_name}</div>
                                        <div className="email">{user.email}</div>
                                    </div>

                                    {
                                        routes.map((route, index) =>

                                            <React.Fragment key={index}>
                                                <div className="header">{route.title}</div>
                                                <div className="grid">


                                                    {
                                                        route.items.map((item, index) =>
                                                            <div className={"item " + getIfActive(item.path)} key={index}>
                                                                <div className="detail">
                                                                    <div className="icon">
                                                                        {item.icon}
                                                                    </div>
                                                                    <Link to={"/user/" + item.path} >{item.name}</Link>
                                                                </div>
                                                                <div className="value">
                                                                    {item.value}
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                </div>

                                            </React.Fragment>
                                        )
                                    }
                                </div>
                            </div>
                            <div className="col-lg-9">
                                {component}
                            </div>
                        </div>
                    </div>
                    :<Login/>
            }
        </>
    );
}