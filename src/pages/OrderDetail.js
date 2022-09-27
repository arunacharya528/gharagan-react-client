import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cancelOrder, getInvoice, getOrderDetail } from "../adapters/orderDetail";
import { deleteRating, postRating } from "../adapters/rating";
import { InvoiceLink } from "../components/Order/InvoiceLink";
import { OrderCancelBtn } from "../components/Order/OrderCancelBtn";
import { OrderSteps } from "../components/Order/OrderSteps";
import { OrderView } from "../components/Order/OrderView";
import { RateAndComment } from "../components/Product/RateAndComment";
import { RateDisplayByNumber, RateInput } from "../components/Rating";
import { ReviewDetail } from "../components/ReviewDetail";
import { OrderDetailSkeleton } from "../components/Skeleton/OrderSkeleton";
import { UserContext } from "../context/UserContext";
import { getDiscountedPrice, getSubTotal, getSumFromArray } from "../helpers/calculatePrice";
import { TrashIcon } from "../icons";

const moment = require('moment')
export const OrderDetail = () => {

    const location = useLocation();
    const [order, setOrder] = useState({ data: null, loading: true });

    const [isRefreshed, setRefresh] = useState(false);
    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    useEffect(() => {
        getOrderDetail(user.data.token, location.pathname.split("/")[3])
            .then(response => setOrder({ data: response.data, loading: false }))
            .catch(error => console.log(error))
    }, [isRefreshed])

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
                        <span className="text-sm">There are no payment options currently available. Only <b>cash on delivery</b> is supported</span>
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
                            <span className="text-primary font-bold">{
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
                                    <ReviewDetail rating={{
                                        comment: product.ratings[0].comment,
                                        rate: product.ratings[0].rate,
                                        id: product.ratings[0].id,
                                    }} onSubmit={() => setRefresh(!isRefreshed)} />

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
            case 2:
                return <span className="text-sm">There are no payment options currently available. Only <b>cash on delivery</b> is supported</span>
            case 3:
                return <Reviews />
        }
    }

    return (
      <>
        {order.loading ? (
          <OrderDetailSkeleton />
        ) : (
          <div className="p-2 mb-8 flex flex-col">
            <div className="font-bold text-2xl py-2">Order Detail</div>

            <div className="flex flex-col md:flex-row justify-between">
              <div className="flex grow ">
                <span className="text-gray-400">Order number</span>
                <div className="font-bold ml-1">{order.data.id}</div>
                &bull;
                <div className="font-semibold ml-1">
                  {moment(order.data.created_at).format("MMM D YYYY")}
                </div>
              </div>

              <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0 md:items-center ">
                <InvoiceLink id={order.data.id} />
                <OrderCancelBtn
                  onSubmit={() => {
                    setRefresh(!isRefreshed);
                    navigate(-1);
                  }}
                  order={order.data}
                />
              </div>
            </div>
            <div className="divider"></div>
            <OrderSteps status={order.data.status} />
            <div className="font-semibold text-center">
              Latest action took place in{" "}
              {moment(order.data.updated_at).format("MMMM D YYYY")}
            </div>
            <div className="divider"></div>

            <div className="flex mb-8">
              <div class="tabs tabs-boxed">
                {tabs.map((item, index) => (
                  <a
                    class={
                      "tab " + (selectedTab === item.index ? "tab-active" : "")
                    }
                    onClick={(e) => setSelectedTab(item.index)}
                    key={index}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {getSelectedTab()}
          </div>
        )}
      </>
    );
}