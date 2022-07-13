import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getDeliveries } from "../../adapters/delivery";
import { postAddress } from "../../adapters/profile";
import { UserContext } from "../../context/UserContext";
import { AddressForm } from "./Form";

export const AddAddress = ({ refresh, userId }) => {
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [deliveryId, setDeliveryId] = useState('');
    const [telephone, setTelephone] = useState('');
    const [mobile, setMobile] = useState('');

    const { user } = useContext(UserContext);
    const handleSubmission = (e) => {
        e.preventDefault();
        toast.promise(
            postAddress(user.data.token, {
                user_id: userId,
                address_line1: addressLine1,
                address_line2: addressLine2,
                delivery_id: deliveryId,
                telephone: telephone,
                mobile: mobile
            }),
            {
                loading: "Adding new address",
                success: (response) => {
                    refresh({ response: response.data })
                    return "New address added"
                },
                error: "Error adding address"
            }
        )
    }

    return (<AddressForm
        address_line1={{ value: addressLine1, setValue: setAddressLine1 }}
        address_line2={{ value: addressLine2, setValue: setAddressLine2 }}
        delivery_id={{ value: deliveryId, setValue: setDeliveryId }}
        telephone={{ value: telephone, setValue: setTelephone }}
        mobile={{ value: mobile, setValue: setMobile }}
        submit={{ value: "Save", click: handleSubmission }}
    />

    );
}