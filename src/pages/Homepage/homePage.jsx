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
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt illo officiis iusto earum delectus molestias nulla, impedit voluptatum quaerat, dolorum aliquid tempora quia porro quasi voluptas esse magnam neque, reprehenderit quisquam! Labore id illo eveniet aliquid nam mollitia? Eveniet dolorem amet autem sed quasi iusto voluptas, asperiores, sapiente quos illum minus maxime at ducimus quis quam dolore expedita, sint aperiam quisquam voluptatibus neque sunt dignissimos consequatur error? Accusamus, animi deleniti? Numquam esse quas facilis sapiente ea earum? Possimus quis similique amet quo vero libero fugiat corrupti sit enim dolorum officia minima, omnis, velit aut nihil vel, reprehenderit fuga autem? At.
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
                        <p className='size13'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, facilis minima sunt consectetur cumque officiis hic labore? Reiciendis excepturi veritatis id architecto vel voluptate, inventore nobis amet cupiditate. Iure aliquam numquam ullam quaerat nostrum, voluptates minima atque consequuntur nesciunt! Deleniti minus assumenda id consequatur quo aliquam aliquid libero quae deserunt!
                            <br /><br />
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro dignissimos ab reprehenderit ipsa consequuntur, dicta quo iusto sit ratione nemo voluptatibus hic facere est dolorem molestias tempora voluptatem amet aspernatur consectetur? Iure eligendi ducimus dolore dolorem, laborum minus inventore magnam. Vero commodi obcaecati quasi voluptas harum expedita velit aliquid sequi.
                        
                        </p>
                    </Fade>
                </div>
            </div>
            <div id="footer">
                <img src={logo} alt="" />
                <p>
                    For more details, contact undersigned
                    <br />
                    Ayush Thakur : +91 99940 73229
                    <br />
                    Mohit : +91 70610 38336
                </p>
            </div>
        </div>
    )
}

export default Homepage;