import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RateDisplay, RateDisplayByNumber } from "./Rating";

export const ProductThumbnail = (props) => {

    const [selectedInventory, setSelectedInventory] = useState(null);
    const images = props.product.images.filter((image, index) => {
        if (index < 2) {
            return image;
        }
    })
    const averageRating = props.product.averageRating;

    const getDiscountedPrice = (mainPrice, discount) => {
        return discount ? mainPrice - Math.ceil(discount.discount_percent * 0.01 * mainPrice) : mainPrice;
    }

    const handleInventoryChange = (inventory) => {
        setSelectedInventory(inventory)
    }

    const determineInventoryButton = (inventory) => {
        if (selectedInventory && selectedInventory.id === inventory.id) {
            return 'brand-btn'
        } else {
            return 'brand-btn-outline'
        }
    }

    useEffect(() => {
        setSelectedInventory(props.product.inventories[0])
    }, [])

    return (
        <div to={'/product/' + props.product.id} class={"col-12 col-sm-6 col-lg-" + (props.width ? props.width : 3)}>

            <div className="product-thumbnail">
                <div className="visible-container">
                    <div id="image-container">
                        {
                            images.map((image, index) =>
                                <img src={image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url} alt={"Image " + (index + 1) + " of " + props.product.name} key={index} />
                            )
                        }
                    </div>
                    <div class="d-flex justify-content-between">
                        <div id="category">{props.product.category.name}</div>
                        <RateDisplayByNumber rating={averageRating} />
                    </div>

                    <div id="name">{props.product.name}</div>


                    {
                        selectedInventory ?
                            <div id="price" class="d-flex justify-content-between align-items-center my-2">
                                <div class="d-flex">
                                    <div id="actual-price">Rs. {getDiscountedPrice(selectedInventory.price, selectedInventory.discount)}</div>
                                    {props.product.discount ? <div id="original-price"><s>Rs. {selectedInventory.price}</s></div> : ''}
                                </div>
                                {selectedInventory.discount ? <div id="discount">{selectedInventory.discount.discount_percent}% OFF</div> : ''}
                            </div>
                            : ''

                    }
                </div>


                <div className="button-panel">

                    <div className="d-flex justify-content-center flex-wrap type">
                        {props.product.inventories.map((inventory, index) =>
                            <button type="button" class={"btn btn-sm m-1 " + determineInventoryButton(inventory)} key={index} onClick={e => handleInventoryChange(inventory)}>{inventory.type}</button>
                        )}
                    </div>

                    <button className="btn brand-btn rounded w-100 py-2 mt-2 cart">Add to cart</button>
                    <div className="text-center mt-2 view">
                        <Link to={'/product/' + props.product.id} className="brand-link">View product</Link>
                    </div>
                </div>
            </div>

        </div>
    );
}