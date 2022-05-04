import React, { createContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BagIcon, CartIcon, CreditCardIcon, MapPinIcon, PersonIcon } from "../icons";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        "id": 1,
        "email": "eoconner@example.net",
        "first_name": "Lyla",
        "last_name": "Kassulke",
        "contact": "737.557.3779",
        "type": 2,
        "created_at": "2022-05-04T09:13:12.000000Z",
        "updated_at": "2022-05-04T09:13:12.000000Z"
    })


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
    const getIfActive = (path) => {
        if (location.pathname.includes(path)) {
            return 'active'
        }
    }
    return <UserContext.Provider value={{ user }}>
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
                    {children}
                </div>
            </div>
        </div>
    </UserContext.Provider>
}