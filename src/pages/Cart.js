import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";

import { createOrder, getShoppingSession } from "../adapters/shoppingSession";
import { Loading } from "../helpers/Loading";
import { Message } from "../helpers/Message";

export const Cart = () => {

    const cookie = new Cookies();
    const [cartItems, setCartItems] = useState(undefined);
    const [total, setTotal] = useState([]);
    const [message, setMessage] = useState(undefined);

    useEffect(() => {
        getShoppingSession(cookie.get('access_token'), cookie.get('session_id'))
            .then(response => {
                setCartItems(response.data.cart_items);
                setTotal(response.data.total);
            })
            .catch(error => console.log(error))
    }, []);


    const getDiscountedPrice = (price, discountP) => {
        return price - Math.ceil(0.01 * discountP * price);
    }

    const getTotalPrice = (price, quantity) => {
        return price * quantity
    }

    const getGrandTotal = () => {

        var total = 0;
        cartItems.map(item => {
            total += getTotalPrice(getDiscountedPrice(item.product.price, item.product.discount.discount_percent), item.quantity)
        })

        return total;
    }

    const handleOrder = () => {

        console.log(cookie.get('access_token'), cookie.get('session_id'));

        createOrder(cookie.get('access_token'), cookie.get('session_id'))
            .then(response => setMessage(<><strong>Success!!</strong> Successfully placeed your order</>))
            .catch(error => setMessage(<><strong>Error!</strong> There was an error placing your order please try again.</>))
    }
    return (
        <div className="container">
            {message ? <Message /> : ''}
            {cartItems ?
                <>
                    {
                        cartItems.length !== 0 ?
                            <div className="row fw-bold p-3 my-2" style={{ backgroundColor: "#d9d9d9" }}>
                                <div className="col-md-2">Image</div>
                                <div className="col">Detail</div>
                                <div className="col-md-2">Price</div>
                                <div className="col-md-2">Quantity</div>
                                <div className="col-md-1">Total</div>
                                <div className="col-md-1">Action</div>
                            </div>

                            : ''
                    }

                    {
                        cartItems.length == 0 ?
                            <div className="fw-bold p-3 my-2 text-center" style={{ backgroundColor: "#d9d9d9" }}>
                                There are no items in your cart
                            </div>

                            : ''
                    }

                    {cartItems.map((item, index) =>


                        <div className="row p-3 my-2 d-flex align-items-center" style={{ backgroundColor: "#d9d9d9" }}>
                            <div className="col-md-2"><img src={item.product.images[0].image} alt="" style={{ width: "100px" }} /></div>
                            <div className="col">
                                <div className="d-block"><b>Name: </b>{item.product.name}</div>
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
                            <div className="col-md-1"><div className="btn btn-close" title="remove"></div></div>
                        </div>
                    )}

                    {
                        cartItems.length !== 0 ?
                            <div className="row p-3 my-2 fw-bold  d-flex align-items-center" style={{ backgroundColor: "#d9d9d9" }}>
                                <div className="col-md-2"></div>
                                <div className="col"></div>
                                <div className="col-md-2"></div>
                                <div className="col-md-2">Grand Total</div>
                                <div className="col-md-1">{total}</div>
                                <div className="col-md-1">
                                    <div className="btn btn-primary" onClick={e => handleOrder()}>Place Order</div>
                                </div>
                            </div>
                            : ''
                    }

                </>
                : <Loading />}
        </div>
    );
}