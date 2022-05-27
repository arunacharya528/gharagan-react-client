import { useContext, useEffect, useState } from "react";
import { getUser } from "../adapters/profile";
import { LongProductThumbnail } from "../components/Product/LongProductThumbnail";
import { UserContext } from "../context/UserContext";
import { WishListContext } from "../context/WishListContext";

export const WishList = () => {


    const { wishList } = useContext(WishListContext);


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