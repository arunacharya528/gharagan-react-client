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



    return (
        <section class="container" >

            {
                product.length !== 0 ?

                    <>
                        <div class="card shadow-sm my-4 p-3">
                            <h4>General Info</h4>
                            <div class="row">
                                <div class="col-sm-6">
                                    <ProductImage images={product.images} />
                                </div>
                                <div class="col-sm-6">
                                    <div id="price" class="d-flex justify-content-between align-items-center">
                                        <div class="d-flex">
                                            <div id="actual-price">
                                                {product.price - Math.ceil(product.discount.discount_percent * 0.01 * product.price)}
                                            </div>
                                            <div id="original-price">
                                                <s>{product.price}</s>
                                            </div>
                                        </div>
                                        <div id="discount">
                                            {product.discount.discount_percent}% OFF
                                        </div>
                                    </div>
                                    <div id="description">
                                        {product.description}
                                    </div>
                                    <hr />

                                    <div class="row my-2">
                                        <div class="col-2">Category</div>
                                        <div class="col">
                                            <div class="category">{product.category.name}</div>
                                        </div>
                                    </div>
                                    <div class="row my-2">
                                        <div class="col-2">Rating</div>
                                        <div class="col">
                                            <RateDisplayByArray ratings={product.ratings} />
                                        </div>
                                    </div>

                                    <div class="row my-2 mt-5">
                                        <div class="col-2">Quantity</div>
                                        <div class="col h4">
                                            {product.inventory.quantity}
                                        </div>
                                    </div>

                                    {cookie.get('userData') ?

                                        <div class="">
                                            <form className="" onSubmit={handleCartAddition}>
                                                <div className="row">

                                                    <div className="col">
                                                        <div class="form-group ">
                                                            <input type="number" class="form-control" onChange={e => setQuantity(e.target.value)} max={product.inventory.quantity} min={0} placeholder="Enter quantity" />
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <button class="btn brand-btn mx-3" type="submit">
                                                            <i class="fa fa-cart-arrow-down"></i> Add to cart
                                                        </button>
                                                    </div>
                                                    <div className="col">

                                                        {quantityInCart ?
                                                            <div className="small d-block"><b>Quantity in cart</b>: {quantityInCart}</div>
                                                            : ''}
                                                    </div>

                                                    <small>Adding to cart would replace same product if there are any.</small>
                                                </div>
                                            </form>
                                        </div>
                                        : <Link to={"/login"} className="btn btn-primary" >Login First</Link>}


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
                        <div class="card shadow-sm my-4 p-3">
                            <h4>Description</h4>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                                tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
                                qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                            </p>
                        </div>

                        <div class="card shadow-sm my-4 p-3">
                            <h4>Customer reviews</h4>
                            <div class="row d-flex align-items-center">
                                <div class="col-md-6">
                                    <RatingSummary ratings={product.ratings} />
                                </div>
                                <div class="col-md-6">
                                    <RateAndComment />
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

                        <div className="card shadow-sm my-4">
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
                    </>
                    : <Loading />
            }
        </section >

    );
}