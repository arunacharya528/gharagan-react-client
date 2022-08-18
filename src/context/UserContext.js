import React, { createContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BagIcon, CartIcon, CreditCardIcon, MapPinIcon, PersonIcon } from "../icons";
import Cookies from 'universal-cookie';
import { getIfLoggedIn, logout } from "../adapters/auth";
import toast from "react-hot-toast";

export const UserContext = createContext(
    {
        user: {
            loading: Boolean,
            data: {
                token: String
            }
        },
        setUserData: Function,
        handleLogout: Function,
        updateUser: Function
    }
);

export const UserProvider = ({ children }) => {

    const cookies = new Cookies();
    const initialState = { loading: true, data: {} };
    const [user, setUser] = useState(initialState)
    const [isRefreshed, setRefresh] = useState(false);

    const handleLogout = (token) => {
        toast.promise(
            logout(token ? token : user.data.token),
            {
                loading: "Logging out",
                success: () => {
                    setUser(initialState);
                    cookies.remove('token')
                    return "Successfully logged out"
                },
                error: "Error occured while logging out"
            }
        )
    }

    useEffect(() => {
        const token = cookies.get('token');
        if (token && token !== '') {
            getIfLoggedIn({ token: token })
                .then(response => {
                    var data = response.data;
                    data['token'] = token;
                    setUser({ loading: false, data: data })
                })
                .catch(response => setUser(initialState))
        }

    }, [isRefreshed])

    const setUserData = (data = { token: String }) => {
        setUser({
            loading: false,
            data: data
        })
        cookies.set('token', data.token, { path: "/" })
    }

    useEffect(() => {
        if (!user.loading) {
            if (user.data.role !== 3) {
                toast(
                    "Login into admin dashboard to access admin dashboard",
                    {
                        duration: 6000,
                    }
                );
                handleLogout(user.data.token);
            }
        }
    }, [user])


    const updateUser = () => setRefresh(!isRefreshed)
    return <UserContext.Provider value={{ user, setUserData, handleLogout, updateUser }}>
        {children}
    </UserContext.Provider>
}