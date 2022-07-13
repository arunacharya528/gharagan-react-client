import { useContext } from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { putAddress } from "../../adapters/profile";
import { UserContext } from "../../context/UserContext";
import { AddressForm } from "./Form";

export const EditAddress = ({ address, refresh }) => {

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [deliveryId, setDeliveryId] = useState('');
    const [telephone, setTelephone] = useState('');
    const [mobile, setMobile] = useState('');
    const { user } = useContext(UserContext);
    useEffect(() => {
        setAddressLine1(address.address_line1);
        setAddressLine2(address.address_line2);
        setDeliveryId(address.delivery.id);
        setTelephone(address.telephone);
        setMobile(address.mobile);
    }, [address]);


    const handleSubmission = () => {
        toast.promise(
            putAddress(user.data.token, address.id, {
                address_line1: addressLine1,
                address_line2: addressLine2,
                delivery_id: deliveryId,
                telephone: telephone,
                mobile: mobile
            }),
            {
                loading: "Updating address",
                success: () => {
                    refresh();
                    return "Address updated"
                },
                error: "Error updating address"
            }
        )
    }

    return (<AddressForm
        address_line1={{ value: addressLine1, setValue: setAddressLine1 }}
        address_line2={{ value: addressLine2, setValue: setAddressLine2 }}
        delivery_id={{ value: deliveryId, setValue: setDeliveryId }}
        telephone={{ value: telephone, setValue: setTelephone }}
        mobile={{ value: mobile, setValue: setMobile }}
        submit={{ value: "Update", click: handleSubmission }}
    />);
}