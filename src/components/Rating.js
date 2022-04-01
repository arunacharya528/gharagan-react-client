import React, { useEffect, useState } from "react";

export const RatingSummary = ({ ratings }) => {

    const [percent5, setPercent5] = useState(0);
    const [percent4, setPercent4] = useState(0);
    const [percent3, setPercent3] = useState(0);
    const [percent2, setPercent2] = useState(0);
    const [percent1, setPercent1] = useState(0);
    const [count, setCount] = useState(0);

    useEffect(() => {
        const rated5 = extractByRate(ratings, 5);
        const rated4 = extractByRate(ratings, 4);
        const rated3 = extractByRate(ratings, 3);
        const rated2 = extractByRate(ratings, 2);
        const rated1 = extractByRate(ratings, 1);
        const ratingCount = ratings.length;

        setPercent5(Math.floor((rated5 / ratingCount) * 100))
        setPercent4(Math.floor((rated4 / ratingCount) * 100))
        setPercent3(Math.floor((rated3 / ratingCount) * 100))
        setPercent2(Math.floor((rated2 / ratingCount) * 100))
        setPercent1(Math.floor((rated1 / ratingCount) * 100))
        setCount(ratingCount);

    }, [])

    const extractByRate = (collection, rate) => {
        return collection.filter((item) => { return item.rate == rate }).length;
    }

    return (
        <div class="rating-detail d-flex flex-column">
            <div class="my-2 h5 d-flex flex-row">
                <RateDisplayByArray ratings={ratings} />
            </div>
            <div className="h6">{count} ratings</div>
            <RateProgressBar percent={percent5} star={5} />
            <RateProgressBar percent={percent4} star={4} />
            <RateProgressBar percent={percent3} star={3} />
            <RateProgressBar percent={percent2} star={2} />
            <RateProgressBar percent={percent1} star={1} />
        </div>
    );
}

export const RateProgressBar = ({ star, percent }) => {
    return (
        <div class="row my-2">
            <div class="col-12 col-sm-12 col-md-2 text-nowrap h6">{star} star</div>
            <div class="col">
                <div class="progress" style={{ height: '1.5rem' }}>
                    <div class="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-2 text-nowrap">{percent}%</div>
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

    return (<div>
        <div class="stars" style={{ "--rating": getRoundedValue(rating) }} ></div>
        ({getRoundedValue(rating)})
    </div>)
}

/**
 * 
 * @param {JSON} param0 array of json data
 * @returns a five stars denoting rating
 */
export const RateDisplayByArray = ({ ratings }) => {

    const getAverageRating = (ratingCollection) => {
        const collection = ratingCollection.map((rating) => {
            return rating.rate;
        })

        var sum = 0;
        for (let i = 0; i < collection.length; i++) {
            sum += collection[i];
        }

        const rating = sum / collection.length;
        return rating;
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