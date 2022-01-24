import React from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-tilt';

import './eventCardStyle.scss'

const EventCard = ({event}) => {
    return (
        <Tilt options={{ max: 2, scale: 1.005, perspective: 2000}}>
            <div id="event-card">
                <img src={event.CardImg} alt="card" />
                <div className="content">
                    <h1><Link to={`/event/${event.Name}`}>{event.Name}</Link></h1>
                    <h2 className='size11'>{event.Domain}</h2>
                    <p>
                        {event.Description[0]}
                    </p>
                    <hr />
                    <div className="footer">
                        {event.Participants_Count} people registered
                        <Link to={`/event/${event.Name}`}><div>Read More...</div></Link>
                    </div>
                </div>
            </div>
        </Tilt>
    )
}

export default EventCard;