import { putToCart, removeCartItem } from "../../adapters/cartItems";
import { toast } from 'react-hot-toast'
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { getSumTotal, getTotalPrice } from "../../helpers/calculatePrice";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
export const CartItem = (props = { item: JSON, className: String }) => {

    const [quantity, setQuantity] = useState(0);
    useEffect(() => {
        setQuantity(props.item.quantity)
    }, [])
    const getImageURl = (productImage) => {
        return productImage.file ? process.env.REACT_APP_FILE_PATH + productImage.file.path : productImage.image_url;
    }

    const { session, updateSession } = useContext(CartContext)
    const { user } = useContext(UserContext);
    const handleCartItemRemoval = () => {
        toast.promise(
            removeCartItem(user.data.token, props.item.id)
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

    const handleCartUpdate = () => {
        putToCart(user.data.token, {
            'session_id': session.id,
            'product_id': props.item.product.id,
            'quantity': quantity
        }, props.item.id)
            .then(response => updateSession())
            .catch(error => console.log(error))
    }

    const QuantityInput = () => {


        return (
            <div className="flex flex-col space-y-2">
                <div class="btn-group ">
                    <button class="btn btn-sm btn-primary" onClick={e => {
                        if (quantity > 1) setQuantity(quantity - 1)
                    }}>-</button>
                    <span className="px-3 leading-loose">{quantity}</span>
                    <button class="btn btn-sm btn-primary" onClick={e => {
                        setQuantity(quantity + 1)
                    }}>+</button>
                </div>
                {
                    props.item.quantity !== quantity ?
                        <>
                            <div className="btn btn-primary btn-outline btn-sm" onClick={handleCartUpdate}>Save</div>
                            <div className="btn btn-secondary btn-outline btn-sm" onClick={e => setQuantity(props.item.quantity)}>Cancel</div>
                        </>
                        : ''
                }
            </div>

        );
    }
    return (
        <div className="flex flex-row space-x-5 p-3 " {...props}>
            <div className="h-32 w-32 flex justify-center items-center">
                {props.item.product.images.filter((item, index) => index < 1).map((image, index) =>
                    <img src={getImageURl(image)} alt={"Image of " + props.item.product.name} className="rounded-md" key={index} />

                )}
            </div>
            <div className="flex flex-col w-full">
                <div className="flex justify-between">
                    <Link to={"/product/" + props.item.product.id}>{props.item.product.name}</Link>
                    <span className="font-semibold">Rs. {getSumTotal(getTotalPrice(props.item.inventory), quantity)}</span>
                </div>
                <div className="font-light">
                    {props.item.product.category.name}
                </div>
                <div className="font-light">
                    <span>{props.item.inventory.type}</span>
                </div>
                <div className="flex justify-between">
                    <QuantityInput />
                    <span className="text-primary font-semibold cursor-pointer self-end" onClick={handleCartItemRemoval}>Remove</span>
                </div>
            </div>

        </div>
    );
}