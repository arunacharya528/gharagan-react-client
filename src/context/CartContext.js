import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../adapters/profile";
import { getShoppingSession } from "../adapters/shoppingSession";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [session, setSession] = useState(null);

    const { user, setUser } = useContext(UserContext);
    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {
        if (user !== null) {
            getUser('', user.id, 'session')
                .then(response => setSession(response.data))
                .catch(error => console.log(error))
        }

    }, [isRefreshed])
    const updateSession = () => {
        setRefresh(!isRefreshed)
    }
    return <CartContext.Provider value={{ session, updateSession }}>{children}</CartContext.Provider>
}