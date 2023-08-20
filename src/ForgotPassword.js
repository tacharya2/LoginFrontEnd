import React, {useState} from 'react';
import axios from 'axios';

function ForgotPassword({onClose, resettingPassword, setButtonClicked}){
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');


    const handleEmailChange = (e) => {
    setEmail(e.target.value);
    };

    const handleSendResetLink = () => {

    setButtonClicked(true)

    const url = 'http://localhost:8080/api/send-email/send'

        axios.post(url, {email})
            .then((response) => {
                setMessage(response.data.message);
            })
            .catch((error) => {
            setMessage('An error occur. Please try again');

            });
    };
    return (
    <div className='forgot-pw'>
        <h2>Forgot Password </h2>
            <p>Enter your registered email to receive a password reset link sent to your email</p>
            <input required type='email' placeholder='abc@gmail.com' value={email} onChange={handleEmailChange}/>
            <button type="submit" onClick={handleSendResetLink} disabled={resettingPassword}>Send Reset Link</button>
            <p className='message'> {message}</p>
        <button onClick={onClose}>Close</button>
    </div>
    );
}
export default ForgotPassword;