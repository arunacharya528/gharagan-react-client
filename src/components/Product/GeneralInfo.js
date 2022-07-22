import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { getDiscountedPrice } from "../../helpers/calculatePrice";
import { ClipboardIcon, HeartIcon } from "../../icons";
import { RateDisplayByArray } from "../Rating";
import { GeneralInfoSkeleton } from "../Skeleton/ProductSkeleton";
import { InventoryList } from "./InventoryList";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, FacebookMessengerShareButton, FacebookMessengerIcon } from 'react-share';
import { Link, useLocation } from "react-router-dom";
import { copyToClipboard } from "../../helpers/copyToClipboard";
import toast from "react-hot-toast";
export const GeneralInfo = ({ product, setSelectedTab }) => {
    const location = useLocation();
    return (
        <>
            {
                product.loading ?
                    <GeneralInfoSkeleton />

                    :
                    <div className="grid md:grid-cols-2 gap-5">
                        <div className="overflow-hidden">
                            <ImageGallery thumbnailPosition="left" items={product.data.images.map((image) => {
                                const imageURL = image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url;
                                return {
                                    original: imageURL,
                                    thumbnail: imageURL
                                }
                            })} />
                        </div>
                        <div className="flex flex-col space-y-5">

                            <div className="text-3xl font-bold">{product.data.name}

                            </div>
                            <div className="flex space-x-5">
                                <RateDisplayByArray ratings={product.data.ratings} />
                                <a className="font-semibold text-primary cursor-pointer" onClick={e => setSelectedTab(3)}>See all {product.data.ratings.length} reviews</a>
                            </div>

                            <InventoryList product={product.data} buttonSize="" />
                            <div className="space-x-5">
                                <Link to={"/filter/?categories=" + product.data.category.id} className="text-primary underline underline-offset-2" >{product.data.category.name}</Link>
                                <Link to={"/brand/" + product.data.brand.id} className="text-primary underline underline-offset-2" >{product.data.brand.name}</Link>
                            </div>

                            <div>
                                <div className="my-5 font-semibold">Summary</div>
                                <div>
                                    {product.data.summary}
                                </div>
                            </div>

                            <div className="flex space-x-3 items-center mt-8">
                                <span className="font-semibold">Share:</span>
                                <FacebookShareButton url={process.env.REACT_APP_PUBLIC_URL + location.pathname}>
                                    <FacebookIcon size={40} round={true} />
                                </FacebookShareButton>

                                <FacebookMessengerShareButton url={process.env.REACT_APP_PUBLIC_URL + location.pathname}>
                                    <FacebookMessengerIcon size={40} round={true} />
                                </FacebookMessengerShareButton>

                                <TwitterShareButton url={process.env.REACT_APP_PUBLIC_URL + location.pathname}>
                                    <TwitterIcon size={40} round={true} />
                                </TwitterShareButton>

                                <button className="btn btn-circle btn-outline" onClick={e => {
                                    copyToClipboard(process.env.REACT_APP_PUBLIC_URL + location.pathname)
                                    toast.success("Page Link copied to clipboard")
                                }}>
                                    <ClipboardIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </>


    );
}