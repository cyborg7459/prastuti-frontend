import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

import './loginStyle.scss'
import loginImg from '../../gallery/login.png'
import Loader from '../../components/Loader/loader';

const CollegeForm = ({ user, setUserInLocalStorage, showLoaderWithMessage, hideLoader }) => {
    const UpdateCollege = () => {
        console.log(user);
        let college = document.getElementById('college-name').value.trim();
        if(college === '') {
            alert('Please enter valid name');
            return;
        }
        else {
            showLoaderWithMessage('Updating user details');
            axios({
                method: 'PUT',
                url: `https://prastuti-backend.herokuapp.com/api/user/${user._id}`,
                data: {
                    College: college
                }
            }).then((res) => {
                hideLoader();
                setUserInLocalStorage(res.data);
            }).catch(err => {
                hideLoader();
                console.log(err);
            })
        }
    }

    return (
        <div id="college-form">
            <div className="overlay">
                <div id="card">
                    It appears you are signing in for the first time !!
                    <br /> Please Enter your college name to proceed
                    <input id='college-name' type="text" placeholder='Enter college name' />
                    <div onClick={UpdateCollege} className='btn'>Submit</div>
                </div>
            </div>
        </div>
    )
}

const Loginpage = () => {
    const [showLoader, setShowLoader] = useState(false);
    const [loaderText, setLoaderText] = useState('');
    const [form, setForm] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('prastuti-user');
        if(storedUser && storedUser !== 'null') {
            window.location.href = '/profile'
        }
    })

    const showLoaderWithMessage = (message) => {
        setLoaderText(message);
        setShowLoader(true);
    }

    const hideLoader = () => {
        setShowLoader(false);
    }

    const setUserInLocalStorage = (user) => {
        localStorage.setItem('prastuti-user', JSON.stringify(user));
        window.location.href = '/profile'
    }

    const responseGoogleSuccess = (response) => {
        setLoaderText('Signing in');
        setShowLoader(true);
        const { tokenId } = response;
        axios({
            method: 'POST',
            url: 'https://prastuti-backend.herokuapp.com/api/login',
            data: {
                tokenId
            }
        }).then((res) => {
            setShowLoader(false);
            let user = res.data;
            if(user.isNew) {
                setUser(user.user);
                setForm(true);
            }
            else {
                setUserInLocalStorage(user.user);
            }
        }).catch((err) => {
            setShowLoader(false);
            console.log(err);
        }) 
    }
    const responseGoogleError = (error) => {
        console.log(error);
        alert('There was some error !! Please try again');
    }
    return (
        <div id="login-page" className="page-outer">
            {
                showLoader ? <Loader text={loaderText}/> : null
            }
            {
                form ? <CollegeForm 
                    user={user} 
                    setUserInLocalStorage={setUserInLocalStorage}
                    showLoaderWithMessage={showLoaderWithMessage}
                    hideLoader={hideLoader}    
                /> : null
            }
            <div id="left">
                <div className="overlay">
                    <h1 className='size34 shadow-heading'>Welcome to Prastuti</h1>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero fugiat ea ipsam ut odit pariatur nostrum sint exercitationem deleniti repellat numquam eos nam perspiciatis ratione facilis nobis vel, illum porro dolores reiciendis aliquam! Facere tempora, nemo deleniti esse laboriosam necessitatibus neque ea in consectetur, eius odit fuga ipsa cum quas.
                    </p>
                </div>
            </div>
            <div id="right">
                <img src={loginImg} alt="login" />
                <GoogleLogin
                    clientId="937290168286-onq4222sbjehp0g8srh2ir92k0eg3e6r.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleError}
                    cookiePolicy={'single_host_origin'}
                    id='google-btn'
                />
            </div>
        </div>
    )
}

export default Loginpage;