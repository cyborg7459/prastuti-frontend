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
            console.log(user);
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
                    Prastuti is the Annual Technical Festival of the Department of Electrical Engineering, IIT (BHU), Varanasi. It takes pride in being the longest-running departmental fest in the institute. Started in 2001, Prastuti has grown over the years in stature and has made its impact nationwide.
                    <br /><br />
The objective of Prastuti is the growth of research impulses and inculcation of analytical and innovative streak amongst students of technical institutions. We enlarged our perspective and launched numerous new events, embracing multifarious walks of the technical and professional world.
                    </p>
                </div>
            </div>
            <div id="right">
                <img src={loginImg} alt="login" />
                <GoogleLogin
                    clientId="937290168286-gsklm7k0r1mb93963t26lgso2fbt5dn3.apps.googleusercontent.com"
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