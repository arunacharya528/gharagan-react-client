import React, { createContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BagIcon, CartIcon, CreditCardIcon, MapPinIcon, PersonIcon } from "../icons";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState(null)

    
    return <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
}