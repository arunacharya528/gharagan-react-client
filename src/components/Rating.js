export const RatingSummary = () => {

    return (
        <div class="rating-detail d-flex flex-column">
            <div class="my-2 h5 d-flex flex-row">
                <RateDisplay rating={4} />
                &emsp;
                <span className="">
                    4.6 out of 5
                </span>
            </div>
            <div className="h6">12345 ratings</div>
            <RateProgressBar percent={45} star={5} />
            <RateProgressBar percent={20} star={4} />
            <RateProgressBar percent={20} star={3} />
            <RateProgressBar percent={10} star={2} />
            <RateProgressBar percent={5} star={1} />

            <div class="row my-2 d-flex align-items-center">
                <div class="col-3">Rate Yourself</div>
                <div class="col">
                    <div class="rating-input">
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const RateProgressBar = ({ star, percent }) => {
    return (
        <div class="row my-2">
            <div class="col-1 text-end text-nowrap h6">{star} star</div>
            <div class="col">
                <div class="progress" style={{ height: '1.5rem' }}>
                    <div class="progress-bar" role="progressbar" style={{ width: `${percent}%` }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>
            <div class="col-1 text-start text-nowrap">{percent}%</div>
        </div>
    );
}

export const RateDisplay = ({ rating }) => {
    const averageRating = Math.floor(rating);
    return (
        <div class="rating">
            {[...Array(averageRating)].map((e, i) =>
                <i class="fa fa-star-o highlight"></i>
            )}
            {[...Array(5 - averageRating)].map((e, i) =>
                <i class="fa fa-star-o"></i>
            )}
        </div>
    );
}