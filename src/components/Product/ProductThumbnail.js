import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ModalContext } from "../../context/ModalContext";
import { RateDisplay, RateDisplayByArray, RateDisplayByNumber } from "../Rating";
import ImageGallery from 'react-image-gallery';
import { UserContext } from "../../context/UserContext";
import { CartContext } from "../../context/CartContext";
import { postToCart } from "../../adapters/cartItems";
import toast from 'react-hot-toast'
import { success } from "daisyui/src/colors";

export const ProductThumbnail = (props) => {

    const images = props.product.images.filter((image, index) => {
        if (index < 1) {
            return image;
        }
    })

    const getDiscountedPrice = (mainPrice, discount) => {
        return discount ? mainPrice - Math.ceil(discount.discount_percent * 0.01 * mainPrice) : mainPrice;
    }


    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const Preview = ({ id, images, inventories, onChange }) => {

        const [selectedInventory, setSelectedInventory] = useState(null);

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


        const { session, updateSession } = useContext(CartContext)

        const handleCartAddition = () => {

            const data = ({ session_id: session.id, product_id: props.product.id, quantity: 1, inventory_id: selectedInventory.id })
            toast.promise(
                postToCart('', data),
                {
                    loading: `Adding ${props.product.name} (${selectedInventory.type}) to cart`,
                    success: () => {
                        updateSession();
                        return 'Added product to cart'
                    },
                    error: 'Error adding product to cart'
                }
            )
        }


        return (
            <div className="grid md:grid-cols-2 gap-5">
                <div className="overflow-hidden">
                    <ImageGallery thumbnailPosition="left" className="max-w-sm" items={images.map((image) => {
                        const imageURL = image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url;
                        return {
                            original: imageURL,
                            thumbnail: imageURL
                        }
                    })} />
                </div>
                <div className="flex flex-col space-y-5">
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
                    <div className="grow flex flex-row flex-wrap content-start">
                        {inventories.map((inventory, index) =>
                            <button type="button" class={"btn btn-sm btn-primary m-2 " + determineInventoryButton(inventory)} key={index} onClick={e => { setSelectedInventory(inventory); onChange({ type: 'CHANGE', value: inventory.id }) }}>{inventory.type}</button>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <button className={"w-full btn btn-sm btn-accent " + (!session ? 'btn-disabled' : '')} onClick={handleCartAddition}>
                            {session ? "Add to cart" : "Login to add to cart"}
                        </button>
                        <Link to={"/product/" + id} className="w-full btn btn-sm btn-primary" onClick={e => onChange({ type: 'EXIT' })}>
                            View
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handlePreview = () => {

        const getChangeInModal = (data) => {
            switch (data.type) {
                case 'CHANGE':
                    //data.value gives inventory id
                    break;
                case 'EXIT':
                    closeModal();
                    break;
            }
        }
        setModalData({
            title: props.product.name,
            size: " max-w-5xl ",
            body: <Preview id={props.product.id} images={props.product.images} inventories={props.product.inventories} onChange={getChangeInModal} />
        })
        openModal();
    }

    return (

        <div class="card bg-base-200 hover:shadow-xl ease-in-out duration-300">
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

                <div class="card-actions justify-center">
                    <button className="w-full btn btn-accent btn-sm" onClick={e => handlePreview()}>Preview</button>
                    <Link to={"/product/" + props.product.id} className="w-full btn btn-primary btn-sm">
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
}