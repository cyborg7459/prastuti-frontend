import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './teamRegisterStyle.scss';
import Loader from '../../components/Loader/loader';

const TeamRegister = () => {
    const [user, setUser] = useState(null);
    const [event, setEvent] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    const RegisterForEvent = () => {
        const opt = document.getElementById('team-selected');
        const team = opt.options[opt.selectedIndex];
        const team_id = team.getAttribute('teamid');
        const user_id = user._id;
        const event_name  = event;
        const data = {
            team_id,
            user_id,
            event_name
        }
        console.log(data);
        setShowLoader(true);
        axios({
            method: 'POST',
            url: 'https://prastuti-backend.herokuapp.com/api/register/team',
            data
        }).then(res => {
            setShowLoader(false);
            console.log(res.data);
            if(res.data.message === "Team registered successfully") {
                localStorage.setItem('prastuti-user', JSON.stringify(res.data.updatedUser));
                setUser(res.data.updatedUser);
                window.location.href = `/events`
            }
            else {
                alert(res.data.message);
            }
        }).catch(err => {
            setShowLoader(false);
            console.log(err);
        })
    }

    useEffect(() => {
        let url = window.location.href.split('/');
        const eventName = url[url.length - 1];
        if(eventName !== 'HackOverflow' && eventName !== 'Consilium') {
            window.location.href = '/events'
        }
        else {
            setEvent(eventName);
            let storedUser = localStorage.getItem('prastuti-user');
            if(!storedUser || storedUser === 'null' || storedUser === 'undefined' || storedUser === undefined) {
                window.location.href = '/login'
            }
            else {
                storedUser = JSON.parse(storedUser);
                setUser(storedUser);
            }
        }
    }, [])

    return (
        <div id="team-register">
            {
                showLoader ? <Loader text={`Registering for ${event}`}/> : null
            }
            <div className="overlay">
                {
                    user ? (
                        <div className="card">
                            <div className="card-heading">
                                <h1>Register for {event}</h1>
                            </div>
                            {
                                user.Teams.length > 0 ?
                                (
                                    <div>
                                        <h2>Choose an Existing Team</h2>
                                        <select id='team-selected'>
                                            {
                                                user.Teams.map(team => (
                                                    <option teamid={team._id} key={team._id} value={team.Team_Name}>{team.Team_Name}</option>
                                                ))
                                            }
                                        </select>
                                        <div onClick={RegisterForEvent} className="btn">Register</div>
                                        {/* <p className="error-msg">
                                            <strong>DISCLAIMER : </strong> Make sure this team is final. Once you've registered, you cannot add any more members in the team
                                        </p> */}
                                        <h2 style={{marginTop: "25px"}}>OR</h2>
                                    </div>
                                )
                                : null
                            }
                            
                            <Link to='/create-team'>
                                <div className='new-team-link'>Want to register with a new team? Click Here</div>
                            </Link>
                        </div>
                    )
                    : null
                }
            </div>
        </div>
    )
}

export default TeamRegister;