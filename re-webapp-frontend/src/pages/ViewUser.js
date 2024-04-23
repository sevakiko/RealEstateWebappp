import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Link } from "react-router-dom";
import "./css/ViewUser.css";

function ViewUser() {

  const navigate = useNavigate();

  let pageNumber = 0

  const username = localStorage.getItem("username")
  const [email, setEmail] = useState("");

  const fetchDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/email/${username}`);
      setEmail(response.data.email);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/")
      return
    }
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
    fetchDetails();
  }, []);

  return (
    <div className="view-user-wrapper">
      <div className="view-r-container">
        <h1 className="view-user-heading">Profile Page</h1>
        <p className="view-user-username">Username: {username}</p>
        <p className="view-user-email">Email: {email}</p>
        <Link to={`/user-listings/${username}/${pageNumber}`} className="view-listing-button">View Listings</Link>
      </div>
    </div>
  );
}

export default ViewUser;