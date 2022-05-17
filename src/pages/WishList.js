import { useContext, useEffect, useState } from "react";
import { getUser } from "../adapters/profile";
import { LongProductThumbnail } from "../components/Product/LongProductThumbnail";
import { UserContext } from "../context/UserContext";

export const WishList = () => {

    const [wishList, setWishList] = useState([]);

    const { user } = useContext(UserContext)
    const [isRefreshed, setRefresh] = useState(false)

    useEffect(() => {
        getUser('', user.id, 'wishlist')
            .then(response => setWishList(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])


    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5">
            {
                wishList.map((wish, index) =>
                    <LongProductThumbnail product={wish.product} key={index} />
                )
            }
        </div>
    );
}