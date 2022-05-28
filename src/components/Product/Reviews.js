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

                        <div class="collapse">
                            <input type="checkbox" />
                            <div class="collapse-title p-4">
                                <button className="btn btn-ghost btn-outline btn-block">
                                    Write a review

                                </button>
                            </div>
                            <div class="collapse-content flex flex-col space-y-4">
                                <textarea class="textarea textarea-primary mt-1" rows={10} placeholder="Enter your review comment"></textarea>
                                <button className="btn btn-block btn-primary">Post Review</button>
                            </div>
                        </div>

                    </div>


                    <div className="lg:col-span-3 divide-y-2 space-y-10">
                        {product.data.ratings.map((rating, index) =>
                            <div className="flex flex-col pt-10 space-y-5">

                                <div class="flex flex-row items-center space-x-2" key={index}>
                                    <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${rating.user.first_name}%20${rating.user.last_name}&size=200`} className="rounded-full w-10 h-10" />

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