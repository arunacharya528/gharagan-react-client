import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "../helpers/Loading";

import moment from 'moment'
import { getUser } from "../adapters/profile";
import { UserContext } from "../context/UserContext";
import { OrderThumbnailSkeleton } from "../components/Skeleton/OrderSkeleton";

import { TrashIcon } from "../icons"
import toast from "react-hot-toast";
import { cancelOrder } from "../adapters/orderDetail";

export const Order = () => {

    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState({ data: [], loading: true })
    const [isRereshed, setRefresh] = useState(false);

    useEffect(() => {

        getUser('', user.id, 'orders')
            .then(response => setOrders({ data: response.data, loading: false }))
            .catch(error => console.log(error))
    }, [isRereshed]);

    const getSteps = (status) => {

        const getResponse = (place) => {
            if (place <= status) {
                return 'step-primary';
            }
        }
        return (
            <ul class="steps steps-vertical lg:steps-horizontal lg:w-full my-5">
                <li class={"step " + getResponse(1)}>Order placed<br />(Available for cancellation)</li>
                <li class={"step " + getResponse(2)}>Product Collected for delivery</li>
                <li class={"step " + getResponse(3)}>Product being shipped</li>
                <li class={"step " + getResponse(4)}>Product received</li>
            </ul>
        );
    }

    const handleCancellation = (id) => {
        toast.promise(
            cancelOrder('',id),
            {
                loading: "Cancelling order",
                success: () => {
                    setRefresh(!isRereshed)
                    return "Successfully cancelled order"
                },
                error: "Error cancelling order"
            }
        )
    }

    return (

        <>
            <div className="flex flex-col space-y-5">
                {orders.loading ?
                    Array(3).fill({}).map(() =>
                        <OrderThumbnailSkeleton />
                    )

                    :
                    orders.data.map((order, index) =>
                        <div key={index} className="rounded-md shadow-sm hover:shadow-md ease-in-out duration-300 bg-base-200 divide-y divide-slate-500">
                            <div className="flex flex-col md:flex-row items-center py-5 px-7 space-y-5 md:space-y-0">

                                <div className="flex flex-col md:flex-row space-y-5 md:space-x-10 md:space-y-0 font-semibold grow w-full md:w-auto">
                                    <div className="flex flex-col font-semibold">
                                        <span>Order Number</span>
                                        <span className="text-gray-500">{order.id}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span>Date Placed</span>
                                        <span className="text-gray-500">{moment(order.created_at).format("MMM D, YYYY")}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span >Total Amount</span>
                                        <span className="text-gray-500">Rs.{order.total}</span>
                                    </div>
                                </div>


                                <div className="flex flex-col md:flex-row space-y-5 md:space-x-6 md:space-y-0 w-full md:w-auto">
                                    <Link to={"/user/orders/" + order.id} className="btn btn-ghost btn-outline">View Order</Link>


                                    <button className="btn btn-ghost btn-outline">View Invoice</button>

                                    <button className="btn btn-outline btn-error gap-2" disabled={order.status === 1 ? false : true} onClick={e => handleCancellation(order.id)}> <TrashIcon /> Cancel order</button>

                                </div>
                            </div>

                            <div className="py-5 px-7">
                                {getSteps(order.status)}
                                <div className="font-semibold text-center">Latest action took place in {moment(order.updated_at).format("MMMM D YYYY")}</div>
                            </div>
                            {order.status === 1 ? '' :
                                <div className="p-3 text-center">
                                    Order cannot be cancelled in this stage. Contact us for more information.
                                </div>
                            }

                        </div>
                    )


                }
            </div>


        </>

    );
}