import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { getUser } from "../adapters/profile";
import { ReviewDetail } from "../components/ReviewDetail";
import { UserContext } from "../context/UserContext";

export const Review = () => {


    const [reviews, setReviews] = useState([]);
    const { user } = useContext(UserContext)
    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {
        getUser(user.data.token, 'ratings')
            .then(reponse => setReviews(reponse.data))
            .catch(error => console.log(error))
    }, [isRefreshed])

    return (
        <div className="flex flex-col divide-y ">
            {reviews.map((review, index) =>
                <div className="flex flex-col space-y-5 py-10">
                    <div className="flex flex-col space-y-1">
                        <Link to={"/product/" + review.product.id} className="font-bold">{review.product.name}</Link>
                        <div className="font-light">{review.product.summary}</div>
                    </div>


                    <ReviewDetail onSubmit={() => setRefresh(!isRefreshed)} rating={review} />
                </div>
            )}
        </div>
    );
    // return (<div>This is a review page</div>);
}