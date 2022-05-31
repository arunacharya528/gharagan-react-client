import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import { getDiscountedPrice } from "../../helpers/calculatePrice";
import { HeartIcon } from "../../icons";
import { RateDisplayByArray } from "../Rating";
import { GeneralInfoSkeleton } from "../Skeleton/ProductSkeleton";
import { InventoryList } from "./InventoryList";

export const GeneralInfo = ({ product, setSelectedTab }) => {

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
                            
                            <div>
                                <div className="my-5 font-semibold">Summary</div>
                                <div>
                                    {product.data.summary}
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>


    );
}