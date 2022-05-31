import { useContext, useEffect, useState } from "react";
import { postWishList, removeFromWishList } from "../adapters/wishlist";
import { UserContext } from "../context/UserContext";
import { WishListContext } from "../context/WishListContext";
import { HeartIcon } from "../icons";

export const WishListButton = ({ productId, size = "-sm" }) => {

    const { wishList, updateWishList, getFromWishList } = useContext(WishListContext);
    const { user } = useContext(UserContext);

    const [isActive, setActive] = useState(false);

    useEffect(() => {
        if (getFromWishList(productId)) {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [user])

    const handleWishListRemoval = () => {
        removeFromWishList(getFromWishList(productId).id)
            .then(response => {
                updateWishList()
                setActive(false)
            })
            .catch(error => console.log(error))


    }

    const handleWishListAddition = () => {
        postWishList({ product_id: productId, user_id: user.id })
            .then(response => {
                updateWishList()
                setActive(true)
            })
            .catch(error => console.log(error))
    }


    return (
        <div class="tooltip tooltip-top" data-tip={user !== null ? isActive ? "Remove from wishlist" : "Add to wishlist" : "Login to access"}>
            <button class={`btn btn-square btn-active btn${size} ` + (isActive ? 'btn-primary' : 'btn-ghost') + (user === null ? ' btn-ghost btn-disabled text-white' : '')} onClick={isActive ? handleWishListRemoval : handleWishListAddition}>
                <HeartIcon className={(size === "-sm" ? 'h-4 w-4' : 'h-5 w-5')} />
            </button>
        </div>
    );
}