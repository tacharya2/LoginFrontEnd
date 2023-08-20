import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from './AuthenticationContext';
import ForgotPassword from './ForgotPassword.js'

function Login(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { setAuthenticated } = useAuthentication();// Destructure setAuthenticated from the context
    const [resettingPassword, setResettingPassword] = useState(false);
//    const [forgotUsername, setForgotUsername] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    }

        const handleForgotPassword = () => {
            setResettingPassword(true);
        };

    const handleForgotUsername = () => {
        alert(`Remember that your username is the email that you used to communicate with us and was used to open an account with us.
        \n if you still have an issue, please click forgot password option below get an email from us and disregard the password reset instructions`);
    };

const handleLogin = (e) => {
    e.preventDefault();

//    const dataToSend = {
//    username : username,
//    password : password
//    };

        if(!resettingPassword){
            const url = `http://localhost:8080/api/user/login?username=${username}&password=${password}`;
             axios.post(url) //need to check
                     .then((response) => {
                         //Authentication successful, store the JWT token in local storage
                         localStorage.setItem('jwtToken', response.data);
                         setAuthenticated(true);
                          localStorage.setItem('authenticated', 'true');
                          localStorage.setItem('sessionStart', new Date().getTime());
                         console.log("Successfully Logged in");
                         //redirect the user to a dummy page for now
                         navigate('/DummyPage');
                         console.log("Redirected to dummy page");
                     })
                     .catch((error) => {
                     setErrorMessage('Invalid username or password');
                     });
            }
    };

    return (
        <div className="container">
            <div className="form-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-element">
                        <label>Username</label>
                        <input required  type="text"  placeholder="Username" value={username} onChange={handleUsernameChange} disabled={resettingPassword}/>
                    </div>
                    <div className="form-element">
                        <label>Password</label>
                        <input required type="password" placeholder="Password" value={password} onChange={handlePasswordChange} disabled={resettingPassword}/>
                    </div>
                    <button type="submit" className="submit-button"> Login</button>
                    <p className="error-message">{errorMessage}</p>
                    <div className="forgot-links">
                        <p className="forgot-link" onClick={handleForgotUsername} >Forgot Username</p>
                        <p className="forgot-link" onClick={handleForgotPassword}>Forgot Password</p>
                    </div>
                    {resettingPassword && ( <ForgotPassword onClose={() => setResettingPassword(false)} // Close the modal
                    setButtonClicked={setResettingPassword} // Update the resettingPassword state
                      />
                     )}
                </form>
            </div>
        </div>
    );
}
export default Login;