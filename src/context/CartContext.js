import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../adapters/profile";
import { getShoppingSession } from "../adapters/shoppingSession";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

    const [session, setSession] = useState([]);

    const { user } = useContext(UserContext);

    useEffect(() => {
        getUser('', user.id, 'session')
            .then(response => setSession(response.data))
            .catch(error => console.log(error))
    }, [user])

    return <CartContext.Provider value={{ session }}>{children}</CartContext.Provider>
}