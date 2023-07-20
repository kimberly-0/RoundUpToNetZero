import React from 'react';
import { FaBell } from 'react-icons/fa';

function Header() {
    return (
        <div className='header'>
            <div className='header__title'>
                <img />
                <h1>Round Up to Net Zero</h1>
            </div>
            <p><FaBell /></p>
        </div>
    )
}

export default Header;