import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { removeCartItem } from "../adapters/cartItems";

import { createOrder, getShoppingSession } from "../adapters/shoppingSession";
import { CartItem } from "../components/Cart/CartItem";
import { ProductImage } from "../components/ProductImage";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { Loading } from "../helpers/Loading";
import { Message } from "../helpers/Message";
import { CloseIcon } from "../icons";

export const Cart = () => {

    // const cookie = new Cookies();
    const [cartItems, setCartItems] = useState(undefined);
    const [total, setTotal] = useState([]);
    const [message, setMessage] = useState(undefined);
    const [refresh, setRefresh] = useState(false);

    const { session } = useContext(CartContext);

    const getTotalPrice = (inventory) => {
        if (!inventory.discount) {
            return inventory.price;
        } else {
            const discountPercent = inventory.discount.discount_percent
            const price = inventory.price;

            const discountedPrice = price - (price * 0.01 * discountPercent)

            return Math.round((discountedPrice + Number.EPSILON) * 100) / 100
        }
    }

    const getSumTotal = (price, quantity) => {
        const total = price * quantity;
        return Math.round((total + Number.EPSILON) * 100) / 100

    }

    const getSubTotal = (items) => {
        var sum = 0;
        items.map((item) => {
            sum += getSumTotal(getTotalPrice(item.inventory), item.quantity)
        })
        return sum;
    }
    return (
        <>

            <div className="flex flex-col justify-center items-center p-2">
                <div className="text-2xl font-extrabold text-left w-full mb-4">Cart</div>

                {
                    session !== null ?

                        <div className="w-full ">
                            {
                                session.cart_items.map((item, index) =>
                                    <CartItem item={item} key={index} />
                                )
                            }
                        </div>
                        : ''
                }


                <div className="w-full mt-8">
                    <div className="flex justify-between">
                        <span className="font-semibold">Subtotal</span>
                        <span className="font-bold">{
                            session !== null ?
                                "Rs. " + getSubTotal(session.cart_items)
                                : ''
                        }</span>
                    </div>
                    <div className="font-light">
                        Shipping charges and promo discount would be calculated at checkout
                    </div>

                    <button className="btn btn-block btn-accent mt-4">
                        Checkout
                    </button>
                </div>
            </div>

        </>
    );
}