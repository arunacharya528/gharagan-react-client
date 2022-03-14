import React from "react";
import ReactDOM from "react-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export const CarouselView = ({ items, displayItems }) => {
    const options = {
        loop: true,
        nav: true,
        items: displayItems,
        autoplay: true,
        lazyload: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
    };
    return (
        <OwlCarousel className="owl-carousel owl-theme" {...options}>
            {items.map((item, index) =>
                <div key={index} className="item">
                    {item}
                </div>
            )}
        </OwlCarousel>
    );
}