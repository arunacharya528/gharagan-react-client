import React, { useEffect, useState } from "react";
import { getActiveAdvertisements } from "../../adapters/advertisement";
import { Loading } from "../../helpers/Loading";
import { CarouselView } from "../Carousel";

export const Banner = () => {

    const [banners, setBanners] = useState([]);
    useEffect(() => {
        getActiveAdvertisements()
            .then((response) => {
                setBanners(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <>
            {banners.length !== 0 ?
                <CarouselView items={banners.map((banner, index) => {
                    return (
                        <React.Fragment key={index}>
                            <div className="detail">
                                <div className="heading">{banner.name}</div>
                                <p>
                                    {banner.summary}
                                </p>
                                <div className="link-container">
                                    <a href={banner.url_slug} target="_blank">Click to Visit</a>
                                </div>
                            </div>
                            <img src={process.env.REACT_APP_FILE_PATH + banner.file.path} />
                        </React.Fragment>
                    );
                })} displayItems={1}></CarouselView>
                : <Loading />
            }
        </>

    );

}