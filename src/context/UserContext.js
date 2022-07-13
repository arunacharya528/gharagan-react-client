import React, { createContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BagIcon, CartIcon, CreditCardIcon, MapPinIcon, PersonIcon } from "../icons";
import Cookies from 'universal-cookie';
import { getIfLoggedIn, logout } from "../adapters/auth";

export const UserContext = createContext(
    {
        user: {
            loading: Boolean,
            data: {
                token: String
            }
        },
        setUserData: Function,
        handleLogout: Function
    }
);

export const UserProvider = ({ children }) => {

    const cookies = new Cookies();
    const initialState = { loading: true, data: {} };
    const [user, setUser] = useState(initialState)

    const handleLogout = (token) => {
        logout(token ? token : user.data.token)
            .then(response => {
                setUser(initialState);
                cookies.remove('token')
            })
            .catch(error => console.log(error))

    }

    useEffect(() => {
        const token = cookies.get('token');
        if (token !== '') {
            getIfLoggedIn({ token: token })
                .then(response => setUser({ loading: false, data: { token: token, name: response.data.name } }))
                .catch(response => setUser(initialState))
        }
    }, [])

    const setUserData = (data = { token: String }) => {
        setUser({
            loading: false,
            data: data
        })
        cookies.set('token', data.token)
    }
    return <UserContext.Provider value={{ user, setUserData, handleLogout }}>
        {children}
    </UserContext.Provider>
}