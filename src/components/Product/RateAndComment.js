import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { postRating } from "../../adapters/rating";
import { UserContext } from "../../context/UserContext";
import { RateInput } from "../Rating";

export const RateAndComment = ({ product, orderId, onSubmit }) => {

    const [rate, setRate] = useState(0);
    const [comment, setComment] = useState('');
    const { user } = useContext(UserContext);

    const handleRateChange = (rate) => {
        setRate(rate);
    }

    const handleSubmission = () => {
        toast.promise(
            postRating({
                rate: rate,
                comment: comment,
                user_id: user.id,
                order_id: orderId,
                product_id: product.id
            })
            , {
                loading: "Posting review",
                success: () => {
                    onSubmit()
                    return "Posted review"
                },
                error: "Error posting review"
            }
        )
    }
    return (
        <div className="flex flex-col space-y-2">
            <div className="flex flex-row space-x-3">
                <span className="font-semibold">{rate}</span>
                <RateInput handleChange={handleRateChange} />

            </div>
            <textarea class="textarea textarea-primary w-full" rows={6} placeholder="Your comment" onChange={e => setComment(e.target.value)} value={comment}></textarea>
            <div>
                <button className="btn btn-primary" onClick={handleSubmission}>Comment</button>
            </div>
        </div>
    );
}