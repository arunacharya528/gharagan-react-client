import { useState } from "react";
import { AdvertisementForm } from "./Form";

export const AddAddress = () => {
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [telephone, setTelephone] = useState('');
    const [mobile, setMobile] = useState('');

    const handleSubmission = (e) => {
        e.preventDefault();

    }

    return (<AdvertisementForm
        address_line1={{ value: addressLine1, setValue: setAddressLine1 }}
        address_line2={{ value: addressLine2, setValue: setAddressLine2 }}
        city={{ value: city, setValue: setCity }}
        telephone={{ value: telephone, setValue: setTelephone }}
        mobile={{ value: mobile, setValue: setMobile }}
        submit={{ value: "Save", click: handleSubmission }}
    />

    );
}