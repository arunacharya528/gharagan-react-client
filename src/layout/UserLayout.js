import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartProvider } from "../context/CartContext";
import { UserContext, UserProvider } from "../context/UserContext";
import { BagIcon, CartIcon, CreditCardIcon, ListIcon, MapPinIcon, PersonIcon } from "../icons";
import bag from "../icons/bag.svg"
import { Login } from "../pages/Authenticate";

export const UserLayout = ({ component }) => {
    // const routes = [
    //     {
    //         title: "Dashboard",
    //         items: [
    //             {
    //                 icon: <BagIcon />,
    //                 name: "Orders",
    //                 path: "orders"
    //             },
    //             {
    //                 icon: <CartIcon />,
    //                 name: "Cart",
    //                 path: "cart"
    //             }
    //         ]
    //     },
    //     {
    //         title: "Account Settings",
    //         items: [
    //             {
    //                 icon: <PersonIcon />,
    //                 name: "Profile",
    //                 path: "profile"
    //             },
    //             {
    //                 icon: <MapPinIcon />,
    //                 name: "Addresses",
    //                 path: "addresses"
    //             },
    //             {
    //                 icon: <CreditCardIcon />,
    //                 name: "Payment Methods",
    //                 path: "payments"
    //             }

    //         ]
    //     }
    // ];

    // const location = useLocation();
    // const navigate = useNavigate();
    // const getIfActive = (path) => {
    //     if (location.pathname.includes(path)) {
    //         return 'active'
    //     }
    // }
    const { user } = useContext(UserContext)
    return (
        <>
            {
                user !== null ?
                    <>
                    
                        <div className="container mx-auto">
                            <div className="flex justify-between my-2">
                                <label for="leftDrawer" class="btn gap-2 btn-ghost drawer-button ">
                                    <ListIcon className="h-6 w-6" />
                                    Dashboard Menu
                                </label>
                            </div>
                            {component}

                        </div>    
                    
                    </>
                    // <div class="drawer drawer-mobile">
                    //     <input id="my-drawer" type="checkbox" class="drawer-toggle" />
                    //     <div class="drawer-content">


                    //         {component}
                    //     </div>
                    //     <div class="drawer-side">
                    //         <label for="my-drawer" class="drawer-overlay"></label>
                    //         {/* <ul class="menu  w-64 bg-base-100 p-2 " >

                    //             {
                    //                 routes.map((route, index) =>

                    //                     <React.Fragment key={index}>
                    //                         <li class="menu-title">
                    //                             <span>{route.title}</span>
                    //                         </li>
                    //                         {
                    //                             route.items.map((item, index) =>
                    //                                 <li key={index}>

                    //                                     <Link to={"/user/" + item.path} className={getIfActive(item.path) + " relative"}>
                    //                                         {item.icon}
                    //                                         {item.name}
                    //                                     </Link>
                    //                                 </li>
                    //                             )
                    //                         }

                    //                     </React.Fragment>
                    //                 )
                    //             }

                    //         </ul> */}
                    //     </div>
                    // </div>
                    : <Login />
            }
        </>
    );
}