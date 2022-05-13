import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CartItem } from "../components/Cart/CartItem";
import { CartContext } from "../context/CartContext";
import { getSubTotal } from "../helpers/calculatePrice";

export const Cart = () => {

    const { session } = useContext(CartContext);

    return (
        <>

            <div className="flex flex-col justify-center items-center p-2">
                <div className="text-2xl font-extrabold text-left w-full mb-4">Cart</div>

                {
                    session !== null ?

                        <div className="w-full flex flex-col divide-y-2">
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

                    <Link to={"/user/checkout"} className="btn btn-block btn-accent mt-4">
                        Checkout
                    </Link>
                </div>
            </div>

        </>
    );
}