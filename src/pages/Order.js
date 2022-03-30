import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { removeCartItem } from "../adapters/cartItems";
import { cancelOrder, getOrderDetailByUser } from "../adapters/orderDetail";

import { createOrder, getShoppingSession } from "../adapters/shoppingSession";
import { Loading } from "../helpers/Loading";
import { Message } from "../helpers/Message";

import moment from 'moment'

export const Order = () => {

    const cookie = new Cookies();
    const [orderDetails, setOrderDetails] = useState(undefined);
    const [total, setTotal] = useState([]);
    const [message, setMessage] = useState(undefined);
    const [refresh, setRefresh] = useState(false);
    // const moment = 

    useEffect(() => {
        getOrderDetailByUser(cookie.get('access_token'), cookie.get('userData').id)
            .then(response => {
                setOrderDetails(response.data.order_details);
            })
            .catch(error => console.log(error))
    }, [refresh]);


    const getDiscountedPrice = (price, discountP) => {
        return price - Math.ceil(0.01 * discountP * price);
    }

    const getTotalPrice = (price, quantity) => {
        return price * quantity
    }

    const getCurrentTotal = (order) => {
        var total = 0;

        order.order_items.map((item) => {
            total += getTotalPrice(getDiscountedPrice(item.product.price, item.product.discount.discount_percent), item.quantity)
        })
        return total;
    }

    const handleOrderCancellation = (orderId) => {
        cancelOrder(cookie.get('access_token'), orderId)
            .then((response) => {
                setMessage({ message: <> <strong>Success!!</strong> Successfully cancelled Order</>, type: 'success' })
                setRefresh(!refresh);
            })
            .catch((error) => {
                setMessage({ message: <> <strong>Error!!</strong> There was an error deleting your order please try again.</>, type: 'danger' })
            });
    }
    return (
        <div className="">
            {message ? <Message message={message.message} type={message.type} /> : ''}
            {orderDetails ?
                <>
                    {
                        orderDetails.length == 0 ?
                            <div className="fw-bold p-3 my-2 text-center" style={{ backgroundColor: "#d9d9d9" }}>
                                There are no Orders placed yet
                            </div>

                            : ''
                    }

                    {orderDetails.map((item, index) =>

                        orderDetails.map((order, index) =>
                            <div className="shadow-sm rounded card mb-5" key={index}>

                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div className="h4">Order</div>

                                    <span className="fst-italic">
                                        {moment(order.created_at).fromNow()}
                                    </span>
                                </div>

                                <div className="card-body py-1 px-3">

                                    <div className="row fw-bold p-3 mb-1" style={{ backgroundColor: "#d9d9d9" }}>
                                        <div className="col-md-2">Image</div>
                                        <div className="col">Detail</div>
                                        <div className="col-md-2">Price</div>
                                        <div className="col-md-2">Quantity</div>
                                        <div className="col-md-1">Total</div>
                                    </div>


                                    {
                                        order.order_items.map((item, index) =>
                                            <div className="row p-3 mb-1 d-flex align-items-center" style={{ backgroundColor: "#d9d9d9" }}>
                                                <div className="col-md-2"><img src={item.product.images[0].image} alt="" style={{ width: "100px" }} /></div>
                                                <div className="col">
                                                    <div className="d-block"><b>Name: </b>
                                                        <Link to={"/product/" + item.product.id}>
                                                            <u>{item.product.name}</u>
                                                        </Link>
                                                    </div>
                                                    <div className="d-block"><b>Category: </b>{item.product.category.name}</div>
                                                    <div className="d-block"><b>Brand: </b>{item.product.brand.name}</div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="d-block"><b>Discount: </b>{item.product.discount ? item.product.discount.discount_percent : "No"}%</div>
                                                    <div className="d-block"><b>Price: </b><s>{item.product.price}</s></div>
                                                    <div className="d-block"><b>Calculated Price: </b>{item.product.discount ? getDiscountedPrice(item.product.price, item.product.discount.discount_percent) : "No"}</div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="d-block"><b>Selected: </b>{item.quantity}</div>
                                                    <div className="d-block"><b>Available: </b>{item.product.inventory.quantity}</div>
                                                </div>

                                                <div className="col-md-1 fw-bold">
                                                    {getTotalPrice(getDiscountedPrice(item.product.price, item.product.discount.discount_percent), item.quantity)}
                                                </div>



                                            </div>
                                        )
                                    }


                                    {
                                        order.length !== 0 ?
                                            <div className="row p-3 fw-bold  d-flex align-items-center" style={{ backgroundColor: "#d9d9d9" }}>
                                                <div className="col-md-2">
                                                    <div>
                                                        <div className="btn btn-danger" onClick={e => handleOrderCancellation(order.id)}>Cancel Order</div>
                                                    </div>
                                                </div>
                                                <div className="col"></div>
                                                <div className="col-md-2"></div>
                                                <div className="col-md-2">
                                                    <div className="d-block">Ordered Total</div>
                                                    <div className="d-block">Current Total</div>
                                                </div>
                                                <div className="col-md-1 text-nowrap">
                                                    <div className="d-block">{order.total}</div>
                                                    <div className="d-block">{getCurrentTotal(order)}</div>
                                                </div>
                                                <div className="col-12 text-end fw-normal mt-3">
                                                    <div className="small">Your paying price is ordered total.<br />Current total is for comparison only.</div>
                                                </div>
                                            </div>
                                            : ''
                                    }
                                </div>

                            </div>

                        )

                    )}



                </>
                : <Loading />}
        </div>
    );
}