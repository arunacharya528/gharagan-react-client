import { useLocation } from "react-router-dom";

export const Product = () => {

    var url = useLocation().pathname;
    url = url.split("/")




    return (

        <section class="container">
            <div class="card my-4 p-3">
                <h6>General Info</h6>
                <div class="row">
                    <div class="col-sm-6">
                        Here lies the image
                    </div>
                    <div class="col-sm-6">
                        <div id="price" class="d-flex justify-content-between align-items-center">
                            <div class="d-flex">
                                <div id="actual-price">
                                    Rs. 100
                                </div>
                                <div id="original-price">
                                    <s>Rs. 200</s>
                                </div>
                            </div>
                            <div id="discount">
                                50% OFF
                            </div>
                        </div>
                        <div id="description">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                        </div>
                        <hr/>

                            <div class="row my-2">
                                <div class="col-2">Category</div>
                                <div class="col">
                                    <div class="category">Category name</div>
                                </div>
                            </div>
                            <div class="row my-2">
                                <div class="col-2">Rating</div>
                                <div class="col">
                                    <div class="rating">
                                        <i class="fa fa-star-o highlight"></i>
                                        <i class="fa fa-star-o highlight"></i>
                                        <i class="fa fa-star-o highlight"></i>
                                        <i class="fa fa-star-o highlight"></i>
                                        <i class="fa fa-star-o"></i>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex">
                                <div class="form-group">
                                    <select class="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                    </select>
                                </div>

                                <div class="btn brand-btn mx-3">
                                    <i class="fa fa-cart-arrow-down"></i> Add to cart
                                </div>
                            </div>

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
                <h6>Description</h6>
                <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas
                    sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi
                    tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
                    qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
                </p>
            </div>

            <div class="card my-4 p-3">
                <h6>Rate and Comment</h6>
                <div class="row d-flex align-items-center">
                    <div class="col-sm-6">

                        <div class="rating-detail d-flex flex-column">
                            <div class="row my-2">
                                <div class="col-2">Overall</div>
                                <div class="col">
                                    <div class="h3">4.6</div>
                                </div>
                            </div>
                            <div class="row my-2">
                                <div class="col-1">5</div>
                                <div class="col">
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style={{width:"25%"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row my-2">
                                <div class="col-1">4</div>
                                <div class="col">
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row my-2">
                                <div class="col-1">3</div>
                                <div class="col">
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row my-2">
                                <div class="col-1">2</div>
                                <div class="col">
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="row my-2">
                                <div class="col-1">1</div>
                                <div class="col">
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style={{ width: "25%" }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                </div>
                            </div>
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
        </section>
    );
}