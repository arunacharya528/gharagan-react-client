import { useEffect, useState } from "react";
import { putAddress } from "../../adapters/profile";
import { AddressForm } from "./Form";

export const EditAddress = ({ address, refresh }) => {

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [telephone, setTelephone] = useState('');
    const [mobile, setMobile] = useState('');

    useEffect(() => {
        setAddressLine1(address.address_line1);
        setAddressLine2(address.address_line2);
        setCity(address.city);
        setTelephone(address.telephone);
        setMobile(address.mobile);
    }, [address]);

    
    const handleSubmission = () => {
        putAddress('', address.id, {
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
        submit={{ value: "Update", click: handleSubmission }}
    />);
}