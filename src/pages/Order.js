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
        // getOrderDetailByUser(cookie.get('access_token'), cookie.get('userData').id)
        //     .then(response => {
        //         setOrderDetails(response.data.order_details);
        //     })
        //     .catch(error => console.log(error))
    }, []);

    console.log(orders)
    // const getDiscountedPrice = (price, discountP) => {
    //     return price - Math.ceil(0.01 * discountP * price);
    // }

    // const getTotalPrice = (price, quantity) => {
    //     return price * quantity
    // }

    // const getCurrentTotal = (order) => {
    //     var total = 0;

    //     order.order_items.map((item) => {
    //         total += getTotalPrice(getDiscountedPrice(item.product.price, item.product.discount.discount_percent), item.quantity)
    //     })
    //     return total;
    // }

    // const handleOrderCancellation = (orderId) => {
    //     cancelOrder(cookie.get('access_token'), orderId)
    //         .then((response) => {
    //             setMessage({ message: <> <strong>Success!!</strong> Successfully cancelled Order</>, type: 'success' })
    //             setRefresh(!refresh);
    //         })
    //         .catch((error) => {
    //             setMessage({ message: <> <strong>Error!!</strong> There was an error deleting your order please try again.</>, type: 'danger' })
    //         });
    // }

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

    const getProgressBar = (status) => {

        const getResponse = () => {
            switch (status) {
                case 1: return 'Order Placed';
                case 2: return 'Product collected for delivery';
                case 3: return 'Product being Shipped';
                case 4: return 'Product Received';
            }
        }

        return (<div class="progress" style={{ height: 1.5 + "rem" }}>
            <div class="progress-bar" role="progressbar" style={{ width: (status * 25) + "%" }} aria-valuenow={status * 25} aria-valuemin="0" aria-valuemax="100">{getResponse()}</div>
        </div>);
    }

    return (

        <>
            {orders ?
                orders.map((order, index) =>

                    <div key={index} className="mb-5">
                        <div class="" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + index} >
                            <div className="summary-grid " style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
                                <div className="item d-flex flex-column">
                                    <span className="d-flex"><b>Order placed:{' '}</b>{moment(order.created_at).calendar()}</span>
                                    <span className="d-flex"><b>Last action took in :{' '}</b>{moment(order.updated_at).calendar()}</span>
                                </div>
                                <div className="item price">
                                    <span className="d-flex"><b>Total: </b>Rs. { order.total}</span>
                                </div>
                                <div className="item">
                                    <div className="btn btn-outline-danger">Cancel order</div>
                                </div>
                            </div>
                            {getProgressBar(order.status)}
                        </div>
                        <div class="collapse border rounded mt-2 p-2" id={"collapse" + index}>
                            <div className="summary-grid" style={{ gridTemplateColumns: 'repeat(6,1fr)' }}>

                                <>
                                    <div className="item header">Image</div>
                                    <div className="item header">Quantity</div>
                                    <div className="item header">Price</div>
                                    <div className="item header">Discount</div>
                                    <div className="item header">Buying Price</div>
                                    <div className="item header">Total Price</div>
                                </>
                                {
                                    order.order_items.map((item, index) =>
                                        <React.Fragment key={index}>
                                            <div className="item">
                                                <img src={getImageURl(item.product.images[0])} alt={"Image of " + item.product.name} />
                                            </div>

                                            <div className="item">
                                                {item.quantity}
                                            </div>

                                            <div className="item price">
                                                Rs. {item.inventory.price}
                                            </div>

                                            <div className="item">
                                                {item.inventory.discount ? item.inventory.discount.discount_percent + "%" : '-'}
                                            </div>

                                            <div className="item price">
                                                Rs. {getCalculatedPrice(item.inventory)}
                                            </div>
                                            <div className="item price">
                                                Rs. {getTotalPrice(item.quantity, item.inventory)}
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            </div>
                        </div>
                    </div>



                )

                : <Loading />
            }

        </>

    );
}