import { useContext } from "react";
import Slider from "react-slick";
import { AdvertisementContext } from "../../context/AdvertisementContext";
import { ModalContext } from "../../context/ModalContext";
import { defaultSliderSetting } from "../../helpers/defaultSliderSetting";

export const CategoryAd = () => {
    const { getAdvertisement } = useContext(AdvertisementContext);
    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const handleModalOpen = (ad) => {
        setModalData({
            title: "Overview of Advertisement",
            body: <div>
                <h1 className="text-lg font-bold">{ad.name}</h1>
                <img
                    class="block mx-auto w-1/2 order-2 mt-2 object-contain bannerImage rounded-lg"
                    src={process.env.REACT_APP_FILE_PATH + ad.file.path}
                    alt="VR Collection"
                />
                <div className="transition delay-150 duration-500 ease-in-out">
                    {ad.summary}
                </div>
                <a href={ad.url_slug} target="_blank" className="btn btn-primary p-3 mt-4 ">
                    View More
                </a>
            </div>,
            size: "max-w-5xl"
        });
        openModal();
    }
    const View = ({ ad }) => {
        return (
            <div className="relative px-2">
                <img
                    class="block mx-auto order-2 mt-2 object-contain bannerImage rounded-lg"
                    src={process.env.REACT_APP_FILE_PATH + ad.file.path}
                    alt="VR Collection"
                />
                <div className="absolute top-0 flex items-center justify-center h-full w-full flex-col">
                    <h1 className="text-lg font-bold py-2 transition delay-150 duration-400 ease-in-out">
                        {ad.name}
                    </h1>
                    <button className="btn btn-primary btn-sm" onClick={e => handleModalOpen(ad)}>View</button>
                </div>

            </div>
        )
    }
    return (
        <>
            <div className="my-32">
                <div className="font-semibold text-center  bg-base-100 rounded-full px-3 py-1 uppercase ">Advertisements</div>
                <div className="block md:hidden container mx-auto px-10 mb-32">
                    <Slider {...defaultSliderSetting({ autoplaySpeed: 10000, rows: 1, slidesToShow: 1, centerMode: true })}>
                        {getAdvertisement('category').map((ad, index) =>
                            <View ad={ad} key={index} />
                        )}
                    </Slider>
                </div>
                <div className="hidden md:block lg:hidden container mx-auto">
                    <Slider {...defaultSliderSetting({ autoplaySpeed: 10000, rows: 1, slidesToShow: 2, centerMode: true })}>
                        {getAdvertisement('category').map((ad, index) =>
                            <View ad={ad} key={index} />
                        )}
                    </Slider>
                </div>
                <div className="hidden lg:block container mx-auto">
                    <Slider {...defaultSliderSetting({ autoplaySpeed: 10000, rows: 2, slidesToShow: 3, centerMode: true })}>
                        {getAdvertisement('category').map((ad, index) =>
                            <View ad={ad} key={index} />
                        )}
                    </Slider>
                </div>
            </div>
            
        
        </>
        
    );
}