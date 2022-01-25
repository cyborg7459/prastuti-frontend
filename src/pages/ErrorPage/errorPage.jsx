import React from 'react';

import './errorStyle.scss';
import errorImg from '../../gallery/pageerror.jpg'

const ErrorPage = () => {
    return (
        <div id="error-page">
            <img src={errorImg} alt="page_not_found" />
            <h1>Page not found</h1>
        </div>
    )
}

export default ErrorPage;