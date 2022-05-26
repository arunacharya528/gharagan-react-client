import React, { useEffect, useState } from "react";

export const RatingSummary = ({ ratings }) => {

    const [percent, setPercent] = useState({
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
    })

    useEffect(() => {
        setPercent({
            1: extractByRate(ratings, 1),
            2: extractByRate(ratings, 2),
            3: extractByRate(ratings, 3),
            4: extractByRate(ratings, 4),
            5: extractByRate(ratings, 5),
        })

    }, [])

    const extractByRate = (collection, rate) => {
        const rateValue = collection.filter((item) => { return item.rate == rate }).length;
        const value = Math.floor((rateValue / ratings.length) * 100)
        return isNaN(value) ? 0 : value;
    }

    return (
        <div class="flex flex-col space-y-7">
            <div class="my-2 flex space-x-3 px-2 font-bold">
                <RateDisplayByArray ratings={ratings} />
                <div className="font-semibold text-primary">Based on {ratings.length} reviews</div>
            </div>
            <div>
                <RateProgressBar percent={percent[5]} star={5} />
                <RateProgressBar percent={percent[4]} star={4} />
                <RateProgressBar percent={percent[3]} star={3} />
                <RateProgressBar percent={percent[2]} star={2} />
                <RateProgressBar percent={percent[1]} star={1} />
            </div>

        </div>
    );
}

export const RateProgressBar = ({ star, percent }) => {
    return (
        <div className="flex mb-4 items-center space-x-5">
            <div className="flex flex-row items-center space-x-1">
                <span className="px-2">{star}</span>
                <div class="rating rating-sm">
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
                </div>
            </div>

            <progress class="progress progress-primary h-4" value={percent} max="100"></progress>
            <span className="w-16 text-center">{percent}%</span>
        </div>
    );
}


/**
 * 
 * @param {Int} param0 rateing number. can be double
 * @returns a five stars denoting rating
 */
export const RateDisplayByNumber = ({ rating }) => {

    const getRoundedValue = (rating) => {
        return Math.round((rating + Number.EPSILON) * 10) / 10;
    }

    const getRoundedStarValue = (rating) => {
        return Math.round(rating * 2)
    }

    const allStars = Array(10).fill({}).map((key, index) => {

        const mask = index % 2 === 0 ? 1 : 2
        // const selected = index + 1 == getRoundedStarValue(rating) ? true : false
        var selected = false;
        if (index + 1 == getRoundedStarValue(rating)) {
            selected = true
        } else if (getRoundedStarValue(rating) === 0) {
            selected = false;
        } else {
            selected = false;   
        }



        return { mask, selected }
    })
    return (
        <div className="flex flex-row items-center space-x-3">
            <span className="">
                {getRoundedValue(rating)}
            </span>
            <div class="rating rating-sm rating-half">
                {
                    allStars.map((star, index) =>
                        <input type="radio" class={"bg-orange-400 mask mask-star-2 mask-half-" + star.mask} defaultChecked={star.selected} disabled />
                    )
                }
            </div>

        </div>

    )
}

/**
 * 
 * @param {JSON} param0 array of json data
 * @returns a five stars denoting rating
 */
export const RateDisplayByArray = ({ ratings }) => {

    const getAverageRating = (ratingCollection) => {
        var sum = 0;
        ratingCollection.map((rating) => {
            sum += rating.rate;
        })

        const rating = sum / ratings.length;
        return isNaN(rating) ? 0 : rating;
    }

    return (
        <RateDisplayByNumber rating={getAverageRating(ratings)} />
    );
}


export const RateInput = ({ handleChange }) => {

    const [rate, setRate] = useState(0);

    handleChange(rate);
    return (
        <div className="h4 d-block">
            <i class={"fa fa-star" + (rate >= 1 ? '' : '-o')} onClick={e => setRate(1)}></i>
            <i class={"fa fa-star" + (rate >= 2 ? '' : '-o')} onClick={e => setRate(2)}></i>
            <i class={"fa fa-star" + (rate >= 3 ? '' : '-o')} onClick={e => setRate(3)}></i>
            <i class={"fa fa-star" + (rate >= 4 ? '' : '-o')} onClick={e => setRate(4)}></i>
            <i class={"fa fa-star" + (rate >= 5 ? '' : '-o')} onClick={e => setRate(5)}></i>
            {' '}
            ({rate})
        </div>
    );
}