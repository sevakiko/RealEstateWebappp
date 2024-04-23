import React from 'react'
import axios from 'axios'
import "./css/Popup.css"

export default function PopupLogin({ onClose, setAuthenticated, setUsername }) {

    const setMessage = (message) => {
        document.querySelector(".message-label").textContent = message
    };

    const getUsername = () => {
        return document.getElementById("username").value
    };

    const getPassword = () => {
        return document.getElementById("password").value
    };

    /* login */
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            /* make request */
            const response = await axios.post("http://localhost:8080/login", {
                username: getUsername(),
                password: getPassword()
            })

            if (response.data.errorCode === null) {
                /* save jwtoken in local storage to preserve it after page reloads etc */
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', getUsername())
                /* apply jwtoken to all http requests (resets after reload) */
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                setUsername(getUsername())
                setAuthenticated(true)
                onClose()
                return
            }

            /* handle error */
            switch (response.data.errorCode) {
                case "AUTH_FAIL":
                    setMessage("Incorect Username or Password")
                    break;
                case "INTERNAL_ERROR":
                    setMessage("Internal Error")
                    break;
                default:
                    setMessage("Unknow Error")
                    break;
            }
        }
        catch (ex) {
            setMessage("Unable to Log In. Try again later")
        }
    }

    return (
        <div className="popup login-popup">
            <div className="popup-content">
                <div className='login-text'>Log In!</div>
                <hr />
                <form onSubmit={(e) => handleLogin(e)}>
                    <div className="mb-3">
                        <label htmlFor="input-username" className="form-label">Username</label>
                        <input placeholder="Username" type="text" className="form-control" id="username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="input-password" className="form-label">Password</label>
                        <input placeholder="Password" type="password" className="form-control" id="password" required />
                    </div>
                    <div>
                        <label className="message-label"></label>
                    </div>
                    <div className='btns'>
                        <button type="submit" className="btn btn-dark login-btn">Log In</button>
                        <button type="button" className="btn btn-dark close-btn" onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
}