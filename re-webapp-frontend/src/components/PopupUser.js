import React from 'react'
import { useNavigate } from 'react-router-dom';

import "./css/Popup.css"

export default function PopupUser({ onClose, setAuthenticated, username }) {

  const navigate = useNavigate();

  //Go to /ViewUser
  const handleViewProfile = () => {
    navigate('/profile');
    onClose();
  };

  //Go to /AddListing
  const handleAddListing = () => {
    navigate('/add-listing');
    onClose();
  };

  //On log out press
  const logout = () => {
    localStorage.clear()
    setAuthenticated(false)
    onClose();
    window.location.href = "/";
  }

  return (
    <div className="popup user-popup">
      <div className='login-text'>{username}</div>
      <hr />
      <div className="popup-content user-popup-content">
        <div>
          <button type="button" className="btn btn-dark login-btn" onClick={handleViewProfile}>
            View Profile
          </button>
        </div>
        <div>
          <button type="button" className="btn btn-dark login-btn" onClick={handleAddListing}>
            Add Listing
          </button>
        </div>
        <div><button type="button" className="btn btn-dark login-btn" onClick={logout}>Log Out</button></div>
        <div><button type="button" className="btn btn-dark close-btn" onClick={onClose}>Close</button></div>
      </div>
    </div>
  )
}
