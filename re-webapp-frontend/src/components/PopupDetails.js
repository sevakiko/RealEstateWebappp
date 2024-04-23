import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./css/PopupDetails.css"

export default function PopupDetails({ onClose, id, title, description, price, imageData }) {
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/details/${id}`);
            setAddress(response.data.address);
            setLatitude(response.data.latitude);
            setLongitude(response.data.longitude);
            setUsername(response.data.username);
            setEmail(response.data.email);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [])

    return (
        <div className="popup listing-details-popup">
            <div className="popup-content">
                <div className='listing-details-text'>Listing Details!</div>
                <hr />
                <div className='listing-details'>
                    <div className='listing-image'>
                        {/* Add your image here */}
                    </div>
                    <div className='listing-info'>
                        <div className='listing-title'><strong>Title:</strong> {title}</div>
                        <div className='listing-description'><strong>Description:</strong> {description}</div>
                        <div className='listing-price'><strong>Price:</strong> {price}</div>
                        <div className='listing-address'><strong>Address:</strong> {address}</div>
                        <div className='listing-latitude'><strong>Latitude:</strong> {latitude}</div>
                        <div className='listing-longitude'><strong>Longitude:</strong> {longitude}</div>
                        <div className='user-info'>
                            <div className='user-username'><strong>Username:</strong> {username}</div>
                            <div className='user-email'><strong>Email:</strong> {email}</div>
                        </div>
                    </div>
                </div>
                <div className='btns detail-btns'>
                    <button type="button" className="btn btn-dark close-btn" onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );

}