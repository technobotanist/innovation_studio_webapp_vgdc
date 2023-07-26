import React, { useState, useEffect, useRef } from 'react';
import "./play_page.css"; 

import home_icon from "./home_icon.png";
import touch_icon from "./touchscreen_controllers.png";
import keyboard_icon from "./wasd_controllers.png";
import controller_icon from "./controllers_icon.png";
import refresh_icon from "./refresh.png";

const PlayPage = ({data, setInfoActive, setCarouselActive, isActivePlay}) => {
    const buttonRef = useRef(null);
    const iframeRef = useRef(null);

    let click_count = 0;
    const max_click_count = 10;
    let previous_game = null;

    /* Temporary image list for when data has not been defined */
    const dummy_controller_support_list = [0, 0, 0];

    const supported_controllers = data ? data.supported_controllers : dummy_controller_support_list;

    useEffect(() => {
        // Set up the interval when the component mounts
        const interval = setInterval(() => {
            // Programmatically trigger the click event on the button
            if(previous_game != iframeRef.current.src)
            {
                console.log("reset timer");
                click_count = 0;
                previous_game=iframeRef.current.src;
            }

            if(click_count < max_click_count)
            {
                buttonRef.current.click();
                click_count++;
            }

            /* console.log(previous_game); */

        }, 60000); // 60,000 milliseconds = 1 minute

        // Clear the interval when the component unmounts to avoid memory leaks
        return () => clearInterval(interval);
    }, []);

    const handleClick = () => {
        // Handle the click event here
        console.log('Button clicked!');
    };
    
    const refreshIframe = () => {
        iframeRef.current.src = "";
        iframeRef.current.src = data.game_src;
    }
    
    return(
        <div className ="PlayPage">
            <div ref={buttonRef} onClick={handleClick} className='game-div'>
                <iframe ref={iframeRef} className='game-iframe' src={isActivePlay ? data.game_src : ""} ></iframe>
                {/* <iframe className='game-iframe' src={isActivePlay ? data.game_src : ""} allow="autoplay; fullscreen *; geolocation; microphone; camera; midi; monetization; xr-spatial-tracking; gamepad; gyroscope; accelerometer; xr; cross-origin-isolated" frameborder="0" allowfullscreen="true" scrolling="no" id="game_drop" allowtransparency="true" webkitallowfullscreen="true" mozallowfullscreen="true" msallowfullscreen="true"></iframe> */}
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

            <div className='home-button'>
                <button onClick={setCarouselActive}>
                    <img src={home_icon} alt="home icon" />
                </button>
            </div>
            <div className='refresh-button'>
                <img onClick={refreshIframe} className='refresh' src={refresh_icon} />
            </div>

            <div className="button-tray">
                <div className={supported_controllers[0]===1 ? 'active' : 'inactive'}>
                    <img className='touch ' src={touch_icon} alt="touch icon"></img>
                </div>
                <div className={supported_controllers[1]===1 ? 'active' : 'inactive'}>
                    <img className='keyboard ' src={keyboard_icon} alt="keyboard icon"></img>
                </div>
                <div className={supported_controllers[2]===1 ? 'active' : 'inactive'}>
                    <img className='controller ' src={controller_icon} alt="controller icon"></img>
                </div>
            </div>
        </div>
    );
}

export default PlayPage;
