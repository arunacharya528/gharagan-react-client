import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { getDiscountByName } from "../adapters/discount";
import { checkout, getUser } from "../adapters/profile";
import { AddAddress } from "../components/Addresses/Add";
import { CartItem } from "../components/Cart/CartItem";
import { CartContext } from "../context/CartContext";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
import { getDiscountedPrice, getSubTotal, getSumFromArray } from "../helpers/calculatePrice";
import { Cart } from "./Cart";

export const Checkout = () => {

    //=======================
    //
    // Context data
    //
    //=======================
    const { user } = useContext(UserContext)
    const { session, updateSession } = useContext(CartContext)
    const { setModalData, openModal, closeModal } = useContext(ModalContext);

    const navigate = useNavigate();

    //=======================
    //
    // page states for data storage
    //
    //=======================

    // for address
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState({ address: null, delivery_price: 0 });
    const [isAddressRefreshed, refreshAddress] = useState(false);
    const [addressValidation, setAddressValidation] = useState({ isValid: true, message: '' })

    // for discount
    const [discountCode, setDiscountCode] = useState('')
    const [discountResponse, setDiscountResponse] = useState(null);



    //=======================
    //
    // react hooks
    //
    //=======================

    // to retrieve all available address 
    useEffect(() => {
        getUser('', user.id, 'addresses')
            .then(response => setAddresses(response.data))
            .catch(error => console.log(error))
    }, [isAddressRefreshed])

    //=======================
    //
    // methods for form control
    //
    //=======================
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

    const handleDiscountCodeApplication = () => {
        getDiscountByName(discountCode)
            .then(response => setDiscountResponse(response))
            .catch(error => setDiscountResponse(error.response))
    }

    const validate = () => {
        var validState = true;
        if (selectedAddress.address === null) {
            validState = false;
            setAddressValidation({ isValid: false, message: "Select one address" })
        } else {
            setAddressValidation({ isValid: true, message: '' })
        }
        return validState;
    }

    const handleOrderPlacement = () => {
        if (validate()) {
            toast.promise(
                checkout('', user.id, {
                    address_id: selectedAddress.address,
                    discount_id: discountResponse === null ? null : discountResponse.data.id
                })
                , {
                    loading: "Placing your order",
                    success: (response) => {
                        navigate(`/user/orders/${response.data.id}`);
                        updateSession()
                        return "Order successfully placed"
                    },
                    error: "Error placing your order"
                }
            )
        }
    }


    const getDiscountResponse = () => {

        return (
            <>
                {
                    discountResponse !== null && discountResponse.status === 404
                        ?
                        <div class="alert alert-error shadow-lg">
                            <div>
                                <span>No discount offering found with given code</span>
                            </div>
                        </div>
                        : ''
                }

                {
                    discountResponse !== null && discountResponse.status === 200 && discountResponse.data.active === 0
                        ?
                        <div class="alert alert-error shadow-lg">
                            <div>
                                <span>The discount code is currently deactivated</span>
                            </div>
                        </div>
                        : ''
                }
            </>
        );
    }

    const getPriceAfterDiscount = () => {
        if (discountResponse === null || (discountResponse.status === 200 && discountResponse.data.active === 0)) {
            return getSubTotal(session.cart_items);
        }
        else if (discountResponse !== null && discountResponse.status === 200) {
            return getDiscountedPrice(getSubTotal(session.cart_items), discountResponse.data.discount_percent);
        }
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

                            <span className="text-right font-semibold">Delivery area: {address.delivery.region}</span>
                            <span className="text-right font-semibold">Delivery charge: Rs.{address.delivery.price}</span>
                        </div>

                    )}

                </div>

                <button className="btn btn-primary" onClick={handleNewAddressAddition}>Add new address</button>
                <div className="font-light">Visit address page <Link to={"/user/addresses"} className="text-primary underline underline-offset-2">here</Link> to <span className="font-normal">update/delete</span> address </div>

                {
                    addressValidation.isValid === false ?
                        <div class="alert alert-error shadow-lg">
                            <div>
                                {addressValidation.message}
                            </div>
                        </div> : ''
                }

            </div>
            <div className="flex flex-col">

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
                            <input type="text" placeholder="Enter your discount code" class="input w-full input-bordered input-primary" onChange={e => setDiscountCode(e.target.value)} value={discountCode} />
                            <button className="btn btn-primary btn-outine" onClick={handleDiscountCodeApplication}>Apply</button>
                        </div>
                        {getDiscountResponse()}

                        <div className="flex justify-between">
                            <span className="font-semibold">Subtotal</span>
                            <span className="font-bold">{
                                session !== null ?
                                    "Rs. " + getSubTotal(session.cart_items)
                                    : ''
                            }</span>
                        </div>

                        {
                            discountResponse !== null && discountResponse.status === 200 ?
                                <div className="flex justify-between">
                                    <div className="flex flex-row items-center space-x-3">
                                        <span className="font-semibold">Price after discount</span>
                                        <div class="badge badge-primary">{discountResponse.data.name + " " + discountResponse.data.discount_percent + "%"}</div>
                                    </div>
                                    <span className="font-bold">{

                                        "Rs. " + getPriceAfterDiscount()

                                    }</span>
                                </div> : ''
                        }
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
                                    "Rs. " + getSumFromArray([
                                        selectedAddress.delivery_price,
                                        getPriceAfterDiscount()
                                    ])
                                    : ''
                            }
                        </span>
                    </div>

                </div>
                <div className="btn btn-primary mt-4" onClick={handleOrderPlacement}>Place Order</div>




            </div>

        </div>
    );
}