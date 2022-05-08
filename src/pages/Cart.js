import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { removeCartItem } from "../adapters/cartItems";

import { createOrder, getShoppingSession } from "../adapters/shoppingSession";
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


    const getImageURl = (productImage) => {
        return productImage.file ? process.env.REACT_APP_FILE_PATH + productImage.file.path : productImage.image_url;
    }

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

    console.log(session)
    return (

        <div>
            {
                session !== null ?

                    <>

                        <div className="summary-grid" style={{ gridTemplateColumns: 'repeat(6,1fr) !important' }}>

                            <>
                                <div className="item header">Image</div>
                                <div className="item header">Quantity</div>
                                <div className="item header">Price</div>
                                <div className="item header">Discount</div>
                                <div className="item header">Calculated Price</div>
                                <div className="item header">Action</div>
                            </>
                            {
                                session.cart_items.map((item, index) =>
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
                                            Rs. {getTotalPrice(item.inventory)}
                                        </div>
                                        <div className="item">
                                            <button>
                                                <CloseIcon />
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )
                            }
                        </div>
                    </>
                    : ''
            }
        </div>
    );
}