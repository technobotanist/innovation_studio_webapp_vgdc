import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper'
import axios from 'axios';

import InformationPage from '../Info_Page/info_page.jsx';
import PlayPage from '../Play_Page/play_page.jsx';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import './Carousel.css'

const Carousel = () => {
  const swiperRef = useRef(null);
  const [showButtons, setShowButtons] = useState(false);
  const timerRef = useRef(null);
  const [data, setData] = useState('');

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

  const [isActiveCarousel, setActiveCarousel] = useState(true);
  const [isActivePlay, setActivePlay] = useState(false);
  const [isActiveInfo, setActiveInfo] = useState(false);

  const handleButtonClick = (event, jsonData, type) => {
    setActiveCarousel(!isActiveCarousel);
    setData(jsonData);

    if(type=="play") {
      setActivePlay(true);
    }
    else if(type=="info") {
      setActiveInfo(true);
    }

    console.log(jsonData);
    jsonData.session_click_count++;
  }

  const setCarouselActive = () => {
    setActivePlay(false);
    setActiveInfo(false);
    setActiveCarousel(true);
  }

  const setInfoActive = () => {
    setActiveCarousel(false);
    setActivePlay(false);
    setActiveInfo(true);
  }

  const setPlayActive = () => {
    setActiveCarousel(false);
    setActiveInfo(false);
    setActivePlay(true);
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
    axios.get('http://10.154.43.56:3001/swiper-content')
      .then(response => {
        const sliderData = response.data;
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

  const [filters, setFilters] = useState({
    genres: [],
    release_date: '',
  });

  const handleFilterChange = (event) => {
    console.log("filter change");
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const isChecked = event.target.checked;
      let updatedGenres;

      if (isChecked) {
        updatedGenres = [...filters.genres, value];
      } else {
        updatedGenres = filters.genres.filter((genre) => genre !== value);
      }

      setFilters({ ...filters, genres: updatedGenres });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

  const filterItems = (item) => {
    if (filters.genres.length > 0 && !filters.genres.some((genre) => item.genres.includes(genre))) {
      return false;
    }

    return true;
  };

  const filteredItems = slider.filter(filterItems);

  return (
    <div>
      <div className={isActiveCarousel ? 'active' : 'inactive'}>
        <div className='filters'>
          {/* Filter options */}
          <div className='genre-select'>
            <p>Genres</p>

            <label>
              <input
                type="checkbox"
                name="genres"
                value="action"
                checked={filters.genres.includes('action')}
                onChange={handleFilterChange}
              />
              Action
            </label>
            <label>
              <input
                type="checkbox"
                name="genres"
                value="puzzle"
                checked={filters.genres.includes('puzzle')}
                onChange={handleFilterChange}
              />
              Puzzle
            </label>
            <label>
              <input
                type="checkbox"
                name="genres"
                value="survival"
                checked={filters.genres.includes('survival')}
                onChange={handleFilterChange}
              />
              Survival
            </label>
          </div>
        </div>

        {/* Swiper component */}
        <div className='carousel'>
          <div className='swiper-button-next' onClick={goNext}></div>
          <>
            {filteredItems.length > 0 && (
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
                loop={filteredItems.length > 3}
                slidesPerView={2}
                onSlideChange={handleSlideChange}
              >
                {filteredItems.map(data => (
                  <SwiperSlide key={data.title} className='myswiper-slider'>
                    <div className='slide'>
                      <h1>{data.title}</h1>
                      <div className={`image-container${showButtons ? ' show-buttons' : ''}`}>
                        <img src={data.main_image} alt={data.title} className={`swiper-image${showButtons ? ' show-buttons' : ''}`} />
                        {showButtons && (
                          <div className='buttons'>
                            <button className='play-button' onClick={(event) => handleButtonClick(event, data, "play")}>play</button>
                            <button className='info-button'onClick={(event) => handleButtonClick(event, data, "info")}>more info</button>
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
      </div>
      <div  className={isActiveInfo ? 'active' : 'inactive'}>
        <InformationPage data={data} setCarouselActive={setCarouselActive} setPlayActive={setPlayActive} />
      </div>
      <div className={isActivePlay ? 'active' : 'inactive'}>
        <PlayPage data={data} setCarouselActive={setCarouselActive} setInfoActive={setInfoActive} isActivePlay={isActivePlay} />
      </div>
    </div>
  );
}

export default Carousel