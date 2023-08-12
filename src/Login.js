import React, {useState} from 'react';
import axios from 'axios';

function Login(){
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [errorMessage, setErrorMessage] = useState('');

const handleUsernameChange = (e) => {
setUsername(e.target.value);
}
const handlePasswordChange = (e) => {
setPassword(e.target.value);
}

const handleLogin = (e) => {
    e.preventDefault();

    const dataToSend = {
    username : username,
    password : password
    };

        axios.post('http://localhost:8080/api/user/login', dataToSend) //need to check
        .then((response) => {
            //Authentication successful, store the JWT token in local storage
            localStorage.setItem('jwtToken', response.data);
            console.log("Successfully Logged in");
            //redirect the user to a dummy page for now
            window.location.href = '/DummyPage';
            console.log("Redirected to dummy page");
        })
        .catch((error) => {
        setErrorMessage('Invalid username or password');
        });
    };
    return (
        <div className="container">
            <div className="form-wrapper">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-element">
                        <label>Username</label>
                        <input required  type="text"  placeholder="Username" value={username} onChange={handleUsernameChange}/>
                    </div>
                    <div className="form-element">
                        <label>Password</label>
                        <input required type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <button type="submit" className="submit-button"> Login</button>
                    <p className="error-message">{errorMessage}</p>
                </form>
            </div>
        </div>
    );
}
export default Login;