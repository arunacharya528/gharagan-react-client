import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { getDiscountedPrice } from "../../helpers/calculatePrice";
import { HeartIcon } from "../../icons";
import { RateDisplayByArray } from "../Rating";

export const GeneralInfo = ({ product, setSelectedTab }) => {

    const [selectedInventory, setSelectedInventory] = useState(null);

    useEffect(() => {
        if (!product.loading) {
            setSelectedInventory(product.data.inventories[0])
        }
    }, [product])

    return (
        <>
            {
                product.loading ?
                    "Loading"

                    :
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="overflow-hidden">
                            <ImageGallery thumbnailPosition="left" items={product.data.images.map((image) => {
                                const imageURL = image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url;
                                return {
                                    original: imageURL,
                                    thumbnail: imageURL
                                }
                            })} />
                        </div>
                        <div className="flex flex-col space-y-5">

                            <div className="text-3xl font-bold">{product.data.name}

                            </div>
                            <div className="flex space-x-5">
                                <RateDisplayByArray ratings={product.data.ratings} />
                                <a className="font-semibold text-primary cursor-pointer" onClick={e => setSelectedTab(3)}>See all {product.data.ratings.length} reviews</a>
                            </div>

                            {
                                selectedInventory ?
                                    <div class="flex justify-between items-center">
                                        <div class="flex flex-col">
                                            <div className="text-accent text-lg font-bold">Rs. {getDiscountedPrice(selectedInventory.price, selectedInventory.discount.discount_percent)}</div>
                                            {selectedInventory.discount ? <div className="font-light"><s>Rs. {selectedInventory.price}</s></div> : ''}
                                        </div>
                                        {selectedInventory.discount ? <div className="badge badge-success badge-outline p-3">{selectedInventory.discount.discount_percent}% OFF</div> : ''}
                                    </div>
                                    : ''

                            }

                            <div className="flex flex-row flex-wrap">

                                {
                                    product.data.inventories.map((inventory, index) =>
                                        <button key={index} className={"btn btn-primary btn-sm m-1 no-animation " + (selectedInventory !== null && selectedInventory.id === inventory.id ? '' : 'btn-outline')} onClick={e => setSelectedInventory(inventory)}>
                                            {inventory.type}
                                        </button>
                                    )
                                }
                            </div>

                            <div className="flex space-x-2">
                                <div className="btn btn-primary grow">Add to cart</div>
                                <button className="btn btn-ghost">
                                    <HeartIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div>
                                <div className="my-5 font-semibold">Summary</div>
                                <div>
                                    {product.data.summary}
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>


    );
}