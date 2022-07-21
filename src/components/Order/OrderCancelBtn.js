import { useContext } from "react";
import toast from "react-hot-toast";
import { cancelOrder } from "../../adapters/orderDetail";
import { UserContext } from "../../context/UserContext";
import { TrashIcon } from "../../icons";

export const OrderCancelBtn = ({ order, onSubmit }) => {
    const { user } = useContext(UserContext)
    const handleCancellation = (id) => {
        toast.promise(
            cancelOrder(user.data.token, id),
            {
                loading: "Cancelling order",
                success: () => {
                    onSubmit()
                    return "Successfully cancelled order"
                },
                error: "Error cancelling order"
            }
        )
    }

    return (
        <button className="btn btn-outline btn-error gap-2" disabled={order.status === 1 ? false : true} onClick={e => handleCancellation(order.id)}> <TrashIcon /> Cancel order</button>
    );
}