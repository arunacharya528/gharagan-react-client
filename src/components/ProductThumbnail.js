import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ProductThumbnail = (props) => {

    const discountPercent = props.product.discount.discount_percent;
    const actualPrice = props.product.price - Math.ceil(props.product.discount.discount_percent * 0.01 * props.product.price)
    const initialPrice = props.product.price;

    const image1 = props.product.images.length > 0 ? props.product.images[0].image : '';
    const image2 = props.product.images.length >= 2 ? props.product.images[1].image : '';

    const averageRating = Math.floor(props.product.averageRating);
    return (
        <Link to={'/product/' + props.product.id} class="product-thumbnail  col-12 col-sm-6 col-lg-3">
            <div id="image-container">
                <img src={image1} alt={"First Image of " + props.product.name} />
                <img src={image2} alt={"Second Image of " + props.product.name} />
            </div>
            <div class="d-flex justify-content-between">
                <div id="category">{props.product.category.name}</div>
                <div id="rating">

                    {[...Array(averageRating)].map((e, i) =>
                        <i class="fa fa-star-o highlight"></i>
                    )}
                    {[...Array(5-averageRating)].map((e, i) =>
                        <i class="fa fa-star-o"></i>
                    )}
                </div>
            </div>

            <div id="name">{props.product.name}</div>
            <div id="price" class="d-flex justify-content-between align-items-center">
                <div class="d-flex">
                    <div id="actual-price">Rs. {actualPrice}</div>
                    <div id="original-price"><s>Rs. {initialPrice}</s></div>
                </div>
                <div id="discount">{discountPercent}% OFF</div>
            </div>
        </Link>
    );
}