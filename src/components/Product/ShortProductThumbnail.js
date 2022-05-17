import { useState } from "react";
import { RateDisplayByNumber } from "../Rating";

export const ShortProductThumbnail = (props) => {


    return (

        <div class="w-full flex flex-col rounded-xl">
            <figure>
                {props.product.images.filter((image, index) => index < 1).map((image, index) =>
                    <img src={image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url} key={index} className="rounded-xl w-full h-28 object-cover" />
                )}
            </figure>
            <div class="grow">
                <div className="h-full w-full flex items-center justify-center flex-col">
                    <div className="grow"></div>
                    <div className="text-xl">
                        {props.product.name}
                    </div>
                    <RateDisplayByNumber rating={props.product.averageRating} />
                    <div className="btn btn-primary btn-sm mt-4" onClick={e => { props.moveForward("/product/" + props.product.id) }}>View</div>
                </div>
            </div>
        </div>
    );
}