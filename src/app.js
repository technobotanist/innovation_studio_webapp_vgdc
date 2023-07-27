import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Carousel from './Carousel/Carousel.jsx';

import arcade_logo from "./arcade_brand.png";
import library_logo from "./library_logo.png";

const App = () => {
  /* IP address of host machine */
  const host = "10.42.0.1";

  /* Function that calls the backend json server to write to the local json files */
  const writeJSON = (newData) => {
      axios
        .post('http://' + host + ':3001/updateJson', newData)
        .then(() => {
          console.log('JSON file updated successfully');
        })
        .catch((error) => {
          console.error('Error updating JSON file:', error);
        });
  };

  window.writeJSON = writeJSON;

  const [isActiveLogos, setActiveLogos] = useState(true);

  const setLogosActive = () => {
    setActiveLogos(true);
  }

  const setLogosInactive = () => {
    setActiveLogos(false);
  }

  return (
    <div className="app">
      <div className="top-gradient-strip"></div>
      <div className="arcade-logo">
        <img className={isActiveLogos ? 'active' : 'inactive'} src={arcade_logo} alt="the arcade" />
      </div>
      <div className='library-logo'>
        <img className={isActiveLogos ? 'active' : 'inactive'} src={library_logo} alt="library logo" />
      </div>
      <div className='carousel-component'>
        <Carousel setLogosActive={setLogosActive} setLogosInactive={setLogosInactive} />
      </div>
      <div className="bottom-gradient-strip"></div>
    </div>
  );
};

export default App;
