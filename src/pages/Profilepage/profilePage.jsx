import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {GiHamburgerMenu} from 'react-icons/gi'
import axios from 'axios';

import './profileStyle.scss'
import Sidebar from '../../components/Sidebar/sidebar';
import Loader from '../../components/Loader/loader';

const PendingRequest = ({ request, ShowLoaderWithMessage, HideLoader, UpdateUser, userID }) => {
    const AcceptRequest = () => {
        ShowLoaderWithMessage('Accepting Request');
        axios({
            method: 'POST',
            url: 'https://prastuti-backend.herokuapp.com/api/request/accept',
            data: {
                requestId: request._id
            }
        }).then(res => {
            HideLoader();
            UpdateUser(res.data.updatedUser);
        }).catch(err => {
            HideLoader();
            console.log(err);
        })
    }

    const RejectRequest = () => {
        ShowLoaderWithMessage('Deleting Request');
        axios({
            method: 'DELETE',
            url: 'https://prastuti-backend.herokuapp.com/api/request',
            data: {
                requestId: request._id
            }
        }).then(res => {
            axios({
                method: 'GET',
                url: `https://prastuti-backend.herokuapp.com/api/user/${userID}`,
            }).then(res => {
                HideLoader();
                UpdateUser(res.data[0]);
            }).catch(err => {
                HideLoader();
                console.log(err);
            })
        }).catch(err => {
            HideLoader();
            console.log(err);
        })
    }

    return (
        <div className="pending-request">
            <img src={request.Req_From.Profile_Photo} alt='' />
            <div className="content">
                <h4>{request.Req_From.Name}</h4>
                <p className='size9'>{request.For_Team.Team_Name}</p>
                <div className="btns">
                    <div onClick={AcceptRequest} className="btn btn-accept">Accept</div>
                    <div onClick={RejectRequest} className="btn btn-reject">Reject</div>
                </div>
            </div>
        </div>
    )
} 

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [loaderText, setLoaderText] = useState('');

    const ShowLoaderWithMessage = (message) => {
        setLoaderText(message);
        setShowLoader(true);
    }

    const HideLoader = () => {
        setShowLoader(false);
    }

    const UpdateUser = (newUser) => {
        setUser(newUser);
        localStorage.setItem('prastuti-user', JSON.stringify(newUser));
    }

    useEffect(() => {
        const profileBtn = document.getElementsByClassName('option-profile');
        profileBtn[0].classList.add('active');

        let storedUser = localStorage.getItem('prastuti-user');
        if(!storedUser || storedUser === 'null' || storedUser === undefined || storedUser === 'undefined') window.location.href = "/login";
        else {
            storedUser = JSON.parse(storedUser);
            setLoaderText('Fetching user details');
            setShowLoader(true);
            axios({
                method: 'GET',
                url: `https://prastuti-backend.herokuapp.com/api/user/${storedUser._id}`
            })
            .then(res => {
                setShowLoader(false);
                console.log(res.data[0]);
                localStorage.setItem('prastuti-user', JSON.stringify(res.data[0]));
                setUser(res.data[0]);
            })
            .catch(err => {
                setUser(storedUser);
                console.log(err);
            })
        }
        
    }, [])
    return (
        <div id="profile-page">
            <Sidebar/>
            <GiHamburgerMenu onClick={() => {
                document.getElementById('sidebar').classList.toggle('display');
            }} className='menu-icon'/>
            {
                showLoader ? ( <Loader text={loaderText}/>) : null
            }
            <div className="page">
                <div id="back-card">
                    <div className="overlay"></div>
                </div>
                {
                    user ? 
                    (
                        <div id="front-card">
                            <div className="top">
                                <img alt='' src={user.Profile_Photo} id='profilepic'/>
                                <div>
                                    <h1>{user.Name}</h1>
                                    <p>{user.email_id}</p>
                                </div>
                            </div>
                            <h3>Events Registered</h3>
                            {
                                user.Events_Participated.length===0 
                                ? ( <p> You haven't registered for any event</p>)
                                : 
                                (
                                    <div>
                                        {
                                            user.Events_Participated.map(event => {
                                                return (
                                                    <div key={event._id} className="team-display">
                                                        {event.Name} - 
                                                        <a href={event.WALink}> Join Whatsapp Group</a> 
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                            <h3>Teams</h3>
                            {
                                user.Teams.length===0 
                                ? ( <p> You aren't a part of any team</p>)
                                : 
                                (
                                    <div>
                                        {
                                            user.Teams.map(team => {
                                                return (
                                                    <div key={team._id} className="team-display">
                                                        {team.Team_Name} -
                                                        <Link to={`/team/${team.slug}`}> go to team page</Link> 
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    
                                )
                            }
                            <Link to='/create-team'><div className="team-btn">Create New Team</div></Link>
                            <h3>Pending Requests</h3>
                            {
                                user.Pending_Requests.length===0 
                                ? ( <p> No pending requests</p>)
                                : 
                                (
                                    <div>
                                        {
                                            user.Pending_Requests.map(request => {
                                                return (
                                                    <PendingRequest 
                                                        key={request._id} 
                                                        request={request} 
                                                        ShowLoaderWithMessage={ShowLoaderWithMessage}
                                                        HideLoader={HideLoader}
                                                        UpdateUser={UpdateUser}
                                                        userID={user._id}
                                                    />
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        </div>
                    )
                    : null
                }
                
            </div>
        </div>
    )
}

export default ProfilePage;