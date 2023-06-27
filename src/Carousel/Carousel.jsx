import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper'
import axios from 'axios';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import './Carousel.css'

const Carousel = () => {
  const swiperRef = useRef(null);

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

  const [slider, setSlider] = useState([]);

  useEffect(() => {
    axios.get('http://10.154.57.156:3001/swiper-content')
      .then(response => {
        const sliderData = response.data;
        setSlider(sliderData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
          >
            {slider.map(data => (
              <SwiperSlide key={data.title} className='myswiper-slider'>
                <div className='slide'>
                  <h1>{data.title}</h1>
                  <img src={data.main_image} alt={data.title} />
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