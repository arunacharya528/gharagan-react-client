import { createContext, useContext, useEffect, useState } from "react";
import { getUser } from "../adapters/profile";
import { UserContext } from "./UserContext";

export const WishListContext = createContext();


export const WishListProvider = ({ children }) => {

    const [wishList, setWishList] = useState([]);

    const { user } = useContext(UserContext)
    const [isRefreshed, setRefresh] = useState(false)

    useEffect(() => {
        if (user !== null) {
            getUser('', user.id, 'wishlist')
                .then(response => setWishList(response.data))
                .catch(error => console.log(error))
        }
    }, [isRefreshed, user])

    const updateWishList = () => {
        setRefresh(!isRefreshed);
    }

    const getFromWishList = (productId) => {
        return wishList.find((wish) => wish.product_id === productId)
    }

    return <WishListContext.Provider value={{ wishList, updateWishList, getFromWishList }}>{children}</WishListContext.Provider>
}