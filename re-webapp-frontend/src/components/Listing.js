import React from 'react';
import './css/Listing.css';

const Listing = ({ listing, setPopupDetails, setId, setTitle, setDescription, setPrice, setImageData }) => {

    const openPopupDetails = () => {
        setId(listing.id);
        setTitle(listing.title);
        setDescription(listing.description);
        setPrice(listing.price);
        setImageData(listing.imageData);
        setPopupDetails(true);
    };

    return (
        <div className="listing-item">
            <h2>{listing.title}</h2>
            <div className="image-container">
                <img src={listing.imageData} alt={listing.title} />
            </div>
            <p>{listing.description}</p>
            <button onClick={openPopupDetails} className='btn lighter-btn'>View Details</button>
        </div>
    );
};

export default Listing;
