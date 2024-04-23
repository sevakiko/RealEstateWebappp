import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Navbar from './components/Navbar'
import PopupRegister from './components/PopupRegister'
import PopupLogin from './components/PopupLogin'
import PopupUser from './components/PopupUser'
import Home from './pages/Home'
import ViewUser from './pages/ViewUser'
import ViewUserListing from './pages/ViewUserListing'
import AddListing from './pages/AddListing'
import ViewListings from './pages/ViewListings'
import PopupDetails from './components/PopupDetails.js';

function App() {

  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('Username');

  /* popups */
  const [popupLogin, setPopupLogin] = useState(false);
  const [popupRegister, setPopupRegister] = useState(false);
  const [popupUser, setPopupUser] = useState(false);
  const [popupDetails, setPopupDetails] = useState(false);

  /* for popup details */
  const [id, setId] = useState(0)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState(0)
  const [imageData, setImageData] = useState("")

  const closePopupLogin = () => {
    setPopupLogin(false);
  }

  const closePopupRegister = () => {
    setPopupRegister(false);
  }

  const closePopupUser = () => {
    setPopupUser(false);
  }

  const closePopupDetails = () => {
    setPopupDetails(false);
  }

  /** check if valid token already exists */
  const checkToken = async () => {
    /** check if token exists in local storage */
    if (!localStorage.getItem('token')) { return }
    try {
      /** check if token is valid */
      const response = await axios.post("http://localhost:8080/home", {
        token: localStorage.getItem('token')
      })

      if (response.data.errorCode === null) {
        /** apply jwtoken to all http requests (resets after reload) */
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
        setUsername(localStorage.getItem('username'))
        setAuthenticated(true)
      }
    }
    catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    checkToken();
  }, [])

  return (
    <>
      <div className="App">
        <div className="overlay" />
        <Navbar authenticated={authenticated} username={username} setPopupUser={setPopupUser} />
        <Router>
          {popupLogin && (<PopupLogin onClose={closePopupLogin} setAuthenticated={setAuthenticated} setUsername={setUsername} />)}
          {popupRegister && (<PopupRegister onClose={closePopupRegister} setAuthenticated={setAuthenticated} setUsername={setUsername} />)}
          {popupUser && (<PopupUser onClose={closePopupUser} setAuthenticated={setAuthenticated} username={username} />)}
          {popupDetails && (<PopupDetails onClose={closePopupDetails} id={id} title={title} description={description} price={price} imageData={imageData} />)}

          {popupLogin || popupRegister || popupUser || popupDetails ? (<div className="overlay-popup" />) : null}
          <Routes>
            <Route
              path="/"
              element={<Home authenticated={authenticated} setPopupLogin={setPopupLogin} setPopupRegister={setPopupRegister} username={username} />}
            />
            <Route
              path="/profile"
              element={<ViewUser />}
            />
            <Route
              path="/results/:query/:pageNumber"
              element={<ViewListings setPopupDetails={setPopupDetails} setId={setId} setTitle={setTitle} setDescription={setDescription} setPrice={setPrice} setImageData={setImageData} />}
            />
            <Route
              path="/user-listings/:username/:pageNumber"
              element={<ViewUserListing setPopupDetails={setPopupDetails} setId={setId} setTitle={setTitle} setDescription={setDescription} setPrice={setPrice} setImageData={setImageData} />}
            />
            <Route
              path="/add-listing"
              element={<AddListing />}
            />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App;
