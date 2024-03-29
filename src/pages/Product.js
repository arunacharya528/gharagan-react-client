import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ImageGallery from "react-image-gallery";
import { Link, useLocation } from "react-router-dom";
import { getproduct, getProducts } from "../adapters/product";
import { GeneralInfo } from "../components/Product/GeneralInfo";
import { QAs } from "../components/Product/QuestionAnswers";
import { RateAndComment } from "../components/Product/RateAndComment";
import { Reviews } from "../components/Product/Reviews";
import { ProductContainer } from "../components/ProductContainer";
import { ProductImage } from "../components/ProductImage";
import { RateDisplayByArray, RateDisplayByNumber, RateInput, RatingSummary } from "../components/Rating";
import { SpecificationSkeleton } from "../components/Skeleton/ProductSkeleton";
import { Loading } from "../helpers/Loading";
import { HeartIcon } from "../icons";
import { AuthRedirect } from "./Authenticate";
import "../assets/default.scss"

export const Product = () => {

    var url = useLocation().pathname;
    url = url.split("/")

    const [product, setProduct] = useState({ data: [], loading: true });

    const [selectedTab, setSelectedTab] = useState(1);

    const [relatedProducts, setRelatedProducts] = useState({ data: [], loading: true });
    const [isRefreshed, setRefresh] = useState(false)


    useEffect(() => {

        getproduct(url[2])
            .then(response => setProduct({ data: response.data, loading: false }))
            .catch(error => console.log(error))

        getProducts("?mode=related&product_id=" + url[2])
            .then((response) => {
                setRelatedProducts({ data: response.data, loading: false });
            })
            .catch((error) => {
                console.log(error);
            });

    }, [url[2], isRefreshed]);


    const Specification = () => {

        return (<div>
            {product.loading ? <SpecificationSkeleton /> :
                <div className="unreset" dangerouslySetInnerHTML={{ __html: product.data.description }} />
            }
        </div>)
    }

    const getSelectedTab = () => {
        switch (selectedTab) {
            case 1: return <GeneralInfo product={product} setSelectedTab={setSelectedTab} />
            case 2: return <Specification />
            case 3: return <Reviews product={product} />
            case 4: return <QAs product={product} onSubmit={() => setRefresh(!isRefreshed)} />
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
            <div class="card  md:container mx-3 md:mx-auto bg-base-200 shadow-sm">
                <div class="card-body px-3 py-5 ">

                    <div class="tabs tabs-boxed bg-base-300 w-fit">
                        {
                            buttons.map((button, index) =>
                                <a class={"tab" + (selectedTab === button.value ? ' tab-active' : '')} onClick={e => setSelectedTab(button.value)} key={index} >{button.name}</a>
                            )
                        }
                    </div>

                    <div className="p-5">
                        {getSelectedTab()}
                    </div>
                </div>
            </div>

            <ProductContainer products={relatedProducts} title="Related Products" />

        </section >

    );
}