import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { postToCart } from "../adapters/cartItems";
import { getproduct } from "../adapters/product";
import { ProductImage } from "../components/ProductImage";
import { RateDisplay, RatingSummary } from "../components/Rating";
import { Loading } from "../helpers/Loading";

export const Product = () => {

    var url = useLocation().pathname;
    url = url.split("/")

    // console.log(url[2])
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState([]);
    var updateProduct = false;
    const cookie = new Cookies()


    useEffect(() => {
        getproduct(url[2])
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
    }, [updateProduct]);

    const handleCartAddition = (e) => {
        e.preventDefault();

        postToCart(cookie.get('userData').access_token, {
            quantity: quantity,
            session_id: cookie.get('userData').session_id,
            product_id: product.id
        })
            .then(response => console.log(response))
            .catch(error => console.log(error))
    }

    return (
        <section class="container" >

            {
                product.length !== 0 ?

                    <>
                        <div class="card my-4 p-3">
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
                                            <RateDisplay rating={4} />
                                        </div>
                                    </div>

                                    {cookie.get('userData') ?

                                        <div class="d-flex">
                                            <form className="d-flex flex-row" onSubmit={handleCartAddition}>
                                                <div class="form-group">
                                                    <input type="number" class="form-control" onChange={e => setQuantity(e.target.value)} max={product.inventory.quantity} min={0} placeholder="Enter quantity" />
                                                </div>

                                                <button class="btn brand-btn mx-3" type="submit">
                                                    <i class="fa fa-cart-arrow-down"></i> Add to cart
                                                </button>
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
                        <div class="card my-4 p-3">
                            <h4>Description</h4>
                            <p>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                                sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                                tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
                                qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                            </p>
                        </div>

                        <div class="card my-4 p-3">
                            <h4>Customer reviews</h4>
                            <div class="row d-flex align-items-center">
                                <div class="col-sm-6">
                                    <RatingSummary />
                                </div>
                                <div class="col-sm-6">
                                    <div>
                                        <div class="form-group">
                                            <label for="">Comment as Username</label>
                                            <textarea class="form-control" name="" id="" rows="3"></textarea>
                                        </div>
                                        <button type="submit" class="btn btn-primary my-2">Comment</button>
                                    </div>
                                </div>

                            </div>


                            <div>
                                <div class="row my-3">
                                    <div class="col-1 d-flex justify-content-center">
                                        <img src="http://via.placeholder.com/75x75" class="rounded-circle" />
                                    </div>
                                    <div class="col d-flex flex-column">
                                        <b>Username</b>
                                        <p>This is my comment</p>
                                    </div>
                                </div>
                                <div class="row my-3">
                                    <div class="col-1 d-flex justify-content-center">
                                        <img src="http://via.placeholder.com/75x75" class="rounded-circle" />
                                    </div>
                                    <div class="col d-flex flex-column">
                                        <b>Username</b>
                                        <p>This is my comment</p>
                                    </div>
                                </div>
                                <div class="row my-3">
                                    <div class="col-1 d-flex justify-content-center">
                                        <img src="http://via.placeholder.com/75x75" class="rounded-circle" />
                                    </div>
                                    <div class="col d-flex flex-column">
                                        <b>Username</b>
                                        <p>This is my comment</p>
                                    </div>
                                </div>
                                <div class="row my-3">
                                    <div class="col-1 d-flex justify-content-center">
                                        <img src="http://via.placeholder.com/75x75" class="rounded-circle" />
                                    </div>
                                    <div class="col d-flex flex-column">
                                        <b>Username</b>
                                        <p>This is my comment</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </>
                    : <Loading />
            }
        </section >

    );
}