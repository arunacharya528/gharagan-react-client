import React from "react";
import Carousel, { slidesToShowPlugin, arrowsPlugin } from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import { ChevronLeftIcon, ChevronRightIcon } from "../icons";

/**
 * 
 * @param {Array} items array of react components
 * @param {String} mode mode of carousel ["FULL"] 
 * @returns 
 */
export const CarouselView = ({ items, mode }) => {

    const getPlugins = (noOfSlides) => {
        return (
            [
                'infinite',
                'fastSwipe',
                {
                    resolve: slidesToShowPlugin,
                    options: {
                        numberOfSlides: mode === 'FULL' ? 1 : noOfSlides
                    }
                },
                {
                    resolve: arrowsPlugin,
                    options: {
                        arrowLeft: <button className="btn btn-primary btn-circle ml-3"><ChevronLeftIcon className="w-5 h-5" /></button>,
                        arrowLeftDisabled: <button className="btn btn-primary btn-circle ml-3 btn-disabled"><ChevronLeftIcon className="w-5 h-5" /></button>,
                        arrowRight: <button className="btn btn-primary btn-circle mr-3"><ChevronRightIcon className="w-5 h-5" /></button>,
                        arrowRightDisabled: <button className="btn btn-primary btn-circle mr-3 btn-disabled"><ChevronRightIcon className="w-5 h-5" /></button>,
                        addArrowClickHandler: true,
                    }
                },
            ]
        );
    }
    return (

        <Carousel
            plugins={getPlugins(5)}

            breakpoints={{
                640: {
                    plugins: getPlugins(1)
                },
                900: {
                    plugins: getPlugins(2)
                }
            }}
        >
            {items.map((item, index) => <React.Fragment key={index}>{item}</React.Fragment>)}
        </Carousel >
    );
}