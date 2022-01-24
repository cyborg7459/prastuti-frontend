import React, { useEffect, useState } from 'react';
import axios from 'axios';
import slugify from 'slugify';

import './createTeamStyle.scss';
import Loader from '../../components/Loader/loader';

const CreateTeam = () => {
    const [teams, setTeams] = useState([]);
    const [user, setUser] = useState(null);
    const [showLoader, setShowLoader] = useState(false);

    const UpdateUser = (newUser) => {
        localStorage.setItem('prastuti-user', JSON.stringify(newUser));
        setUser(newUser);
    }

    const CreateNewTeam = () => {
        let name = document.getElementById('team-name').value.trim();
        let nameSlug = slugify(name, {
            lower: true
        })
        if(name === "") alert('Enter a valid name');
        else {
            const check = teams.find(team => team === nameSlug);
            if(check) alert('Team with this name already exists. Choose another name');
            else {
                setShowLoader(true);
                axios({
                    method: 'POST',
                    url: 'https://prastuti-backend.herokuapp.com/api/team',
                    data: {
                        team_name: name,
                        userID: user._id
                    }
                })
                .then(res => {
                    setShowLoader(false);
                    UpdateUser(res.data.data.updatedUser);
                    window.location.href = `/team/${res.data.data.newTeam.slug}`
                })
                .catch(err => {
                    setShowLoader(false);
                    console.log(err)
                });
            }
        }
    }

    useEffect(() => {
        let storedUser = localStorage.getItem('prastuti-user');
        if(!storedUser || storedUser === 'null') {
            window.location.href = '/login';
        }
        else {
            storedUser = JSON.parse(storedUser);
            setUser(storedUser);
            axios({
                method: 'GET',
                url: 'https://prastuti-backend.herokuapp.com/api/teams'
            })
            .then(res => {
                setTeams(res.data.teamNames);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }, []);

    return (
        <div id="create-team">
            {
                showLoader ? ( <Loader text='Creating new team' />) : null
            }
            <div className="overlay">
                <div className="card">
                    <div className="card-heading">
                        <h1>Create a New Team</h1>
                        
                    </div>
                    <input id='team-name' type="text" placeholder='Enter unique team name' />
                    <div onClick={CreateNewTeam} className="btn">Create Team</div>
                </div>
            </div>
        </div>
    )
}

export default CreateTeam;