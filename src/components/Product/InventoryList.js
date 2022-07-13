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
            setSelectedInventory(product.inventories[0])
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
            <div className="flex flex-col divide-y divide-gray-500">
                {
                    product.inventories.map((inventory, index) =>

                        <div className={"grid gap-2 items-center grid-cols-12 p-3 cursor-pointer " + (selectedInventory !== null && inventory.id === selectedInventory.id ? 'bg-base-300' : '')} onClick={e => { setSelectedInventory(inventory) }} key={index}>
                            <div className="col-span-1">
                                {selectedInventory !== null && inventory.id === selectedInventory.id ? "✔" : ''}
                            </div>
                            <div className="col-span-4 flex-1">{inventory.type}</div>
                            <div class="col-span-4 flex flex-col grow">
                                <div className="text-accent text-lg font-bold">Rs. {getDiscountedPrice(inventory.price, inventory.discount.active === 1 ? inventory.discount.discount_percent : 0)}</div>
                                {inventory.discount && inventory.discount.active === 1 ? <div className="font-light"><s>Rs. {inventory.price}</s></div> : ''}
                            </div>
                            <div className="col-span-3 ">
                                {inventory.discount && inventory.discount.active === 1 ? <div className="badge badge-success badge-outline p-3">{inventory.discount.discount_percent}% OFF</div> : ''}
                            </div>
                        </div>
                    )

                }

            </div>

            <div className="text-sm">Select among various types and add to cart</div>

            <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                    <WishListButton productId={product.id} size={buttonSize} />
                    <button className={`grow btn btn${buttonSize} btn-accent ` + (!session ? 'btn-disabled' : '')} onClick={handleCartAddition}>
                        {session ? "Add to cart" : "Login to add to cart"}
                    </button>
                </div>
            </div>
        </>
    );
}