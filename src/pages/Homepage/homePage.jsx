import React, { useEffect, useState } from 'react';
import Fade from 'react-reveal/Fade'
import { Link } from 'react-router-dom';

import './homeStyle.scss'
import bgvideo from '../../gallery/bgvideo.mp4'
import logo from '../../gallery/main-logo.png'

const Homepage = () => {
    const [isUser, setUser] = useState(false);
    useEffect(() => {
        let storedUser = localStorage.getItem('prastuti-user');
        if(storedUser && storedUser !== 'null' && storedUser !== 'undefined' && storedUser !== undefined) {
            setUser(true);
        }
    }, []);
    return (
        <div className="homepage page-outer">
            <div id="dashboard">
                <video id='home-video' muted autoPlay src={bgvideo}></video>
                <div className="overlay"></div>
                <Fade duration={2000}>
                    <div className="content">
                        <h1 className='size45 shadow-heading'>Prastuti '22</h1>
                        <p className='size18'>Department of Electrical Engineering, IIT (BHU) Varanasi</p>
                        <div className="description size10">
                        Electrical Department of IIT (BHU) Varanasi presents PRASTUTI, the annual technical festival that echoes the spirit of innovation and progress! This gives you a chance to get your feet wet in a wide array of domains, ranging from image processing and simulation to web development and designing circuits. Whether you're a newbie or a know-it-all, Prastuti is here to soak you in its technical extravaganza. With stellar workshops straight from the experts, the seeds of understanding sprout in your mind, which are further watered by the electrifying competitions with handsome prizes! This not only helps polish your engineering prowess but gives you a first-hand experience of the modern industry requirements. Moreover, there are some iconic Guest talks to blow your mind and to keep the flames of advancement ignited! So, are you ready to reconstruct the era of a technological renaissance with Prastuti'22?
                        </div>
                    </div>
                </Fade>
                <Fade bottom duration={2000}>
                    <div className='size14' id="login-btn">
                        {
                            isUser ?
                            (<Link to='/profile'>Dashboard</Link>    ) :
                            (<Link to='/login'>Login</Link>    )    
                        }               
                    </div>
                </Fade>
            </div>
            <div id="about">
                <div className="overlay shadow-heading">
                    <Fade duration={1000}>
                        <h1 className='size40'>About Us</h1>
                        <p>
                            Prastuti was started as an All India Students’ Paper Presentation contest organized by the Electrical Engineering Society (EES) in 2001. It was Prof. S.N. Mahendra’s pioneering design that materialized the idea of Prastuti as an event.
                            <br /><br />
                            Since then, Prastuti has grown in eminence and, through its nationwide notability, has impacted many curious minds. The primary intention behind organizing Prastuti is to stimulate research instincts and instill an analytical spirit amongst the scholars of various technical institutes.
                            <br /><br />
                            Over the years, as technology has developed, we also expanded our horizons. We give all the young minds a first-hand experience of the fast-paced technological world by conducting new advanced events.
The Electrical Engineering department of IIT (BHU), Varanasi, following its glorious legacy, proudly presents the 20th iteration of its annual fiesta from April 15th to April 17th, 2022. This year, Prastuti emerges to be better than ever by putting forward a series of innovative competitions in Power Electronics, Digital Electronics, Cryptography, DSA, Software Development, Artificial Intelligence and Machine Learning, thereby taking you through the technological renaissance
                        </p>
                    </Fade>
                </div>
            </div>
            <div id="footer">
                <img src={logo} alt="" />
                <p>
                    For more details, contact undersigned
                    <br />
                    Ayush Thakur : +91 93340 73229
                    <br />
                    Mohit : +91 70610 38336
                </p>
            </div>
        </div>
    )
}

export default Homepage;