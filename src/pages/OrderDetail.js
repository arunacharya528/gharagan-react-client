import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { getOrderDetail } from "../adapters/orderDetail";
import { deleteRating, postRating } from "../adapters/rating";
import { OrderView } from "../components/Order/OrderView";
import { RateAndComment } from "../components/Product/RateAndComment";
import { RateDisplayByNumber, RateInput } from "../components/Rating";
import { OrderDetailSkeleton } from "../components/Skeleton/OrderSkeleton";
import { UserContext } from "../context/UserContext";
import { getDiscountedPrice, getSubTotal, getSumFromArray } from "../helpers/calculatePrice";

const moment = require('moment')
export const OrderDetail = () => {

    const location = useLocation();
    const [order, setOrder] = useState({ data: null, loading: true });

    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {
        getOrderDetail('', location.pathname.split("/")[3])
            .then(response => setOrder({ data: response.data, loading: false }))
            .catch(error => console.log(error))
    }, [isRefreshed])


    const getSteps = (status) => {

        const getResponse = (place) => {
            if (place <= status) {
                return 'step-primary';
            }
        }
        return (
            <ul class="steps steps-vertical lg:steps-horizontal lg:w-full my-5">
                <li class={"step " + getResponse(1)}>Order placed</li>
                <li class={"step " + getResponse(2)}>Product Collected for delivery</li>
                <li class={"step " + getResponse(3)}>Product being shipped</li>
                <li class={"step " + getResponse(4)}>Product received</li>
            </ul>
        );
    }

    const orderTotal = () => {
        if (!order.loading) {
            return getSumFromArray([
                (order.data.discount === null ? getSubTotal(order.data.order_items) : getDiscountedPrice(getSubTotal(order.data.order_items), order.data.discount.discount_percent)),

                order.data.address.delivery.price,
            ])


        } else {
            return 0;
        }
    }

    const [selectedTab, setSelectedTab] = useState(1);

    const Overview = () => {

        return (
            <>
                <OrderView order={order.data} />
                <div className="grid md:grid-cols-3 p-5 mt-10 rounded-lg bg-slate-400/10">
                    <div className="flex flex-col">
                        <span className="font-semibold my-5">Billing/Shipping Address</span>
                        <div className="text-sm flex flex-col">
                            <span>{order.data.address.address_line1}</span>
                            <span>{order.data.address.address_line2}</span>
                            <span>{order.data.address.city}</span>
                            <span>{order.data.address.telephone}</span>
                            <span>{order.data.address.mobile}</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold my-5">Payment Information</span>

                    </div>

                    <div className="flex flex-col divide-y-2">
                        <div className="flex justify-between px-2 py-5">
                            <span>Subtotal</span>
                            <span className="font-semibold">Rs.{getSubTotal(order.data.order_items)}</span>
                        </div>

                        {
                            order.data.discount !== null ?
                                <div className="flex justify-between px-2 py-5">
                                    <div className="flex flex-row items-center space-x-3">
                                        <span className="">Price after discount</span>
                                        <div class="badge badge-primary">{order.data.discount.name + " " + order.data.discount.discount_percent + "%"}</div>
                                    </div>
                                    <span className="font-semibold">{

                                        "Rs. " + getDiscountedPrice(getSubTotal(order.data.order_items), order.data.discount.discount_percent)

                                    }</span>
                                </div>
                                : ''
                        }

                        <div className="flex justify-between px-2 py-5">
                            <span>Delivery</span>
                            <span className="font-semibold">Rs.{order.data.address.delivery.price}</span>
                        </div>


                        {
                            orderTotal() !== parseFloat(order.data.total) ?
                                <div className="flex justify-between px-2 py-5">
                                    <span className="font-semibold">Calculated Total</span>
                                    <span className="text-error font-bold">{
                                        "Rs. " + orderTotal()
                                    }</span>
                                </div>
                                : ''
                        }

                        <div className="flex justify-between px-2 py-5">
                            <span className="font-semibold">Order Total</span>
                            <span className="text-accent font-bold">{
                                "Rs. " + order.data.total
                            }</span>
                        </div>

                    </div>
                </div>

                {
                    orderTotal() !== parseFloat(order.data.total) ?
                        <div className="text-center leading-10">
                            <span className="font-semibold">Calculated total</span> and <span className="font-semibold">Ordered total</span> are not found to be same. This could be because of change in <span className="font-semibold">discounts</span> or <span className="font-semibold">delivery prices</span>.
                            <br />
                            Due to this reason an  <span className="font-semibold"> invoice bill was sent to your email</span> address while the order was placed.
                            <br />
                            For more information contact us 😃
                        </div>
                        : ''
                }
            </>
        );
    }

    const Reviews = () => {

        var rateableProducts = {};
        order.data.order_items.map((item, index) => {
            rateableProducts[item.product.id] = item.product;
        })
        rateableProducts = Object.values(rateableProducts)

        const handleDeletion = (id) => {
            toast.promise(
                deleteRating(id)
                ,
                {
                    loading: "Deleting review",
                    success: () => {
                        setRefresh(!isRefreshed)
                        return "Deleted review"
                    },
                    error: "Error deleting review"
                }
            )
        }

        return (
            <div className="flex flex-col divide-y">
                {rateableProducts.map((product, index) =>

                    <div className="flex flex-col md:flex-row space-x-5 py-10" key={index}>
                        <div className="flex flex-row md:flex-col">
                            {product.images.filter((item, index) => index < 3).map((image, index) =>
                                <img src={image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url} className="w-1/3 md:w-32 h-auto p-2" key={index} />
                            )}
                        </div>

                        <div className="flex flex-col grow space-y-5">
                            <div className="flex flex-col space-y-1">
                                <Link to={"/product/" + product.id} target="_blank" className="font-semibold">{product.name}</Link>
                                <div className="font-light">{product.summary}</div>
                            </div>

                            {
                                product.ratings.length === 0 ?
                                    order.data.status === 4 ?

                                        <RateAndComment product={product} orderId={order.data.id} onSubmit={() => { setRefresh(!isRefreshed) }} />
                                        :
                                        <div className="text-center py-10">
                                            Your purchased product must be delivered to review. <br />
                                            Visit again after product is delivereed
                                        </div>
                                    :

                                    <div className="flex flex-col space-y-2 grow">
                                        <div className="flex flex-row space-x-3">
                                            <RateDisplayByNumber rating={product.ratings[0].rate} />
                                        </div>
                                        <div>
                                            {product.ratings[0].comment}
                                        </div>
                                        <div className="grow"></div>
                                        <div>
                                            <button className="btn btn-error btn-outline btn-sm" onClick={e => handleDeletion(product.ratings[0].id)}>Delete Review</button>
                                        </div>
                                    </div>
                            }


                        </div>
                    </div>
                )}

            </div>
        );
    }

    const tabs = [
        {
            name: 'Overview',
            index: 1
        },
        {
            name: 'Paymnet',
            index: 2
        },
        {
            name: 'Your Reviews',
            index: 3
        },
    ]

    const getSelectedTab = () => {
        switch (selectedTab) {
            case 1:
                return <Overview />
            case 3:
                return <Reviews />
        }
    }

    return (
        <>
            {order.loading ?
                <OrderDetailSkeleton />
                :
                <div className="p-2 mb-8 flex flex-col">

                    <div className="font-bold text-2xl py-2">Order Detail</div>

                    <div className="flex justify-between">
                        <div className="flex w-full">
                            <span className="text-gray-400">Order number</span>
                            <div className="font-bold ml-1">{order.data.id}</div>
                            &bull;
                            <div className="font-semibold ml-1">{moment(order.data.created_at).format("MMM D YYYY")}</div>
                        </div>

                        <a className="whitespace-nowrap text-primary font-semibold">View invoice</a>
                    </div>
                    <div className="divider"></div>
                    {getSteps(order.data.status)}
                    <div className="font-semibold text-center">Latest action took place in {moment(order.data.updated_at).format("MMMM D YYYY")}</div>
                    <div className="divider"></div>

                    <div className="flex mb-8">
                        <div class="tabs tabs-boxed">
                            {tabs.map((item, index) =>
                                <a class={"tab " + (selectedTab === item.index ? 'tab-active' : '')} onClick={e => setSelectedTab(item.index)} key={index}>{item.name}</a>
                            )}
                        </div>
                    </div>

                    {getSelectedTab()}

                </div>

            }

        </>



    );
}