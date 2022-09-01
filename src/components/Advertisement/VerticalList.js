import { useContext } from "react";
import Slider from "react-slick";
import { AdvertisementContext } from "../../context/AdvertisementContext";
import { defaultSliderSetting } from "../../helpers/defaultSliderSetting";

export const VerticalList = () => {

    const { getAdvertisement } = useContext(AdvertisementContext);

    const Content = ({ ad }) => {
        return (
            <div className={" bg-base-200 rounded-md my-1 !flex items-stretch"}>
                <img
                    className="backdrop-blur-none rounded-l-md w-32 object-cover"
                    src={process.env.REACT_APP_FILE_PATH + ad.file.path}
                />
                <div className="flex flex-col p-3">
                    <span className="font-semibold">{ad.name}</span>
                    <p className="text-clip h-20 overflow-hidden">{ad.summary}</p>
                    <a href={ad.url_slug} target="_blank" className="font-semibold">View More</a>
                </div>
            </div >
        );
    }
    return (

        <>
            <div className="hidden md:block">
                {
                    <Slider {...defaultSliderSetting({ arrows: true, slidesToShow: getAdvertisement('sidebar').length > 3 ? 3 : 1, vertical: true, verticalSwiping: true, autoplaySpeed: 7000 })}>
                        {getAdvertisement('sidebar').map((ad, index) =>
                            <Content ad={ad} key={index} />

                        )}
                    </Slider>
                }

            </div>
            <div className="block md:hidden p-5">
                <Slider {...defaultSliderSetting({ arrows: true, slidesToShow: 1, autoplaySpeed: 7000 })}>
                    {getAdvertisement('sidebar').map((ad, index) =>
                        <Content ad={ad} key={index} />
                    )}
                </Slider>
            </div>
        </>
    );
}