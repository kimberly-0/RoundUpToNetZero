import React from 'react';
import { FaBell } from 'react-icons/fa';

function Header() {
    return (
        <header className='header'>
            <div className='header__title-box'>
                <p className='logo'>0</p>
                <h1 className='title'>Round Up to <span className='highlighted'>Net</span> Zero</h1>
            </div>
            <button className='notifications-button'><FaBell /></button>
        </header>
    )
}

export default Header;