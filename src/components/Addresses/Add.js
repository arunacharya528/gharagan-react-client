import { useContext, useEffect, useState } from "react";
import { getDeliveries } from "../../adapters/delivery";
import { postAddress } from "../../adapters/profile";
import { AddressForm } from "./Form";

export const AddAddress = ({ refresh, userId }) => {
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [deliveryId, setDeliveryId] = useState('');
    const [telephone, setTelephone] = useState('');
    const [mobile, setMobile] = useState('');

    const handleSubmission = (e) => {
        e.preventDefault();
        postAddress('', {
            user_id: userId,
            address_line1: addressLine1,
            address_line2: addressLine2,
            delivery_id: deliveryId,
            telephone: telephone,
            mobile: mobile
        })
            .then(response => refresh({ response: response.data }))
            .catch(error => console.log(error))
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