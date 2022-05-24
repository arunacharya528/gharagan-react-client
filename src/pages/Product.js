import moment from "moment";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { getByProductAndSession, postToCart } from "../adapters/cartItems";
import { getproduct, getProducts } from "../adapters/product";
import { RateAndComment } from "../components/Product/RateAndComment";
import { ProductContainer } from "../components/ProductContainer";
import { ProductImage } from "../components/ProductImage";
import { RateDisplayByArray, RateDisplayByNumber, RateInput, RatingSummary } from "../components/Rating";
import { Loading } from "../helpers/Loading";
import { HeartIcon } from "../icons";
import { AuthRedirect } from "./Authenticate";

export const Product = () => {

    var url = useLocation().pathname;
    url = url.split("/")

    // console.log(url[2])
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState([]);
    const [quantityInCart, setQuantityInCart] = useState(undefined)
    // const [refresh]
    const [refresh, setRefresh] = useState(false);

    const [selectedTab, setSelectedTab] = useState(1);

    const cookie = new Cookies()

    const [selectedInventory, setSelectedInventory] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    useEffect(() => {
        getproduct(url[2])
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))

        getProducts("mode=related&product_id=" + url[2])
            .then((response) => {
                setRelatedProducts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    // useEffect(() => {
    //     getByProductAndSession(cookie.get('access_token'), url[2], cookie.get('session_id'))
    //         .then(response => {
    //             setQuantityInCart(response.data.quantity)
    //         })
    //         .catch(error => console.log(error))
    // }, [refresh])



    const handleCartAddition = (e) => {
        e.preventDefault();

        // postToCart(cookie.get('access_token'), {
        //     quantity: quantity,
        //     session_id: cookie.get('session_id'),
        //     product_id: product.id
        // })
        //     .then(response => { setRefresh(!refresh) })
        //     .catch(error => console.log(error))
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

    const determineInventoryButton = (inventory) => {
        if (selectedInventory && selectedInventory.id === inventory.id) {
            return ''
        } else {
            return 'btn-outline '
        }
    }

    useEffect(() => {
        if (product !== null) {
            setSelectedInventory(product.inventories[0])
        }
    }, [product])



    const GeneralInfo = () => {
        return (
            <div className="grid md:grid-cols-2 gap-5">
                <div className="overflow-hidden">
                    <ImageGallery thumbnailPosition="left" items={product.images.map((image) => {
                        const imageURL = image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url;
                        return {
                            original: imageURL,
                            thumbnail: imageURL
                        }
                    })} />
                </div>
                <div className="flex flex-col space-y-5">
                    <div className="text-3xl font-bold">{product.name}

                    </div>
                    <div className="flex space-x-5">
                        <RateDisplayByArray ratings={product.ratings} />
                        <a className="font-semibold text-primary cursor-pointer" onClick={e => setSelectedTab(3)}>See all {product.ratings.length} reviews</a>
                    </div>

                    {
                        selectedInventory ?
                            <div class="flex justify-between items-center">
                                <div class="flex flex-col">
                                    <div className="text-accent text-lg font-bold">Rs. {getDiscountedPrice(selectedInventory.price, selectedInventory.discount)}</div>
                                    {selectedInventory.discount ? <div className="font-light"><s>Rs. {selectedInventory.price}</s></div> : ''}
                                </div>
                                {selectedInventory.discount ? <div className="badge badge-success badge-outline p-3">{selectedInventory.discount.discount_percent}% OFF</div> : ''}
                            </div>
                            : ''

                    }

                    <div className="flex flex-row flex-wrap">

                        {
                            product.inventories.map((inventory, index) =>
                                <button key={index} className={"btn btn-primary btn-sm m-1 no-animation " + determineInventoryButton(inventory)} onClick={e => setSelectedInventory(inventory)}>
                                    {inventory.type}
                                </button>
                            )
                        }
                    </div>

                    <div className="flex space-x-2">
                        <div className="btn btn-primary grow">Add to cart</div>
                        <button className="btn btn-ghost">
                            <HeartIcon className="w-5 h-5" />
                        </button>
                    </div>

                    <div>
                        <div className="my-5 font-semibold">Summary</div>
                        <div>
                            {product.summary}
                        </div>
                    </div>


                </div>
            </div>

        );
    }

    const Specification = () => {

        return (<div>
            {product.description}
        </div>)
    }

    const Reviews = () => {
        return (
            <div className="grid lg:grid-cols-5 gap-20">
                <div className="lg:col-span-2 flex flex-col">
                    <div className="font-bold text-2xl px-2">Customer Reviews</div>
                    <RatingSummary ratings={product.ratings} />

                    <div class="collapse">
                        <input type="checkbox" />
                        <div class="collapse-title p-4">
                            <button className="btn btn-ghost btn-outline btn-block">
                                Write a review

                            </button>
                        </div>
                        <div class="collapse-content flex flex-col space-y-4">
                            <textarea class="textarea textarea-primary mt-1" rows={10} placeholder="Enter your review comment"></textarea>
                            <button className="btn btn-block btn-primary">Post Review</button>
                        </div>
                    </div>

                </div>


                <div className="lg:col-span-3 divide-y-2 space-y-10">
                    {product.ratings.map((rating, index) =>
                        <div className="flex flex-col pt-10 space-y-5">

                            <div class="flex flex-row items-center space-x-2" key={index}>
                                <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${rating.user.first_name}%20${rating.user.last_name}&size=200`} className="rounded-full w-10 h-10" />

                                <div className="flex flex-col">
                                    <div className="flex flex-row space-x-3">
                                        <span className="font-semibold">{rating.user.first_name} {rating.user.last_name}</span>
                                        <span className="fst-italic">{moment(rating.created_at).fromNow()}</span>

                                    </div>
                                    <div className="d-block">{<RateDisplayByNumber rating={rating.rate} />}</div>
                                </div>
                            </div>
                            <div>
                                <div class="col d-flex flex-column">
                                    <div className="d-block">

                                    </div>

                                    <p>{rating.comment}</p>
                                </div>
                            </div>
                        </div>

                    )}
                </div>

            </div>
        );
    }

    const QAs = () => {


        return (
            <div className="grid lg:grid-cols-5 gap-10">
                <div className="lg:col-span-2 flex flex-col space-y-5">
                    <div className="font-bold text-2xl px-2">Questions and Answers</div>
                    <textarea class="textarea textarea-primary" rows={10} placeholder="Write your question. Admin would answer shortly."></textarea>
                    <button className="btn btn-block btn-primary">Post question</button>
                </div>
                <div className="lg:col-span-3 flex flex-col divide-y-2 space-y-5">
                    {product.questions.map((question, index) =>

                        <div className="flex flex-col pt-5 space-y-5">
                            <div className="flex flex-row space-x-3 items-center">
                                <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${question.user.first_name}%20${question.user.last_name}&size=200`} className="rounded-full w-10 h-10" />
                                <span className="font-semibold">{question.user.first_name + " " + question.user.last_name}</span>
                                <div className="">{moment(question.created_at).fromNow()}</div>
                            </div>
                            <div className="">{question.query}</div>

                            {question.answers.map((answer, index) =>
                                <div className="mx-4 py-3" key={index}>

                                    <div className="flex flex-col">
                                        <div className="flex flex-row space-x-3">
                                            <div className="font-semibold">By Seller</div>&emsp;
                                            <div className="">{moment(answer.created_at).fromNow()}</div>
                                        </div>
                                        <div className="">{answer.query}</div>
                                    </div>

                                </div>

                            )}

                        </div>

                    )}
                </div>
            </div>
        )
    }
    const getSelectedTab = () => {
        switch (selectedTab) {
            case 1: return <GeneralInfo />
            case 2: return <Specification />
            case 3: return <Reviews />
            case 4: return <QAs />
        }
    }

    const buttons = [
        {
            name: "General Info",
            value: 1
        },
        {
            name: "Specifications",
            value: 2
        },
        {
            name: "Reviews",
            value: 3
        },
        {
            name: "Question Answers",
            value: 4
        }
    ];

    return (
        <section class="" >

            {
                product !== null ?

                    <>

                        <div class="card  md:container mx-3 md:mx-auto bg-base-200 shadow-md">
                            <div class="card-body px-3 py-5">
                                <ul class="menu bg-base-100 flex flex-row items-stretch justify-between bg-transparent">
                                    {
                                        buttons.map((button, index) =>
                                            <li className={"grow border-b-4 ease-in-out duration-300 " + (selectedTab === button.value ? ' border-primary' : '')} onClick={e => setSelectedTab(button.value)}>
                                                <a className="block text-center h-full font-semibold">{button.name}</a>
                                            </li>
                                        )
                                    }
                                </ul>

                                <div className="p-5">
                                    {getSelectedTab()}
                                </div>
                            </div>
                        </div>

                        <ProductContainer product={relatedProducts} title="Related Products" />

                    </>
                    : <Loading />
            }
        </section >

    );
}