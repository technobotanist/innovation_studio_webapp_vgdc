import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./media_page.css";

import home_icon from "./home_icon.png";

const MediaPage = ({data, setPlayActive, setAuthorActive, setCarouselActive}) => {    
    
    /* Temporary image list for when data has not been defined */
    const dummy_images = [
    {
        src: "./images/image1.png",
        alt: "image 1"
    }];

    const images = data ? data.images : dummy_images;

    /* Map the images from data to individual slides */
    const renderSlides = images.map((image) => (
        <div className="slideImg" key={image.alt}>
          <img src={image.src} alt={image.alt} />
        </div>
    ));

    /* Handles the highlighting of the current slide in the thumbnail tray */
    const [currentIndex, setCurrentIndex] = useState();
    function handleChange(index) {
        setCurrentIndex(index);
    }

    return(
        <div className ="MediaPage">
            <div className="button-tray">
                <div className ="back-button">
                    <button onClick={setAuthorActive}>
                        AUTHOR INFORMATION
                    </button>
                </div>
                <div className="play-button">
                    <button onClick={setPlayActive}>
                        play
                    </button>
                </div>
            </div>
            <div className='media-home-button'>
                <button onClick={setCarouselActive}>
                    <img src={home_icon} alt="home icon" />
                </button>
            </div>
            <div className="media-carousel">
                <Carousel
                    showArrows={true}
                    autoPlay={true}
                    infiniteLoop={true}
                    selectedItem={images[currentIndex]}
                    onChange={handleChange}
                >
                    {renderSlides}
                </Carousel>
            </div>
        </div>
    );

}
export default MediaPage


