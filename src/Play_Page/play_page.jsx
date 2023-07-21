import React, { useState } from 'react';
import "./play_page.css"; 

import home_icon from "./home_icon.png";

const PlayPage = ({data, setInfoActive, setCarouselActive, isActivePlay}) => {
    return(
        <div className ="PlayPage">
            <div className='game-div'>
                {/* <iframe className='game-iframe' src={isActivePlay ? data.game_src : ""} ></iframe> */}
                <iframe className='game-iframe' src={isActivePlay ? data.game_src : ""} allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated" frameborder="0" allowfullscreen="true" scrolling="no" id="game_drop" allowtransparency="true" webkitallowfullscreen="true" mozallowfullscreen="true" msallowfullscreen="true"></iframe>
            </div>
            <div className='info-div'>
                <div className='controls'>
                    <h1>CONTROLS:</h1>
                    <p>{data.controls}</p>
                </div>

                <div className='overview'>
                    <h1>OVERVIEW:</h1>
                    <p>{data.short_description}</p>
                </div>

                <div className='authors'>
                    <h1>AUTHORS:</h1>
                    <p>{data.authors}</p>
                </div>

                <div className ="info-button-play">
                    <button onClick={setInfoActive}>
                        more info
                    </button>
                </div>
            </div>

            {/* <div className="button-tray"> */}
                <div className='home-button'>
                    <button onClick={setCarouselActive}>
                        <img src={home_icon} alt="home icon" />
                    </button>
                </div>
            {/* </div> */}
        </div>
    );
}

export default PlayPage;
