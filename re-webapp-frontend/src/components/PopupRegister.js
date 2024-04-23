import React from 'react'
import axios from 'axios'
import "./css/Popup.css"

export default function PopupRegister({ onClose, setAuthenticated, setUsername }) {

    const setMessage = (message) => {
        document.querySelector(".message-label").textContent = message
    };

    const getMessage = () => {
        return document.getElementById("message-label").value
    }

    const getUsername = () => {
        return document.getElementById("username").value
    };

    const getEmail = () => {
        return document.getElementById("email").value
    };

    const getPassword = () => {
        return document.getElementById("password").value
    };

    const getPasswordRepeat = () => {
        return document.getElementById("password-repeat").value
    };

    /* Validate Password */
    const isValid = () => {
        let password = getPassword();

        if(password.length < 10 ){
            setMessage("< 10 characters.");
            return false;
        }
        else if(!/[a-z]/.test(password)){
            setMessage("At least one lowercase letter.");
            return false;
        }
        else if(!/[A-Z]/.test(password)){
            setMessage("At least one UPPERCASE letter.");
            return false;
        }
        else if(!/\d/.test(password)){
            setMessage("At least one digit (0-9).");
            return false;
        }
        else if(!/[^\w\d\s]/.test(password)){
            setMessage("At ls. one pc character (!@#).");
            return false;
        }
        else{
            setMessage("");
            return true;
        }

        }

    const validatePassword = () => {
        if(!isValid()){
            return;
        }
        
        validateRepetition();
    }

    /* Validate Password Repetition */
    const validateRepetition = () => {
        if(getPassword() === getPasswordRepeat()){
            setMessage("");
            return;
        }
        setMessage("Passwords do not match.");
        console.log(getMessage())

        return;
    };

    /* register */
    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            /* make request */
            const response = await axios.post("http://localhost:8080/register", {
                username: getUsername(),
                email: getEmail(),
                password: getPassword(),
                passwordRepeat: getPasswordRepeat()
            })

            if (!response.data.errorCode) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', getUsername())
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                setUsername(getUsername())
                setAuthenticated(true)
                onClose()
                return
            }

            /* handle error */
            setMessage(response.data.errorCode)
        }
        catch (ex) {
            setMessage("Unable to Sign Up. Try again later")
        }
    }

    return (
        <div className="popup register-popup">
            <div className="popup-content">
                <div className='login-text'>Sign Up!</div>
                <hr></hr>
                <form onSubmit={(e) => handleRegister(e)}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input placeholder="Username" type="text" className="form-control" id="username" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input placeholder="E-mail" type="email" className="form-control" id="email" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input placeholder="Password" type="password" className="form-control" id="password" required onChange={(e)=> {
                            validatePassword();}} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="repeat-password" className="form-label">Repeat Password</label>
                        <input placeholder="Repeat Password" type="password" className="form-control" id="password-repeat" required onChange={(e)=>{
                            validatePassword();}} />
                    </div>
                    <div>
                        <label className="message-label" id="message-label"></label>
                    </div>
                    <button type="submit" className="btn btn-dark register-btn">Sign Up</button>
                    <button type="button" className="btn btn-dark close-btn" onClick={onClose}>Close</button>
                </form>
            </div>
        </div>
    );
}