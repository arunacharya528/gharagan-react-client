import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { postToCart } from "../../adapters/cartItems";
import { CartContext } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { getDiscountedPrice } from "../../helpers/calculatePrice";
import { HeartIcon } from "../../icons";
import { WishListButton } from "../WishListButton";

export const InventoryList = ({ product, buttonSize = "-sm" }) => {

    const [selectedInventory, setSelectedInventory] = useState(null);
    const { session, updateSession } = useContext(CartContext)

    useEffect(() => {
        if (!product.loading) {
            for (let i = 0; i < product.inventories.length; i++) {
                if (product.inventories[i].quantity !== 0) {
                    setSelectedInventory(product.inventories[i])
                    break;
                }
            }
        }
    }, [product])

    const { user } = useContext(UserContext);
    const handleCartAddition = () => {
        const data = ({
            product_id: product.id,
            quantity: 1,
            inventory_id: selectedInventory.id
        })
        toast.promise(
            postToCart(user.data.token, data),
            {
                loading: `Adding ${product.name} (${selectedInventory.type}) to cart`,
                success: () => {
                    updateSession();
                    return 'Added product to cart'
                },
                error: 'Error adding product to cart'
            }
        )
    }

    return (
        <>
            {
                product.published ?

                    <>
                        <div className="flex flex-col divide-y divide-gray-500">
                            {
                                product.inventories.map((inventory, index) =>

                                    <div className={"grid gap-2 items-center grid-cols-3 p-3 cursor-pointer " + (selectedInventory !== null && inventory.id === selectedInventory.id ? 'bg-base-300' : '') + (inventory.quantity <= 0 ? ' cursor-not-allowed' : '')} onClick={e => {
                                        if (inventory.quantity > 0) {
                                            setSelectedInventory(inventory)
                                        }
                                    }} key={index}>
                                        <div className="flex-1">{inventory.type}</div>
                                        <div class="flex flex-col grow">
                                            <div className="text-primary text-lg font-bold">Rs. {getDiscountedPrice(inventory.price, inventory.discount && inventory.discount.active === 1 ? inventory.discount.discount_percent : 0)}</div>
                                            {inventory.discount && inventory.discount.active === 1 ? <div className="font-light"><s>Rs. {inventory.price}</s></div> : ''}
                                        </div>
                                        <div className="col-span-3 md:col-span-1 space-y-2 flex flex-col">
                                            {inventory.discount && inventory.discount.active === 1 ? <div className="badge badge-success badge-outline p-3">{inventory.discount.discount_percent}% OFF</div> : ''}
                                            {inventory.quantity <= 0 ? <div className="badge badge-error badge-outline p-3">Out of stock</div> : ''}
                                        </div>
                                    </div>
                                )

                            }

                        </div>

                        <div className="text-sm">Select among various types and add to cart</div>

                        <div className="flex flex-col space-y-2">
                            <div className="flex space-x-2">
                                <WishListButton productId={product.id} size={buttonSize} />
                                {
                                    selectedInventory === null ?
                                        <button className={`btn btn${buttonSize} btn-accent btn-disabled grow`}>
                                            Select from list to add to cart
                                        </button>
                                        :
                                        <button className={`grow btn btn${buttonSize} btn-primary ` + (user.loading ? 'btn-disabled' : '')} onClick={handleCartAddition}>
                                            {!user.loading ? "Add to cart" : "Login to add to cart"}
                                        </button>
                                }

                            </div>
                        </div>
                    </>
                    :

                    <div className="flex justify-center flex-col items-center text-center w-full col-span-4 space-y-10">
                        <span className="text-5xl">(･_･)</span>
                        <span>
                            Sorry!<br />
                            This product is currently unavailable.<br />
                            Contact us for more info
                        </span>
                    </div>
            }
        </>
    );
}