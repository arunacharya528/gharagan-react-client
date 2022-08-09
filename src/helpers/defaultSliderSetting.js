export const defaultSliderSetting = (addedSetting) => {
    const initialSetting = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        className: "",
        swipeToSlide: true,
        speed: 200,
        autoplaySpeed: 2000,
        pauseOnHover: true,
        autoplay: true
    }

    return ({ ...initialSetting, ...addedSetting })
}