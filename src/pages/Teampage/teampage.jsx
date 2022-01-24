import React, { useEffect, useState } from 'react';
import {GiHamburgerMenu} from 'react-icons/gi'
import axios from 'axios';

import './teampageStyle.scss';
import Sidebar from '../../components/Sidebar/sidebar';
import Loader from '../../components/Loader/loader';

const InviteForm = ({members, userID, teamID, ShowLoaderWithMessage, HideLoader, UpdateTeam}) => { 
    const [emailList, setEmailList] = useState([]);

    const SendRequest = () => {
        const mail = document.getElementById('invite-mail').value.trim();
        let check = emailList.find(email => email === mail);
        if(!check) {
            alert('User with given email does not exist');
            return;
        }
        check = members.find(member => member.email_id === mail)
        if(check) {
            alert('Given user is already in the team')
            return;
        }
        else {
            ShowLoaderWithMessage('Sending Request');
            axios({
                method: 'POST',
                url: 'https://prastuti-backend.herokuapp.com/api/request',
                data: {
                    user_id: userID,
                    team_id: teamID,
                    recepient_email: mail
                }
            }).then(res => {
                HideLoader();
                const { updatedTeam } = res.data;
                UpdateTeam(updatedTeam);
                document.getElementById('invite-mail').value = "";
            }).catch(err => {
                HideLoader();
                console.log(err);
            })
        }
    }

    useEffect(() => {
        axios({
            method: 'GET',
            url: 'https://prastuti-backend.herokuapp.com/api/users/emails/all'
        }).then(res => {
            setEmailList(res.data.data);
        }).catch(err => {
            console.log(err);
        })
    }, []);

    return (
        <div id="invite-form">
            <h3>Invite members to your team</h3>
            <input type="text" id='invite-mail' placeholder='Enter user email' />
            <div onClick={SendRequest} className="btn-invite">Invite</div>
        </div>
    )
}

const TeamMember = ({ member }) => {
    return (
        <div className="team-member">
            <img src={member.Profile_Photo} alt=''/>
            <div className="member-details">
                <h3>{member.Name}</h3>
                <p>{member.email_id}</p>
            </div>
        </div>
    )
}

const Teampage = () => {
    const [showError, setShowError] = useState(false);
    const [showLoader, setShowLoader] = useState(true);
    const [loaderMessage, setLoaderMessage] = useState('');
    const [team, setTeam] = useState(null);
    const [user, setUser] = useState(null);
    const [showInvite, setShowInvite] = useState(false);

    const ShowLoaderWithMessage = (message) => {
        setLoaderMessage(message);
        setShowLoader(true);
    }

    const HideLoader = () => {
        setShowLoader(false);
    }

    const UpdateTeam = (team) => {
        setTeam(team);
    }

    useEffect(() => {
        let storedUser = localStorage.getItem('prastuti-user');
        if(!storedUser || storedUser === 'null') {
            window.location.href = '/login'
        }
        else {
            storedUser = JSON.parse(storedUser);
            setUser(storedUser);
            setLoaderMessage('Fetching team details');
            setShowLoader(true);

            let url = window.location.href.split('/');
            const slug = url[url.length - 1];

            axios({
                method: 'GET',
                url: `https://prastuti-backend.herokuapp.com/api/team/${slug}`
            }).then(res => {
                setShowLoader(false);
                if(!res.data.team || res.data.team === null) {
                    setShowError(true);
                }
                else {
                    setTeam(res.data.team);
                    const check = res.data.team.Members.find(member => member.email_id === storedUser.email_id);
                    if(check) setShowInvite(true);
                    else setShowInvite(false);
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, [])

    return (
        <div id="team-page">
            {
                showLoader ? <Loader text={loaderMessage} /> : null
            }
            <GiHamburgerMenu onClick={() => {
                document.getElementById('sidebar').classList.toggle('display');
            }} className='menu-icon'/>
            <Sidebar />
            <div className="page">
                {
                    showError ? 
                    ( <p>No such team exists</p> )
                    : 
                    (
                        <div className="content">
                            <div id="back-card">
                                <div className="overlay"></div>
                            </div>
                            {
                                team ?
                                (
                                    <div id="front-card">
                                        <h1 className='shadow-heading-2 size25'>{team.Team_Name}</h1>
                                        {
                                            team.Member_Count < 3 && showInvite && team.Events_Participated.length === 0 ?
                                            (
                                                <InviteForm 
                                                    members={team.Members}
                                                    userID={user._id} 
                                                    teamID={team._id} 
                                                    ShowLoaderWithMessage={ShowLoaderWithMessage}
                                                    HideLoader={HideLoader}
                                                    UpdateTeam={UpdateTeam}
                                                />
                                            )
                                            : null
                                        }
                                        <div className="team-content">
                                            <h2>Team Members</h2>
                                            {
                                                team.Members.map(member => (
                                                    <TeamMember key={member._id} member={member}/>
                                                ))
                                            }
                                            <h2>Pending Requests</h2>
                                            {
                                                team.Pending_Requests.length === 0 ?
                                                ( <p>No Pending Requests</p> )
                                                : null
                                            }
                                            {
                                                team.Pending_Requests.map(request => (
                                                    <TeamMember key={request._id} member={request.Req_to}/>
                                                ))
                                            }
                                            <h2>Events Registered</h2>
                                            {
                                                team.Events_Participated.length===0 
                                                ? ( <p> Team has not registered for any event</p>)
                                                : 
                                                (
                                                    <div>
                                                        {
                                                            team.Events_Participated.map(event => {
                                                                return (
                                                                    <div key={event._id} className="team-display">
                                                                        {event.Name}
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                                : null
                            }
                        </div>
                    )
                }
                
                
                
            </div>
        </div>
    )
}

export default Teampage;
