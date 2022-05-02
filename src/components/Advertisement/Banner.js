import { useEffect, useState } from "react";
import { getActiveAdvertisements } from "../../adapters/advertisement";
import { Loading } from "../../helpers/Loading";
import { CarouselView } from "../OwlCarousel";

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
                        <div class="item">
                            <img src={process.env.REACT_APP_FILE_PATH + banner.file.path} />
                        </div>
                    );
                })} displayItems={1}></CarouselView>
                : <Loading />
            }
        </>

    );

}