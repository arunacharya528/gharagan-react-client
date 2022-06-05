import React from "react";
import { Link } from "react-router-dom";

export const OrderView = ({ order }) => {

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


    return (

        <div className="flex flex-col space-y-5">
            {
                order.order_items.map((item, index) =>
                    <div key={index} className="flex space-x-5">

                        <img src={getImageURl(item.product.images[0])} alt={"Image of " + item.product.name} className="w-32 rounded-md" />

                        <div className="w-full flex flex-col">
                            <Link to={"/product/" + item.product.id} className="font-semibold">{item.product.name}</Link>
                            <div className="font-light grow">{item.product.summary}</div>

                            <span className="font-light">{item.inventory.type}</span>
                            <div className="flex justify-between ">

                                <span>
                                    Quantity
                                    <span className="font-semibold"> {item.quantity}</span>
                                </span>

                                <span>
                                    <span className="font-semibold">Rs.{getTotalPrice(item.quantity, item.inventory)}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}