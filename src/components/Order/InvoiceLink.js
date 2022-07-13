import { useContext } from "react";
import { getInvoice } from "../../adapters/orderDetail";
import { UserContext } from "../../context/UserContext";

export const InvoiceLink = ({ id }) => {

    const { user } = useContext(UserContext);
    const viewInvoice = () => {
        getInvoice(user.data.token, id)
            .then((response) => response.blob()).then((blob) => {
                var _url = window.URL.createObjectURL(blob);
                window.open(_url, "_blank").focus();
            })
            .catch((err) => { console.log(err); });
    }

    return (
        <span className="btn btn-ghost btn-outline" onClick={e => viewInvoice()}>View Invoice</span>
    );
}