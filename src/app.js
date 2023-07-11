import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Carousel from './Carousel/Carousel.jsx';

const App = () => {

  const writeJSON = (newData) => {
      axios
        .post('http://10.154.43.56:3001/updateJson', newData)
        .then(() => {
          console.log('JSON file updated successfully');
        })
        .catch((error) => {
          console.error('Error updating JSON file:', error);
        });
  };

  window.writeJSON = writeJSON;

  return (
    <div className="app">
      <div className="top-gradient-strip"></div>
      <div className='carousel-component'>
        <Carousel />
      </div>
      <div className="bottom-gradient-strip"></div>
    </div>
  );
};

export default App;
