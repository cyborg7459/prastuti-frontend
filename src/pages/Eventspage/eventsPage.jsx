import React, { useEffect, useState } from 'react';
import {GiHamburgerMenu} from 'react-icons/gi'
import axios from 'axios';

import './eventsStyle.scss';
import Sidebar from '../../components/Sidebar/sidebar';
import Loader from '../../components/Loader/loader';
import EventCard from '../../components/EventCard/eventCard';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    
    useEffect(() => {
        let storedUser = localStorage.getItem('prastuti-user');
        if(!storedUser || storedUser === 'null') {
            window.location.href = '/login'
        }
        const eventBtn = document.getElementsByClassName('option-event');
        eventBtn[0].classList.add('active');

        axios({
            method: 'GET',
            url: 'https://prastuti-backend.herokuapp.com/api/events'
        }).then(res => {
            setShowLoader(false);
            setEvents(res.data.events);
        }).catch(err => {
            console.log(err)
        });
    }, [])
    return (
        <div id="event-page">
            {
                showLoader ? <Loader text='Fetching events'/> : null 
            }
            <Sidebar />
            <GiHamburgerMenu onClick={() => {
                document.getElementById('sidebar').classList.toggle('display');
            }} className='menu-icon'/>
            <div id="event-cards-container" className='page'>
                {
                    events.map(event => {
                        return (
                            <EventCard key={event._id} event={event}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EventsPage;