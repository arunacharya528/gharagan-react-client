import { ProfileImage } from "../Avatar";
import { RatingSummary, RateDisplayByNumber } from "../Rating";
import { ReviewsSkeleton } from "../Skeleton/ProductSkeleton";
const moment = require('moment');

export const Reviews = ({ product }) => {
    return (
        <>
            {product.loading ?
                <ReviewsSkeleton />
                :
                <div className="grid lg:grid-cols-5 gap-20">
                    <div className="lg:col-span-2 flex flex-col">
                        <div className="font-bold text-2xl px-2">Customer Reviews</div>
                        <RatingSummary ratings={product.data.ratings} />

                        <p>
                            You can rate and comment after you receive your order.
                            <br/>
                            Click on <b>top-right avatar</b> &#x3e; order &#x3e; any of your order &#x3e;<b>Your reviews</b>
                        </p>
                    </div>


                    <div className="lg:col-span-3 divide-y-2 space-y-10">
                        {product.data.ratings.map((rating, index) =>
                            <div className="flex flex-col pt-10 space-y-5">

                                <div class="flex flex-row items-center space-x-2" key={index}>
                                    <ProfileImage name={rating.user.first_name} />
                                    <div className="flex flex-col">
                                        <div className="flex flex-row space-x-3">
                                            <span className="font-semibold">{rating.user.first_name} {rating.user.last_name}</span>
                                            <span className="fst-italic">{moment(rating.created_at).fromNow()}</span>

                                        </div>
                                        <div className="d-block">{<RateDisplayByNumber rating={rating.rate} />}</div>
                                    </div>
                                </div>
                                <div>
                                    <p>{rating.comment}</p>
                                </div>
                            </div>

                        )}
                    </div>

                </div>
            }
        </>
    );
}