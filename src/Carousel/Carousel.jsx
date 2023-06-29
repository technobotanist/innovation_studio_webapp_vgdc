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

  var sort_date_text = "Newest";

  const sortItemsByDate = (a, b) => {
    if (filters.release_date === 'newest') {
      sort_date_text = "Newest";
      return new Date(b.date_added) - new Date(a.date_added);
    } else if (filters.date === 'oldest') {
      sort_date_text = "Oldest";
      return new Date(a.date_added) - new Date(b.date_added);
    }
    return 0;
  };

  const filterItems = (item) => {
    if (filters.genres.length > 0 && !filters.genres.some((genre) => item.genres.includes(genre))) {
      return false;
    }

    return true;
  };

  const filteredItems = slider.filter(filterItems).sort(sortItemsByDate);

  return (
    <div>
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

        <select name="date" value={filters.release_date} onChange={handleFilterChange} className='date-dropdown'>
          <option value="">Select Date Order</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>

        <p className='sort-date-text'>{sort_date_text}</p>
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
    </div>
  );
}

export default Carousel