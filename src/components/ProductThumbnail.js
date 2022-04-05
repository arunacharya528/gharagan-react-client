import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RateDisplay, RateDisplayByNumber } from "./Rating";

export const ProductThumbnail = (props) => {

    const image1 = props.product.images.length > 0 ? props.product.images[0].image : '';
    const image2 = props.product.images.length >= 2 ? props.product.images[1].image : '';

    const averageRating = props.product.averageRating;

    const getDiscountedPrice = (mainPrice, discount) => {
        return discount ? mainPrice - Math.ceil(discount.discount_percent * 0.01 * mainPrice) : mainPrice;
    }
    return (
        <Link to={'/product/' + props.product.id} class={"product-thumbnail  col-12 col-sm-6 col-lg-" + (props.width ? props.width : 3)}>
            <div id="image-container">
                <img src={image1} alt={"First Image of " + props.product.name} />
                <img src={image2} alt={"Second Image of " + props.product.name} />
            </div>
            <div class="d-flex justify-content-between">
                <div id="category">{props.product.category.name}</div>
                <RateDisplayByNumber rating={averageRating} />
            </div>

            <div id="name">{props.product.name}</div>
            <div id="price" class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <div id="actual-price">Rs. {getDiscountedPrice(props.product.price, props.product.discount)}</div>
                    {props.product.discount ? <div id="original-price"><s>Rs. {props.product.price}</s></div> : ''}
                </div>
                {props.product.discount ? <div id="discount">{props.product.discount.discount_percent}% OFF</div> : ''}
            </div>
        </Link>
    );
}