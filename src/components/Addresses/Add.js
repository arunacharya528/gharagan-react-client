import { useContext, useState } from "react";
import { postAddress } from "../../adapters/profile";
import { AddressForm } from "./Form";

export const AddAddress = ({ refresh, userId }) => {
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [telephone, setTelephone] = useState('');
    const [mobile, setMobile] = useState('');

    const handleSubmission = (e) => {
        e.preventDefault();
        postAddress('', {
            user_id: userId,
            address_line1: addressLine1,
            address_line2: addressLine2,
            city: city,
            telephone: telephone,
            mobile: mobile
        })
            .then(response => refresh())
            .catch(error => console.log(error))
    }

    return (<AddressForm
        address_line1={{ value: addressLine1, setValue: setAddressLine1 }}
        address_line2={{ value: addressLine2, setValue: setAddressLine2 }}
        city={{ value: city, setValue: setCity }}
        telephone={{ value: telephone, setValue: setTelephone }}
        mobile={{ value: mobile, setValue: setMobile }}
        submit={{ value: "Save", click: handleSubmission }}
    />

    );
}