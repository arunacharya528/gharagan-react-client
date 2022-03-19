import { useEffect, useState } from "react";
import ReactImageZoom from 'react-image-zoom';

export const ProductImage = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState(images[0].image);

    const imageStyle = {
        width: "100%",
        height: "auto",
        marginBottom: "0.2rem"
    }
    const zoomImageProps = {
        img: selectedImage,
        offset: { vertical: 0, horizontal: 10 }

    };

    return (
        <div className="row">
            <div className="col-2">
                {images.map((image, index) =>
                    <img src={image.image} alt={image.image} key={index} style={imageStyle} onClick={e => setSelectedImage(image.image)} />
                )}
            </div>
            <div className="col image-zoom">
                {/* <img src={selectedImage} style={{ width: "100%", height: 'auto' }} /> */}

                <ReactImageZoom {...zoomImageProps} />
            </div>
        </div>
    );
}