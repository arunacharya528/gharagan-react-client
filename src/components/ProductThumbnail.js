import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RateDisplay, RateDisplayByArray, RateDisplayByNumber } from "./Rating";

export const ProductThumbnail = (props) => {

    const [selectedInventory, setSelectedInventory] = useState(null);
    const images = props.product.images.filter((image, index) => {
        if (index < 1) {
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
            return ''
        } else {
            return 'btn-outline '
        }
    }

    useEffect(() => {
        setSelectedInventory(props.product.inventories[0])
    }, [])

    return (

        <div class="card bg-base-100 border-2 hover:shadow-xl ease-in-out duration-300">
            <figure>


                {
                    images.map((image, index) =>
                        <img src={image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url} alt={"Image " + (index + 1) + " of " + props.product.name} key={index} />
                    )
                }

            </figure>
            <div class="card-body flex flex-col">
                <h2 class="card-title">
                    {props.product.name}
                </h2>

                <RateDisplayByNumber rating={props.product.averageRating} />
                <div className="truncate grow">{props.product.summary}</div>

                <div>
                    {
                        selectedInventory ?
                            <div class="flex justify-between items-center">
                                <div class="flex flex-col">
                                    <div className="text-accent text-lg font-bold">Rs. {getDiscountedPrice(selectedInventory.price, selectedInventory.discount)}</div>
                                    {selectedInventory.discount ? <div className="font-light"><s>Rs. {selectedInventory.price}</s></div> : ''}
                                </div>
                                {selectedInventory.discount ? <div className="badge badge-success badge-outline p-3">{selectedInventory.discount.discount_percent}% OFF</div> : ''}
                            </div>
                            : ''

                    }
                </div>
                <div class="card-actions justify-center">
                    {props.product.inventories.map((inventory, index) =>
                        <button type="button" class={"btn btn-xs btn-primary " + determineInventoryButton(inventory)} key={index} onClick={e => handleInventoryChange(inventory)}>{inventory.type}</button>
                    )}

                    <button className="w-full btn btn-primary btn-sm">
                        Add to cart
                    </button>
                    <Link to={"/product/" + props.product.id} className="w-full btn btn-accent btn-sm">
                        View product
                    </Link>
                </div>
            </div>
        </div>
    );
}