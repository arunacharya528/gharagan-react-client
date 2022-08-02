import { useState } from "react";
import { RateDisplayByNumber } from "../Rating";

export const ShortProductThumbnail = (props) => {


    return (
        <div>
            <div class="w-full relative rounded-xl">
                <figure>
                    {props.product.images.filter((image, index) => index < 1).map((image, index) =>
                        <img src={image.file ? process.env.REACT_APP_FILE_PATH + image.file.path : image.image_url} key={index} className="rounded-xl w-full h-28 object-cover" />
                    )}
                </figure>


                <div class="absolute top-0 left-0 h-full w-full" onClick={e => { props.moveForward("/product/" + props.product.id) }}>
                    <div className="h-full w-full flex items-center justify-center flex-col hover:bg-base-200/60">
                        <div className="grow"></div>
                        <div class="tooltip" data-tip={props.product.name}>
                            <div className="text-md pb-2 truncate">
                                {props.product.name}
                            </div>
                        </div>
                        
                        {/* <RateDisplayByNumber rating={props.product.ratings_avg_rate ? parseFloat(props.product.ratings_avg_rate) : 0} /> */}

                        {/* <div className="btn btn-primary btn-sm mt-4" onClick={e => { props.moveForward("/product/" + props.product.id) }}>View</div> */}
                    </div>
                </div>

            </div>
            <div className="flex justify-center py-3">
                <RateDisplayByNumber rating={props.product.ratings_avg_rate ? parseFloat(props.product.ratings_avg_rate) : 0} displayNumber={false} />
            </div>

        </div>

    );
}