import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { removeCartItem } from "../adapters/cartItems";
import { cancelOrder, getOrderDetailByUser } from "../adapters/orderDetail";

import { createOrder, getShoppingSession } from "../adapters/shoppingSession";
import { Loading } from "../helpers/Loading";
import { Message } from "../helpers/Message";

import moment from 'moment'
import { getUser } from "../adapters/profile";
import { UserContext } from "../context/UserContext";
import { CloseIcon } from "../icons";
import { OrderView } from "../components/Order/OrderView";

export const Order = () => {

    const cookie = new Cookies();
    const [orderDetails, setOrderDetails] = useState(undefined);
    const [total, setTotal] = useState([]);
    const [message, setMessage] = useState(undefined);
    const [refresh, setRefresh] = useState(false);
    // const moment = 

    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState(undefined)
    useEffect(() => {

        getUser('', user.id, 'orders')
            .then(response => setOrders(response.data))
            .catch(error => console.log(error))
    }, []);


    const getImageURl = (productImage) => {
        return productImage.file ? process.env.REACT_APP_FILE_PATH + productImage.file.path : productImage.image_url;
    }

    const getCalculatedPrice = (inventory) => {
        if (!inventory.discount) {
            return inventory.price;
        } else {
            const discountPercent = inventory.discount.discount_percent
            const price = inventory.price;

            const discountedPrice = price - (price * 0.01 * discountPercent)

            return Math.round((discountedPrice + Number.EPSILON) * 100) / 100
        }
    }


    const getTotalPrice = (quantity, inventory) => {
        return Math.round(((quantity * getCalculatedPrice(inventory)) + Number.EPSILON) * 100) / 100;
    }

    const getSteps = (status) => {

        const getResponse = (place) => {
            if (place <= status) {
                return 'step-primary';
            }
        }
        return (
            <ul class="steps steps-vertical lg:steps-horizontal lg:w-full my-5">
                <li class={"step " + getResponse(1)}>Order placed</li>
                <li class={"step " + getResponse(2)}>Product Collected for delivery</li>
                <li class={"step " + getResponse(3)}>Product being shipped</li>
                <li class={"step " + getResponse(4)}>Product received</li>
            </ul>
        );
    }

    return (

        <>
            {orders ?
                orders.map((order, index) =>
                    <div className="p-2 mb-8">
                        <div className="flex justify-between">
                            <div className="flex w-full">
                                <span className="text-gray-400">Order number</span>
                                <div className="font-bold ml-1">{order.id}</div>
                                &bull;
                                <div className="font-semibold ml-1">{moment(order.created_at).format("MMM D YYYY")}</div>
                            </div>

                            <a className="whitespace-nowrap text-primary font-semibold">View invoice</a>
                        </div>
                        <div className="divider"></div>
                        <OrderView order={order} />
                        <div className="divider" />
                        <div className="font-semibold">Latest action took place in {moment(order.updated_at).format("MMMM D YYYY")}</div>
                        {getSteps(order.status)}
                        <div className="grid md:grid-cols-3 p-5 m-1 rounded-lg bg-slate-400/10">
                            <div className="flex flex-col">
                                <span className="font-semibold my-5">Billing/Shipping Address</span>
                                <div className="text-sm flex flex-col">
                                    <span>{order.address.address_line1}</span>
                                    <span>{order.address.address_line2}</span>
                                    <span>{order.address.city}</span>
                                    <span>{order.address.telephone}</span>
                                    <span>{order.address.mobile}</span>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold my-5">Payment Information</span>

                            </div>

                            <div className="flex flex-col divide-y-2">
                                <div className="flex justify-between px-2 py-5">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">Rs.1000</span>
                                </div>
                                <div className="flex justify-between px-2 py-5">
                                    <span>Shipping</span>
                                    <span className="font-semibold">Rs.1000</span>
                                </div>
                                <div className="flex justify-between px-2 py-5">
                                    <span className="font-semibold">Order Total</span>
                                    <span className="text-accent font-bold">Rs.1000</span>
                                </div>


                            </div>
                        </div>
                    </div>
                )

                : <Loading />
            }

        </>

    );
}