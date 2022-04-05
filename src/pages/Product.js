import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { getByProductAndSession, postToCart } from "../adapters/cartItems";
import { getproduct } from "../adapters/product";
import { RateAndComment } from "../components/Product/RateAndComment";
import { ProductImage } from "../components/ProductImage";
import { RateDisplayByArray, RateDisplayByNumber, RateInput, RatingSummary } from "../components/Rating";
import { Loading } from "../helpers/Loading";
import { AuthRedirect } from "./Authenticate";

export const Product = () => {

    var url = useLocation().pathname;
    url = url.split("/")

    // console.log(url[2])
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [quantityInCart, setQuantityInCart] = useState(undefined)
    // const [refresh]
    const [refresh, setRefresh] = useState(false);

    const cookie = new Cookies()


    useEffect(() => {
        getproduct(url[2])
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
    }, []);

    useEffect(() => {
        getByProductAndSession(cookie.get('access_token'), url[2], cookie.get('session_id'))
            .then(response => {
                setQuantityInCart(response.data.quantity)
            })
            .catch(error => console.log(error))
    }, [refresh])



    const handleCartAddition = (e) => {
        e.preventDefault();

        postToCart(cookie.get('access_token'), {
            quantity: quantity,
            session_id: cookie.get('session_id'),
            product_id: product.id
        })
            .then(response => { setRefresh(!refresh) })
            .catch(error => console.log(error))
    }


    const getDiscountedPrice = (mainPrice, discount) => {
        return discount ? mainPrice - Math.ceil(discount.discount_percent * 0.01 * mainPrice) : mainPrice;
    }

    const getCategoryName = (category) => {
        const relatedIds = category.parent.child_categories.map((category) => {
            return category.id;
        })

        return (
            <>
                <Link to={"/filter?categories=" + relatedIds.join("%2C")}>{category.parent.name}</Link> - <Link to={"/filter?categories=" + category.id}>{category.name}</Link>
            </>
        );
    }


    return (
        <section class="container" >

            {
                product.length !== 0 ?

                    <>
                        <div class="card shadow rounded my-4 p-3">
                            <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="pills-general-tab" data-bs-toggle="pill" data-bs-target="#pills-general" type="button" role="tab">General Info</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-specs-tab" data-bs-toggle="pill" data-bs-target="#pills-specs" type="button" role="tab">Specifications</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-reviews-tab" data-bs-toggle="pill" data-bs-target="#pills-reviews" type="button" role="tab">Reviews</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="pills-qa-tab" data-bs-toggle="pill" data-bs-target="#pills-qa" type="button" role="tab">Questions and Answers</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="pills-tabContent">
                                <div class="tab-pane fade show active" id="pills-general" role="tabpanel">
                                    <div class="row">
                                        <div class="col-lg-6">
                                            <ProductImage images={product.images} />
                                        </div>
                                        <div class="col-lg-6">
                                            <div id="price" class="d-flex justify-content-between align-items-center">
                                                <div class="d-flex">
                                                    <div id="actual-price">
                                                        Rs. {getDiscountedPrice(product.price, product.discount)}
                                                    </div>
                                                    <div id="original-price">
                                                        {
                                                            product.discount ?
                                                                <s>Rs. {product.price}</s>
                                                                : ''
                                                        }
                                                    </div>
                                                </div>
                                                {
                                                    product.discount ?
                                                        <div id="discount">
                                                            {product.discount.discount_percent}% OFF
                                                        </div>
                                                        : ''
                                                }

                                            </div>
                                            <div id="description">
                                                {product.summary}
                                            </div>
                                            <hr />

                                            <div class="row my-2">
                                                <div class="col-2">Category</div>
                                                <div class="col">
                                                    <div class="category">{getCategoryName(product.category)}</div>
                                                </div>
                                            </div>
                                            <div class="row my-2">
                                                <div class="col-2">Brand</div>
                                                <div class="col">
                                                    <div class="category">{product.brand.name}</div>
                                                </div>
                                            </div>
                                            <div class="row my-2">
                                                <div class="col-2">Rating</div>
                                                <div class="col">
                                                    <RateDisplayByArray ratings={product.ratings} />
                                                </div>
                                            </div>

                                            <div class="row my-2 mt-5">
                                                <div class="col">
                                                    {product.inventory.quantity === 0 ?
                                                        <span class="badge bg-danger">Product unavailable</span>
                                                        :
                                                        <span class="badge bg-success">Product available</span>
                                                    }
                                                </div>
                                            </div>

                                            {cookie.get('userData') ?
                                                <form className="d-flex" onSubmit={handleCartAddition}>
                                                    <div class="form-group w-50">
                                                        <input type="number" class="form-control" onChange={e => setQuantity(e.target.value)} max={product.inventory.quantity} min={0} placeholder="Enter quantity" />
                                                    </div>
                                                    <button class="btn brand-btn mx-3" type="submit">
                                                        <i class="fa fa-cart-arrow-down"></i> Add to cart
                                                    </button>
                                                    {quantityInCart ?
                                                        <div className="small d-block"><b>Quantity in cart</b>: {quantityInCart}</div>
                                                        : ''}
                                                </form>
                                                : <AuthRedirect />}


                                            <div class="row my-5">
                                                <div class="col-2">Share</div>
                                                <div class="col d-flex">
                                                    <div href="#" class="brand-badge facebook">
                                                        <i class="fa fa-facebook"></i> Facebook
                                                    </div>
                                                    <div href="#" class="brand-badge twitter">
                                                        <i class="fa fa-twitter" aria-hidden="true"></i> Twitter
                                                    </div>
                                                    <div href="#" class="brand-badge instagram">
                                                        <i class="fa fa-instagram" aria-hidden="true"></i> Instagram
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="pills-specs" role="tabpanel">
                                    <h4>Description</h4>
                                    <p>
                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                        sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                                        tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
                                        qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                                    </p>
                                </div>
                                <div class="tab-pane fade" id="pills-reviews" role="tabpanel">
                                    <h4>Customer reviews</h4>
                                    <div class="row d-flex align-items-center">
                                        <div class="col-md-6">
                                            <RatingSummary ratings={product.ratings} />
                                        </div>
                                        <div class="col-md-6">
                                            {cookie.get('userData') ?
                                                <RateAndComment />
                                                :
                                                <AuthRedirect/>
                                            }
                                        </div>

                                    </div>
                                    <div>
                                        {product.ratings.map((rating, index) =>
                                            <div class="row my-3" key={index}>
                                                <div class="col-2 col-sm-2 col-md-1 d-flex justify-content-center">
                                                    <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${rating.user.first_name}%20${rating.user.last_name}&size=200`} class="rounded-circle" style={{ width: "50px", height: '50px' }} />
                                                </div>
                                                <div class="col d-flex flex-column">
                                                    <div className="d-block">
                                                        <span className="fw-bold">{rating.user.first_name} {rating.user.last_name}</span>
                                                        &emsp;
                                                        <span className="fst-italic">{moment(rating.created_at).fromNow()}</span>
                                                    </div>
                                                    <div className="d-block">{<RateDisplayByNumber rating={rating.rate} />}</div>
                                                    <p>{rating.comment}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="tab-pane fade" id="pills-qa" role="tabpanel">
                                    <h4 className="p-3">Questions and Answers</h4>
                                    {product.questions.map((question, index) =>

                                        <div className="row py-3">
                                            <div className="col-2 col-sm-2 col-md-1 text-center">
                                                <div className="h5">{index + 1}</div>
                                            </div>
                                            <div className="col">
                                                <div className="d-flex flex-column" key={index}>
                                                    <div className="d-block d-flex">
                                                        <span className="fw-bold">{question.user.first_name + " " + question.user.last_name}</span>&emsp;
                                                        <div className="fst-italic">{moment(question.created_at).fromNow()}</div>
                                                    </div>
                                                    <div className="d-block">{question.query}</div>
                                                </div>

                                                {question.answers.map((answer, index) =>
                                                    <div className="mx-4 py-3">

                                                        <div className="d-flex flex-column" key={index}>
                                                            <div className="d-block d-flex">
                                                                <div className="d-block fw-bold">By Seller</div>&emsp;
                                                                <div className="fst-italic">{moment(answer.created_at).fromNow()}</div>
                                                            </div>
                                                            <div className="d-block">{answer.query}</div>
                                                        </div>

                                                    </div>

                                                )}

                                            </div>
                                        </div>

                                    )}
                                </div>
                            </div>

                        </div>
                    </>
                    : <Loading />
            }
        </section >

    );
}