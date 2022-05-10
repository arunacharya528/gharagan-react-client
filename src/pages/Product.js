import moment from "moment";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
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
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState([]);
    const [quantityInCart, setQuantityInCart] = useState(undefined)
    // const [refresh]
    const [refresh, setRefresh] = useState(false);

    const [selectedTab, setSelectedTab] = useState(1);

    const cookie = new Cookies()

    const [selectedInventory, setSelectedInventory] = useState(null);
    useEffect(() => {
        getproduct(url[2])
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
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
                    {/* {
                        product.images.map((image, index) =>
                            <img src={image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url} alt={"Image " + (index + 1) + " of " + product.name} key={index} className="w-64 rounded-lg" />
                        )
                    } */}

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
                        <a className="font-semibold text-primary">See all {product.ratings.length} reviews</a>
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

                    <div className="grid grid-cols-5 gap-2">

                        {
                            product.inventories.map((inventory, index) =>
                                <button key={index} className={"btn btn-secondary " + determineInventoryButton(inventory)} onClick={e => setSelectedInventory(inventory)}>
                                    {inventory.type}
                                </button>
                            )
                        }
                    </div>

                    <div className="btn btn-block btn-primary">Add to cart</div>

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
            <div className="flex flex-col space-y-8">
                <RatingSummary ratings={product.ratings} />
                {product.ratings.map((rating, index) =>
                    <div className="flex flex-col space-y-2 border-2 p-3 rounded-xl">
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
        );
    }

    const QAs = () => {


        return (

            <div className="flex flex-col space-y-8">
                {product.questions.map((question, index) =>

                    <div className="flex flex-col space-y-2 border-2 rounded-lg p-3">
                        <div className="flex flex-row space-x-3 items-center">
                            <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${question.user.first_name}%20${question.user.last_name}&size=200`} className="rounded-full w-10 h-10" />
                            <span className="font-semibold">{question.user.first_name + " " + question.user.last_name}</span>
                            <div className="">{moment(question.created_at).fromNow()}</div>
                        </div>
                        <div className="">{question.query}</div>
                        <div className="col">


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
                    </div>

                )}
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

    return (
        <section class="" >

            {
                product !== null ?

                    <>

                        <div class="card container mx-auto bg-base-100 border-2 my-5">
                            <div class="card-body">
                                <div class="tabs m-auto grid grid-cols-4 w-full ">
                                    <button class={"tab tab-bordered font-semibold ease-in-out duration-300 " + (selectedTab === 1 ? 'tab-active text-primary' : '')} onClick={e => setSelectedTab(1)} >General Info</button>
                                    <button class={"tab tab-bordered font-semibold ease-in-out duration-300 " + (selectedTab === 2 ? 'tab-active text-primary' : '')} onClick={e => setSelectedTab(2)} >Specifications</button>
                                    <button class={"tab tab-bordered font-semibold ease-in-out duration-300 " + (selectedTab === 3 ? 'tab-active text-primary' : '')} onClick={e => setSelectedTab(3)} >Reviews</button>
                                    <button class={"tab tab-bordered font-semibold ease-in-out duration-300 " + (selectedTab === 4 ? 'tab-active text-primary' : '')} onClick={e => setSelectedTab(4)} >Question Answers</button>
                                </div>

                                <div className="mt-4">
                                    {getSelectedTab()}
                                </div>
                            </div>
                        </div>
                    </>
                    : <Loading />
            }
        </section >

    );
}