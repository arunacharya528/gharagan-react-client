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
import { postWishList, productExistsInWishList, removeFromWishList } from "../../adapters/wishlist";
import { EyeIcon, HeartIcon } from "../../icons";
import { WishListContext } from "../../context/WishListContext";
import { WishListButton } from "../WishListButton";

export const LongProductThumbnail = (props) => {

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
                                <div className="flex space-x-5 items-center">
                                    <div class="flex justify-between items-center w-full">
                                        <div class="flex flex-col">
                                            <div className="text-accent text-lg font-bold">Rs. {getDiscountedPrice(selectedInventory.price, selectedInventory.discount)}</div>
                                            {selectedInventory.discount ? <div className="font-light"><s>Rs. {selectedInventory.price}</s></div> : ''}
                                        </div>
                                        {selectedInventory.discount ? <div className="badge badge-success badge-outline p-3">{selectedInventory.discount.discount_percent}% OFF</div> : ''}
                                    </div>
                                </div>

                                : ''

                        }
                    </div>

                    <div className="">{props.product.summary}</div>
                    <div className="grow flex flex-row flex-wrap content-start">
                        {inventories.map((inventory, index) =>
                            <button type="button" class={"btn btn-sm btn-primary m-2 " + determineInventoryButton(inventory)} key={index} onClick={e => { setSelectedInventory(inventory); onChange({ type: 'CHANGE', value: inventory.id }) }}>{inventory.type}</button>
                        )}
                    </div>

                    <div className="flex flex-col space-y-2">
                        <div className="flex space-x-2">
                            <WishListButton productId={props.product.id} />
                            <button className={"grow btn btn-sm btn-accent " + (!session ? 'btn-disabled' : '')} onClick={handleCartAddition}>
                                {session ? "Add to cart" : "Login to add to cart"}
                            </button>
                        </div>
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

    const [isButtonPanelShown, showButtonPanel] = useState(false);

    return (

        <div class="flex flex-col items-stretch bg-base-200 hover:shadow-md ease-in-out duration-300 rounded-xl w-full" onMouseEnter={e => showButtonPanel(true)} onMouseLeave={e => showButtonPanel(false)}>
            <div className="relative">
                {
                    images.map((image, index) =>
                        <img src={image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url} alt={"Image " + (index + 1) + " of " + props.product.name} key={index} className="h-48 w-full rounded-t-xl object-cover" />
                    )
                }

                {
                    isButtonPanelShown ?
                        <div className="absolute top-0 w-full bg-base-100/40 h-full flex items-center justify-center space-x-3">

                            <div class="tooltip tooltip-top" data-tip="Preview">
                                <button className="btn btn-square btn-ghost btn-active btn-sm text-white" onClick={e => handlePreview()}>
                                    <EyeIcon className="h-5 w-5" />
                                </button>
                            </div>
                            <WishListButton productId={props.product.id} />
                        </div>
                        : ''
                }


            </div>
            <div class="flex flex-col p-5 space-y-3">
                <div className="flex flex-col space-y-1">
                    <Link to={"/filter/?categories=" + props.product.category.id} className="text-gray-500 font-semibold text-xs uppercase tracking-widest hover:text-gray-700">{props.product.category.name}</Link>
                    <Link to={"/product/" + props.product.id} class="text-xl font-semibold">
                        {props.product.name}
                    </Link>
                    <Link to={"/brand/" + props.product.brand.id} className="text-gray-500 font-semibold text-xs uppercase tracking-widest hover:text-gray-700">{props.product.brand.name}</Link>
                </div>

                <RateDisplayByNumber rating={props.product.ratings_avg_rate ? parseFloat(props.product.ratings_avg_rate) : 0} />

            </div>
        </div>
    );
}