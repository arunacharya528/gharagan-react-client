import React from "react";
import ReactDOM from "react-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

export const CarouselView = ({ items, displayItems }) => {
    const leftIcon = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>`;
    const rightIcon = `<svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;

    const options = {
        loop: true,
        nav: true,
        items: displayItems,
        autoplay: true,
        lazyload: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        navText: [
            `${leftIcon}`,
            `${rightIcon}`
        ],
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