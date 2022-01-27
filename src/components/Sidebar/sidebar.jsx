import React from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineEmojiEvents } from 'react-icons/md'
import { CgProfile } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { AiOutlineHome } from 'react-icons/ai'

import './sidebarStyle.scss';

const Sidebar = () => {
    const Logout = () => {
        localStorage.setItem('prastuti-user', null);
        window.location.href = "/"
    }

    return (
        <div id="sidebar">
            <Link to='/'><h1 className='shadow-heading'>Prastuti '22</h1></Link>
            <Link to='/'><div className="option option-event"><AiOutlineHome className='icon'/>Home</div></Link>
            <Link to='/events'><div className="option option-event"><MdOutlineEmojiEvents className='icon'/>Events</div></Link>
            <Link to='/profile'><div className="option option-profile"><CgProfile className='icon'/>Profile</div></Link>
            <div onClick={Logout} className="option"> <FiLogOut className='icon'/> Sign Out</div>
        </div>
    )
}

export default Sidebar;