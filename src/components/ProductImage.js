import { useRef } from "react";
import Carousel from 'react-gallery-carousel';
import 'react-gallery-carousel/dist/index.css';
export const ProductImage = ({ images }) => {

    const carouselRef = useRef(null);

    const updatedImages = images.map((image) => {
        return {
            src: image.image,
            srcset: `${image.image} 400w, ${image.image} 700w,${image.image} 1000w`,
            sizes: '(max-width: 1000px) 400px, (max-width: 2000px) 700px, 1000px',
            alt: `Images of product`,
            thumbnail: image.image
        };
    });

    return (
        <Carousel
            ref={carouselRef}
            images={updatedImages}
            isMaximized={false}
            hasIndexBoard={false}
            hasCaptionsAtMax='top'
            hasDotButtonsAtMax='bottom'
            hasThumbnailsAtMax={true}
            thumbnailWidth={'15%'}
            thumbnailHeight={'15%'}
            shouldMaximizeOnClick={true}
            shouldMinimizeOnClick={true}
            isAutoPlaying={true}
            autoPlayInterval={5000}
        />
    );
}