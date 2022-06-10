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
import { OrderSteps } from "../components/Order/OrderSteps";

export const Order = () => {

    const { user } = useContext(UserContext);
    const [orders, setOrders] = useState({ data: [], loading: true })
    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {

        getUser('', user.id, 'orders')
            .then(response => setOrders({ data: response.data, loading: false }))
            .catch(error => console.log(error))
    }, [isRefreshed]);

    const handleCancellation = (id) => {
        toast.promise(
            cancelOrder('', id),
            {
                loading: "Cancelling order",
                success: () => {
                    setRefresh(!isRefreshed)
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


                                    <a href={process.env.REACT_APP_WEB_URL + "/view/invoice/" + order.id} target="_blank" className="btn btn-ghost btn-outline">View Invoice</a>

                                    <button className="btn btn-outline btn-error gap-2" disabled={order.status === 1 ? false : true} onClick={e => handleCancellation(order.id)}> <TrashIcon /> Cancel order</button>

                                </div>
                            </div>

                            <div className="py-5 px-7">
                                <OrderSteps status={order.status} />
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