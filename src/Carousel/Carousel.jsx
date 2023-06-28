import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper'
import axios from 'axios';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import './Carousel.css'

const Carousel = () => {
  const swiperRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const timerRef = useRef(null);

  const goNext = () => {
    if(swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  }

  const goPrev = () => {
    if(swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  }

  const swiperParams = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

  var gameData = [];

  const handleButtonClick = (event, jsonData) => {
    console.log(slider);
    jsonData.session_click_count++;
  }

  function updateAllJSONFiles()
  {
      // Your function logic here
      for(let i = 0; i < slider.length; i++)
      {
          writeJSON(slider[i]);
      }
  }

  window.onbeforeunload = updateAllJSONFiles;

  const [slider, setSlider] = useState([]);

  useEffect(() => {
    axios.get('http://10.154.57.156:3001/swiper-content')
      .then(response => {
        const sliderData = response.data;
        gameData = sliderData;
        setSlider(sliderData);
        setShowButtons(false); // Initially show buttons
        startTimer(); // Start the timer
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      setShowButtons(true); // Hide buttons after the delay
    }, 3000);
  };

  const handleSlideChange = () => {
    clearTimeout(timerRef.current); // Reset the timer
    setShowButtons(false); // Show buttons
    startTimer(); // Start the timer again
  };

  return (
    <div className='carousel'>
      <div className='swiper-button-next' onClick={goNext}></div>
      <>
        {slider.length > 0 && (
          <Swiper
            {...swiperParams}
            ref={swiperRef}
            className='myswiper'
            modules={[EffectCoverflow, Autoplay]}
            effect='coverflow'
            grabCursor={true}
            centeredSlides={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 3,
              slideShadows: false
            }}
            loop={true}
            slidesPerView={2}
            onSlideChange={handleSlideChange}
          >
            {slider.map(data => (
              <SwiperSlide key={data.title} className='myswiper-slider'>
                <div className='slide'>
                  <h1>{data.title}</h1>
                  <div className={`image-container${showButtons ? ' show-buttons' : ''}`}>
                    <img src={data.main_image} alt={data.title} className={`swiper-image${showButtons ? ' show-buttons' : ''}`} />
                    {showButtons && (
                      <div className='buttons'>
                        <button className='play-button' onClick={(event) => handleButtonClick(event, data)}>play</button>
                        <button className='info-button'>more info</button>
                      </div>
                    )}
                  </div>
                  <p>{data.description}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </>
      <div className='swiper-button-prev' onClick={goPrev}></div>
    </div>
  );
}

export default Carousel