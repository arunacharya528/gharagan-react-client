import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { Link, useLocation } from "react-router-dom";
import Cookies from "universal-cookie";
import { getByProductAndSession, postToCart } from "../adapters/cartItems";
import { getproduct, getProducts } from "../adapters/product";
import { GeneralInfo } from "../components/Product/GeneralInfo";
import { QAs } from "../components/Product/QuestionAnswers";
import { RateAndComment } from "../components/Product/RateAndComment";
import { Reviews } from "../components/Product/Reviews";
import { ProductContainer } from "../components/ProductContainer";
import { ProductImage } from "../components/ProductImage";
import { RateDisplayByArray, RateDisplayByNumber, RateInput, RatingSummary } from "../components/Rating";
import { Loading } from "../helpers/Loading";
import { HeartIcon } from "../icons";
import { AuthRedirect } from "./Authenticate";

export const Product = () => {

    var url = useLocation().pathname;
    url = url.split("/")

    const [product, setProduct] = useState({ data: [], loading: true });

    const [selectedTab, setSelectedTab] = useState(1);

    const [relatedProducts, setRelatedProducts] = useState({ data: [], loading: true });


    useEffect(() => {

        getproduct(url[2])
            .then(response => setProduct({ data: response.data, loading: false }))
            .catch(error => console.log(error))

        getProducts("mode=related&product_id=" + url[2])
            .then((response) => {
                setRelatedProducts({ data: response.data, loading: false });
            })
            .catch((error) => {
                console.log(error);
            });

    }, [url[2]]);

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


    const Specification = () => {

        return (<div>
            {product.data.description}
        </div>)
    }

    const getSelectedTab = () => {
        switch (selectedTab) {
            case 1: return <GeneralInfo product={product} setSelectedTab={setSelectedTab} />
            case 2: return <Specification />
            case 3: return <Reviews product={product} />
            case 4: return <QAs product={product} />
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

                        <ProductContainer products={relatedProducts} title="Related Products" />

                    </>
                    : <Loading />
            }
        </section >

    );
}