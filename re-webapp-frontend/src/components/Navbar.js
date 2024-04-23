import React from 'react';
import "./css/Navbar.css"

export default function Navbar({ authenticated, username, setPopupUser }) {

    const openPopupUser = () => {
        setPopupUser(true);
    };

    return (
        <nav className={`navbar ${authenticated ? 'navbar-auth' : ''}`}>
            <a href="/" className='company-name'>Real Estate Web App</a>
            {authenticated ? (
                <div className='profile'>
                    <span onClick={openPopupUser} ><img className='profile-pic' src="/img/default_user_image.png" alt="Profile" /></span>
                </div>
            ) : (
                <></>
            )}

        </nav>
    )
}
