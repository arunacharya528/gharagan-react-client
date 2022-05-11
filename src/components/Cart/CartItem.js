import { removeCartItem } from "../../adapters/cartItems";
import { toast } from 'react-hot-toast'
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
export const CartItem = (props = { item: JSON, className: String }) => {

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

    const { updateSession } = useContext(CartContext)
    const handleCartItemRemoval = () => {

        toast.promise(
            removeCartItem('', props.item.id)
            , {
                loading: "Removing item from cart",
                success: () => {
                    updateSession();
                    return "Item removed from cart"
                },
                error: "Error removing item from cart"
            }
        )
    }

    const getSumTotal = (price, quantity) => {
        const total = price * quantity;
        return Math.round((total + Number.EPSILON) * 100) / 100

    }

    return (
        <div className="flex flex-row space-x-5 p-3 border rounded bg-slate-400/10" {...props}>
            <img src={getImageURl(props.item.product.images[0])} alt={"Image of " + props.item.product.name} className="w-32 rounded-md" />
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <span>{props.item.product.name}</span>
                    <span className="font-semibold">Rs. {getSumTotal(getTotalPrice(props.item.inventory), props.item.quantity)}</span>
                </div>
                <div className="font-light">
                    {props.item.product.category.name}
                </div>
                <div className="font-light">
                    {props.item.inventory.type}
                </div>
                <div className="flex justify-between">
                    <span>Qty {props.item.quantity}</span>
                    <span className="text-accent font-semibold cursor-pointer" onClick={handleCartItemRemoval}>Remove</span>
                </div>
            </div>

        </div>
    );
}