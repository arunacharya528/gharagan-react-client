import { useContext } from "react";
import toast from "react-hot-toast";
import { deleteRating } from "../adapters/rating";
import { UserContext } from "../context/UserContext";
import { RateDisplayByNumber } from "./Rating";
const moment = require('moment')

export const ReviewDetail = ({ rating = { id: Number, rate: Number, comment: String }, onSubmit }) => {

    const { user } = useContext(UserContext);
    const handleDeletion = (id) => {
        toast.promise(
            deleteRating(user.data.token, id)
            ,
            {
                loading: "Deleting review",
                success: () => {
                    onSubmit()
                    return "Deleted review"
                },
                error: "Error deleting review"
            }
        )
    }

    return (
        <div className="flex flex-col space-y-2 grow">
            <div className="flex flex-row space-x-3">
                <RateDisplayByNumber rating={rating.rate} />
            </div>
            <div>
                {rating.comment}
            </div>
            <div className="font-light">{moment(rating.created_at).calendar()}</div>
            <div className="grow"></div>
            <div>
                <button className="btn btn-error btn-outline btn-sm" onClick={e => handleDeletion(rating.id)}>Delete Review</button>
            </div>
        </div>
    );
}