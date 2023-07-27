import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper'
import axios from 'axios';

import InformationPage from '../Info_Page/info_page.jsx';
import PlayPage from '../Play_Page/play_page.jsx';
import AuthorPage from '../Author_Info/author_info.jsx';
import MediaPage from '../Media_Page/media_page.jsx';

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import './Carousel.css'

const Carousel = ({setLogosActive, setLogosInactive}) => {
  const swiperRef = useRef(null);
  const [data, setData] = useState('');

  /* IP address of host machine */
  const host = "10.154.43.56";

  /* Function to move carousel to the next slide */
  const goNext = () => {
    if(swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  }

  /* Function to move carousel to the previous slide */
  const goPrev = () => {
    if(swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  }

  /* Parameters defining which classes are related to the next and previous buttons */
  const swiperParams = {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  }

  const [isActiveCarousel, setActiveCarousel] = useState(true);
  const [isActivePlay, setActivePlay] = useState(false);
  const [isActiveInfo, setActiveInfo] = useState(false);
  const [isActiveAuthor, setActiveAuthor] = useState(false);
  const [isActiveMedia, setActiveMedia] = useState(false);

  /* Handles the play and more info button clicks */
  const handleButtonClick = (event, jsonData, type) => {
    setData(jsonData);

    if(type=="play") {
      setPlayActive();
    }
    else if(type=="info") {
      setInfoActive();
    }

    console.log(jsonData);
    jsonData.session_click_count++;
  }

  /* Function to set the Carousel Page to be the active page */
  const setCarouselActive = () => {
    window.location.reload();
  }

  /* Function to set the Info Page to be the active page */
  const setInfoActive = () => {
    setActiveCarousel(false);
    setActivePlay(false);
    setActiveAuthor(false);
    setActiveMedia(false);
    setActiveInfo(true);
    setLogosActive();
  }

  /* Function to set the Play Page to be the active page */
  const setPlayActive = () => {
    setActiveCarousel(false);
    setActiveInfo(false);
    setActiveAuthor(false);
    setActiveMedia(false);
    setActivePlay(true);
    setLogosActive();
  }

  /* Function to set the Author Page to be the active page */
  const setAuthorActive = () => {
    setActiveCarousel(false);
    setActivePlay(false);
    setActiveInfo(false);
    setActiveMedia(false);
    setActiveAuthor(true);
    setLogosActive();
  }

  /* Function to set the Media Page to be the active page */
  const setMediaActive = () => {
    setActiveCarousel(false);
    setActivePlay(false);
    setActiveInfo(false);
    setActiveAuthor(false);
    setActiveMedia(true);
    setLogosInactive();
  }

  /* Function that will write the locally stored versions of game information to the local json files */
  function updateAllJSONFiles()
  {
      // Your function logic here
      for(let i = 0; i < slider.length; i++)
      {
          writeJSON(slider[i]);
      }
  }

  /* Uncomment the next line if you actually want to write to the jsons when unloading the page. Currently, this is not needed as we aren't updating the local versions of the game info */
  /* window.onbeforeunload = updateAllJSONFiles; */

  const [slider, setSlider] = useState([]);

  /* Function that calls the backend json server to retrieve all the game information */
  useEffect(() => {
    axios.get('http://' + host + ':3001/swiper-content')
      .then(response => {
        const sliderData = response.data;
        setSlider(sliderData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  /* Defines the different filters. Currently just genres */
  const [filters, setFilters] = useState({
    genres: [],
  });

  /* Function that will update the active filters when a filter is added or removed */
  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    console.log(value);
    let val = value;
    if(val.indexOf('  ') != -1)
    {
      val = value.substring(0, value.indexOf('  '));
    }

    console.log(val);
  
    // Check if the genre is already selected
    const isGenreSelected = filters.genres.includes(val);
  
    // Update the filters state based on the button click
    if (isGenreSelected) {
      setFilters({ ...filters, genres: filters.genres.filter((genre) => genre !== val) });
    } else {
      setFilters({ ...filters, genres: [...filters.genres, val] });
    }
  };

  /* Function that applies the filters to a given list of game information */
  const filterItems = (item) => {
    if (filters.genres.length > 0 && !filters.genres.some((genre) => item.genres.includes(genre))) {
      return false;
    }

    return true;
  };

  /* Apply the filters to the main list of game information*/
  const filteredItems = slider.filter(filterItems);
  const [isActiveGenreSelect, setActiveGenreSelect] = useState(false);

  /* Function to activate the genre select panel */
  const setGenreSelectActive = () =>
  {
    setActiveGenreSelect(true);
  }

  /* Function to deactivate the genre select panel */
  const setGenreSelectInactive = () =>
  {
    setActiveGenreSelect(false);
  }

  /* List of genres */
  const genreText = ["adventure", "action", "puzzle", "visual novel", "role playing", "platformer", "shooter", "survival", "interactive fiction", "simulation", "strategy", "fighting", "card game", "educational", "racing", "rhythm", "sports"];

  /* Map the list of genres to clickable buttons */
  const genreSelect = genreText.map((genre) => (
    <input 
      key={genre}
      type='button' 
      name='genres' 
      value={genre}
      className={filters.genres.includes(genre) ? 'selected' : 'unselected'}
      onClick={handleFilterChange}
    />
  ));

  /* Map the list of genres to clickable buttons */
  const topGenreSelect = genreText.map((genre) => (
    <div className={filters.genres.includes(genre) ? 'selected' : 'unselected'}>
      <input 
        key={genre}
        type='button' 
        name='genres' 
        value={genre + "      x"}
        onClick={handleFilterChange}
      />
    </div>
  ));

  return (
    <div>
      <div className={isActiveCarousel ? 'active' : 'inactive'}>
        <div className={isActiveGenreSelect ? 'active' : 'inactive'}>
          <div className='genre-select-background' onClick={setGenreSelectInactive}></div>
          <div className='genre-select-module'>
            <h1>SEARCH GENRES:</h1>
            <button className='exit-genre-select' onClick={setGenreSelectInactive}>back</button>
            <div className='genre-select'>
              {genreSelect}
            </div>
          </div>
        </div>

        <div className='filters'>
          <div className='genres'>
            <div className='genre-list'>
              <p>SORT BY GENRES:</p>

              <div className='top-genre-select'>
               {topGenreSelect}
              </div>

              <button className='add-genre' onClick={setGenreSelectActive}>
                + genre
              </button>
            </div>
          </div>
        </div>

        {/* Swiper component */}
        <div className='CarouselPage'>
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
                autoplay={{
                  delay: 300000 / (slider.length * 2),
                  disableOnInteraction: true,
                }}
                slidesPerView={2}
              >
                {filteredItems.map(data => (
                  <SwiperSlide key={data.title} className='myswiper-slider'>
                    <div className='carousel-page-slide'>
                      <h1>{data.title}</h1>
                      <div className='image-container'>
                        <img src={data.main_image} alt={data.title} className='swiper-image' onClick={(event) => handleButtonClick(event, data, "info")}/>
                      </div>
                      <div className='buttons'>
                          <button className='info-button' onClick={(event) => handleButtonClick(event, data, "info")}>learn more</button>
                        </div>
                      <p>{data.short_description}</p>
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
        <InformationPage data={data} setCarouselActive={setCarouselActive} setPlayActive={setPlayActive} setAuthorActive={setAuthorActive} />
      </div>
      <div className={isActivePlay ? 'active' : 'inactive'}>
        <PlayPage data={data} setCarouselActive={setCarouselActive} setInfoActive={setInfoActive} isActivePlay={isActivePlay} />
      </div>
      <div className={isActiveAuthor ? 'active' : 'inactive'}>
        <AuthorPage data={data} setCarouselActive={setCarouselActive} setInfoActive={setInfoActive} setPlayActive={setPlayActive} setMediaActive={setMediaActive} />
      </div>
      <div className={isActiveMedia ? 'active' : 'inactive'}>
        <MediaPage data={data} setCarouselActive={setCarouselActive} setPlayActive={setPlayActive} setAuthorActive={setAuthorActive} />
      </div>
    </div>
  );
}

export default Carousel