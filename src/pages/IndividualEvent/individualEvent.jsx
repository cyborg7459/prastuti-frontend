import React, { useEffect, useState } from 'react';
import {GiHamburgerMenu} from 'react-icons/gi'
import axios from 'axios';

import './individualEventStyle.scss';
import Loader from '../../components/Loader/loader';
import Sidebar from '../../components/Sidebar/sidebar';

const IndividualEvent = () => {
    const [user, setUser] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [showError, setShowError] = useState(false);
    const [event, setEvent] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [loaderText, setLoaderText] = useState('');

    const ShowLoaderWithMessage = (message) => {
        setLoaderText(message);
        setShowLoader(true);
    }

    const UpdateUser = (newUser) => {
        localStorage.setItem('prastuti-user', JSON.stringify(newUser));
        setUser(newUser);
        setIsRegistered(true);
    }

    const HandleRegister = () => {
        const event_id = event._id;
        const user_id = user._id;

        if(event.Team_Event) {
            window.location.href = `/team-register/${event.Name}`
        }
        else {
            ShowLoaderWithMessage(`Registering for ${event.Name}`)
            axios({
                method: 'POST',
                url: 'https://prastuti-backend.herokuapp.com/api/register',
                data: {
                    user_id,
                    event_id
                }
            }).then(res => {
                setShowLoader(false);
                UpdateUser(res.data.updatedUser);
            }).catch(err => {
                setShowLoader(false);
                console.log(err)
            })
        }
    }

    const HandleUnregister = () => {
        setLoaderText('Unregistering Team');
        setShowLoader(true);
        console.log('Unregistering for event');
        axios({
            method: 'POST',
            url: 'https://prastuti-backend.herokuapp.com/api/unregister',
            data: {
                eventID: event._id,
                userID: user._id
            }
        }).then(res => {
            setShowLoader(false);
            window.location.href = '/events'
        }).catch(err => {
            setShowLoader(false);
        })
    }

    useEffect(() => {
        let storedUser = localStorage.getItem('prastuti-user');
        if(!storedUser || storedUser === 'null') {
            window.location.href = '/login'
        }
        else {
            ShowLoaderWithMessage('Fetching Event Details');
            const storedUser = JSON.parse(localStorage.getItem('prastuti-user'));
            setUser(storedUser);
            const k = window.location.href.split('/');
            const eventName = k[k.length - 1];
            axios({
                method: 'GET',
                url: `https://prastuti-backend.herokuapp.com/api/event/${eventName}`
            }).then(res => {
                setShowLoader(false);
                const eventFromDB = res.data.event;
                    if(!eventFromDB) {
                        setShowError(true);
                    }
                    else {
                        const check = storedUser.Events_Participated.find(event => eventFromDB.Name === event.Name);
                        if(check) setIsRegistered(true);
                        setEvent(eventFromDB);
                    }
            }).catch(err => {
                console.log(err);
            })
        }
    }, [])

    return (
        <div id="individual-event-page">
            {
                showLoader ? <Loader text={loaderText}/> : null
            }
            <Sidebar />
            <GiHamburgerMenu onClick={() => {
                document.getElementById('sidebar').classList.toggle('display');
            }} className='menu-icon'/>
            <div id="event-container" className="page">
                {
                    showError ? ( <p>Could not find any such event</p> ) : null
                }
                {
                    event ? (
                        <div className='content'>
                            <div id="bg-card" style={{
                                background: `url(${event.CoverImg})`
                            }}>
                                <div className="overlay"></div>
                            </div>
                            <div id="front-card">
                                <h1 className='shadow-heading-2 size27'>{event.Name}</h1>
                                <h1 className='size12 subheading'>{event.Domain}</h1>
                                <p>{event.Description[0]}</p>
                                <p>{event.Description[1]}</p>
                                <p>
                                    <h3>Event Structure</h3>
                                    {event.Description[2]}
                                </p>
                                {
                                    isRegistered ? 
                                    (
                                        <div id='xa12'>
                                            <p className='msg'>
                                                You have already registered for this event
                                                <br />
                                                JOIN GROUP : <a href={event.WALink}>{event.WALink}</a> 
                                            </p>
                                            {
                                                event.Team_Event ? 
                                                (
                                                    <div onClick={HandleUnregister} className='button' id='unregister-btn'>Unregister</div>
                                                )
                                                : null
                                            }
                                        </div>
                                    )
                                    :
                                    ( <div onClick={HandleRegister} className="button">Register for {event.Name}</div> )
                                }
                            </div>
                        </div>
                    )
                    : null
                }
                
            </div>
        </div>
    )
}

export default IndividualEvent;