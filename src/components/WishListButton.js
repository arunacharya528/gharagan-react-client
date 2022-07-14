import { useContext, useEffect, useState } from "react";
import { postWishList, removeFromWishList } from "../adapters/wishlist";
import { UserContext } from "../context/UserContext";
import { WishListContext } from "../context/WishListContext";
import { HeartIcon } from "../icons";
import toast from 'react-hot-toast';

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
        toast.promise(
            removeFromWishList(user.data.token, getFromWishList(productId).id),
            {
                loading: "Removing from wish list",
                success: () => {
                    updateWishList()
                    setActive(false)
                    return "Product removed from wishlist"
                },
                error: "Error removing product from wishlist"
            }
        )
    }

    const handleWishListAddition = () => {
        toast.promise(
            postWishList(user.data.token, { product_id: productId, user_id: user.id }),
            {
                loading: "Adding product to wishlist",
                success: () => {
                    updateWishList()
                    setActive(true)
                    return "Product added to wishlist"
                },
                error: "Error adding product to wishlist"
            }
        )
    }


    return (
        <div class="tooltip tooltip-top" data-tip={!user.loading ? isActive ? "Remove from wishlist" : "Add to wishlist" : "Login to access"}>
            <button class={`btn btn-square btn-active btn${size} ` + (isActive ? 'btn-primary' : 'btn-ghost') + (user.loading ? ' btn-ghost btn-disabled text-white' : '')} onClick={isActive ? handleWishListRemoval : handleWishListAddition}>
                <HeartIcon className={(size === "-sm" ? 'h-4 w-4' : 'h-5 w-5')} />
            </button>
        </div>
    );
}