import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import "./css/AddListing.css"

function AddListing({ authenticated, username }) {

    const navigate = useNavigate();

    const [image, setImage] = useState(null);

    const setMessage = (message) => {
        document.querySelector(".message-label").textContent = message
    };

    const getTitle = () => {
        return document.getElementById("title").value
    };

    const getDescription = () => {
        return document.getElementById("description").value
    };

    const getAddress = () => {
        return document.getElementById("address").value
    };

    const getPrice = () => {
        return document.getElementById("price").value
    };

    const getLatitude = () => {
        return document.getElementById("latitude").value
    };

    const getLongitude = () => {
        return document.getElementById("longitude").value
    };

    const handleClose = () => {
        navigate("/")
    };

    const handleListingAddition = async (e) => {
        e.preventDefault()
        try {
            /* make request */
            const response = await axios.post("http://localhost:8080/add-listing", {
                username: localStorage.getItem("username"),
                title: getTitle(),
                description: getDescription(),
                address: getAddress(),
                price: parseFloat(getPrice()),
                latitude: parseFloat(getLatitude()),
                longitude: parseFloat(getLongitude()),
                imageData: image
            })
            handleClose()
        }
        catch (ex) {
            console.log(ex);
            setMessage("Unable to Add Listing. Try again in another millenia.")
        }
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = () => {
            const imageData = reader.result;
            setImage(imageData);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div className='add-listing-wrapper'>
            <div className='title-label'>Please Insert Listing Info</div>
            <hr></hr>
            <form onSubmit={(e) => handleListingAddition(e)}>
                <div className="text-input">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input placeholder="Title" type="text" className="form-control" id="title" required />
                </div>
                <div className="text-input-description">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea placeholder="Description" type="text" className="form-control-description" id="description" required />
                </div>
                <div className="text-input">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input placeholder="Address" type="text" className="form-control" id="address" required />
                </div>
                <div className="text-input">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input placeholder="Price" type="text" className="form-control" id="price" required />
                </div>
                <div className="text-input">
                    <label htmlFor="latitude" className="form-label">Latitude</label>
                    <input placeholder="Latitude" type="text" className="form-control" id="latitude" required />
                </div>
                <div className="text-input">
                    <label htmlFor="longitude" className="form-label">Longitude</label>
                    <input placeholder="Longitude" type="text" className="form-control" id="longitude" required />
                </div>
                <div className="image-input">
                    <label htmlFor="image_data" className="form-label">ImageData</label>
                    <div>
                        <input
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>
                </div>
                <div>
                    <label className="message-label" id="message-label"></label>
                </div>
                <div className="button-container">
                    <button type="submit" className="btn btn-dark register-btn">Add Listing</button>
                    <button type="button" className="btn btn-dark close-btn" onClick={handleClose}>Cancel</button>
                </div>

            </form>
        </div>
    );
}

export default AddListing;