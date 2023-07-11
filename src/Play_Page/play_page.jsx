import React, { useState } from 'react';
import "./play_page.css"; 

import home_icon from "./home_icon.png";

const PlayPage = ({data, setInfoActive, setCarouselActive, isActivePlay}) => {
    return(
        <div className ="PlayPage">
            <div className='game-div'>
                <iframe className='game-iframe' src={isActivePlay ? data.game_src : ""} ></iframe>
            </div>
            <div className='info-div'>
                <div className='controls'>
                    <h1>CONTROLS:</h1>
                    <p>{data.controls}</p>
                </div>

                <div className='overview'>
                    <h1>OVERVIEW:</h1>
                    <p>{data.description}</p>
                </div>

                <div className='authors'>
                    <h1>AUTHORS:</h1>
                    <p>{data.authors}</p>
                </div>
        
            </div>

            <div className="button-tray">
                <div className ="expand-button">
                    <button>
                        expand
                    </button>
                </div>
                <div className='home-button'>
                    <button onClick={setCarouselActive}>
                        <img src={home_icon} alt="home icon" />
                    </button>
                </div>
                <div className ="info-button-play">
                    <button onClick={setInfoActive}>
                        info
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlayPage;
