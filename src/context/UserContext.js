import React, { createContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BagIcon, CartIcon, CreditCardIcon, MapPinIcon, PersonIcon } from "../icons";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    const handleLogin = () => {
        setUser(
            {
                "id": 1,
                "email": "eoconner@example.net",
                "first_name": "Lyla",
                "last_name": "Kassulke",
                "contact": "737.557.3779",
                "type": 2,
                "created_at": "2022-05-04T09:13:12.000000Z",
                "updated_at": "2022-05-04T09:13:12.000000Z"
            }
        )
    }

    const handleLogout = () => {
        setUser(null)
    }


    return <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
        {children}
    </UserContext.Provider>
}