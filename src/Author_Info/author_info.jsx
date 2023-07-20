import React, { useState } from 'react';
import './author_info.css'

import home_icon from "./home_icon.png";

const AuthorPage = ({data, setPlayActive, setInfoActive, setMediaActive, setCarouselActive}) => {
    /* If the data has not been defined yet, set the genre list to be empty */
    const genres = data ? data.genres : [];

    return(
        <div className ="AuthorPage">
            <div className="text">
                <div className="title">
                    <h1>{data.title}</h1>
                </div>

                <div className="name">
                    <div className ="author-subheading">
                        <h3>AUTHOR(S)</h3>
                    </div>
                    <div className ="paragraph">
                        <p>{data.authors}</p>
                    </div>
                </div>

                <div className="nc_state_affiliation">
                    <div className ="author-subheading">
                        <h3>NC STATE AFFILIATION</h3>
                    </div>
                    <div className ="paragraph">
                        <p>{data.affiliation}</p>
                    </div>
                </div>

                <div className="biography">
                    <div className ="author-subheading">
                        <h3>BIOGRAPHY</h3>
                    </div>
                    <div className ="paragraph">
                        <p>{data.biography}</p>
                    </div>
                </div>

                <div className="publishing_date">
                    <div className ="author-subheading">
                        <h3>PUBLISHING DATE</h3>
                    </div>
                    <div className ="paragraph">
                        <p>{new Date(data.date_published).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="genre">
                    <div className ="author-subheading">
                        <h3>GENRES</h3>
                    </div>
                    <div className ="paragraph">
                        <p>{genres.join(", ").toUpperCase()}</p>
                    </div>
                </div>

            </div>

            <div className="image-div">
                <img className="image1" src={data.main_image} alt="image 1" />
                <div className ="start-button">
                    <button onClick={setPlayActive}>
                        play
                    </button>
                </div>
                <div className='author-home-button'>
                    <button onClick={setCarouselActive}>
                        <img src={home_icon} alt="home icon" />
                    </button>
                </div>
            </div>

            <div className ="back-button">
                <button onClick={setInfoActive}>
                    INFORMATION PAGE
                </button>
            </div>
            <div className ="next-button">
                <button onClick={setMediaActive}>
                    GALLERY
                </button>
            </div>
        </div>
    );
}
export default AuthorPage