import { Link } from "react-router-dom";

export const ProductThumbnail = (props) => {

    const discountPercent = props.product.discount.discount_percent;
    const actualPrice = props.product.price - Math.ceil(props.product.discount.discount_percent * 0.01 * props.product.price)
    const initialPrice = props.product.price;
    return (
        <Link to={'/product/' + props.product.id} class="product-thumbnail  col-12 col-sm-6 col-lg-3">
            <div id="image-container">
                <img src="https://via.placeholder.com/400x200" />
            </div>
            <div class="d-flex justify-content-between">
                <div id="category">{props.product.category.name}</div>
                <div id="rating">
                    <i class="fa fa-star-o highlight"></i>
                    <i class="fa fa-star-o highlight"></i>
                    <i class="fa fa-star-o highlight"></i>
                    <i class="fa fa-star-o "></i>
                    <i class="fa fa-star-o "></i>
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