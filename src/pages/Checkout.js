import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../adapters/profile";
import { AddAddress } from "../components/Addresses/Add";
import { CartItem } from "../components/Cart/CartItem";
import { CartContext } from "../context/CartContext";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
import { getSubTotal, getSumFromArray } from "../helpers/calculatePrice";
import { Cart } from "./Cart";

export const Checkout = () => {


    const { user } = useContext(UserContext)
    const { session } = useContext(CartContext)

    const [addresses, setAddresses] = useState([]);

    const [selectedAddress, setSelectedAddress] = useState(
        {
            address: '',
            delivery_price: 0
        }
    );

    const { setModalData, openModal, closeModal } = useContext(ModalContext);

    const [isAddressRefreshed, refreshAddress] = useState(false);
    useEffect(() => {
        getUser('', user.id, 'addresses')
            .then(response => setAddresses(response.data))
            .catch(error => console.log(error))
    }, [isAddressRefreshed])


    const handleNewAddressAddition = () => {
        const handleRefresh = (data) => {
            refreshAddress(!isAddressRefreshed);
            setSelectedAddress(data.response.id);
            closeModal();
        }
        setModalData(
            {
                title: "Add new address",
                body: <AddAddress refresh={handleRefresh} userId={user.id} />
            });
        openModal();

    }

    return (
        <div className="grid lg:grid-cols-2 items-start gap-5 p-2">
            <div className="flex flex-col space-y-5">

                <div className="px-5">
                    <span className="font-semibold">Email: </span>
                    {user.email}
                </div>

                <div className="grid grid-cols-2 gap-5">
                    {addresses.map((address, index) =>

                        <div className={"flex flex-col grow rounded-xl p-3 cursor-pointer bg-base-200 " + (selectedAddress !== null && selectedAddress.address === address.id ? "outline outline-primary" : '')} onClick={e => setSelectedAddress({ address: address.id, delivery_price: address.delivery.price })} key={index}>
                            <span>{address.address_line1}</span>
                            <span>{address.address_line2}</span>
                            <span>{address.telephone}</span>
                            <span>{address.mobile}</span>

                            <span className="text-right font-semibold">Delivery type: {address.delivery.region}</span>
                            <span className="text-right font-semibold">Delivery charge: Rs.{address.delivery.price}</span>
                        </div>

                    )}

                </div>

                <button className="btn btn-primary" onClick={handleNewAddressAddition}>Add new address</button>
                <div className="font-light">Visit address page <Link to={"/user/addresses"} className="text-primary underline underline-offset-2">here</Link> to <span className="font-normal">update/delete</span> address </div>

            </div>
            <div className="flex flex-col divide-y-2 bg-base-200 shadow-md rounded-xl">
                {
                    session !== null ?

                        <div className="w-full flex flex-col divide-y-2">
                            {
                                session.cart_items.map((item, index) =>
                                    <CartItem item={item} key={index} />
                                )
                            }
                        </div>
                        : ''
                }

                <div className="flex flex-col space-y-8 p-5">
                    <div className="flex flex-row space-x-5">
                        <input type="text" placeholder="Enter your discount code" class="input w-full input-bordered input-primary" />
                        <button className="btn btn-primary btn-outine">Apply</button>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Subtotal</span>
                        <span className="font-bold">{
                            session !== null ?
                                "Rs. " + getSubTotal(session.cart_items)
                                : ''
                        }</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">Delivery price</span>
                        <span className="font-bold">Rs. {selectedAddress.delivery_price}</span>
                    </div>

                </div>

                <div className="flex justify-between p-5">
                    <span className="font-semibold">Grand Total</span>
                    <span className="font-bold">
                        {
                            session !== null ?
                                "Rs. " + getSumFromArray([getSubTotal(session.cart_items), selectedAddress.delivery_price])
                                : ''
                        }
                    </span>
                </div>

            </div>

        </div>
    );
}