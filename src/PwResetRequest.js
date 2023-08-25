import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PwResetRequest() {
  const [newPassword, setNewPassword] = useState('');
  const [reenterNewPassword, setReenterPassword] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [authToken, setAuthToken] = useState('');
  const navigate = useNavigate();


  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleReenterNewPasswordChange = (e) => {
    setReenterPassword(e.target.value);
  };
        const handleResetFormFields = () => {
        setNewPassword('');
        setReenterPassword('');
        }
 useEffect(() => {
    // Set authToken state when component mounts
    const queryParams = new URLSearchParams(window.location.search);
    const extractedAuthToken = queryParams.get('authToken');
    setAuthToken(extractedAuthToken);
  }, []); // Empty dependency array ensures it runs only once
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword === reenterNewPassword) {
        const requestData = {
          newPassword: newPassword,
          reenterNewPassword : reenterNewPassword,
    };
      axios
        .post('http://localhost:8080/api/reset-pwd',  requestData,{
            params: {
                authToken : authToken,
                },
         })
        .then((response) => {
          console.log('Password reset successful');
          navigate('/DummyPage');
          console.log(response.data);

          {/* Reset the fields here */}
        })
        .catch((error) => {
          console.error('Password reset failed:', error);
        });
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <div className='container'>
        <div className='form-wrapper'>
          <h2>Password Reset</h2>
          <form onSubmit={handleResetPassword}>
            <label>
              New Password:
              <input type="password" required value={newPassword} onChange={handleNewPasswordChange} />
            </label>
            <br />
            <label>
              Reenter New Password:
              <input type="password" required value={reenterNewPassword} onChange={handleReenterNewPasswordChange} />
            </label>
            <br />
            <button type="reset" className="reset" onClick={handleResetFormFields} >Reset Form </button>
            <button type="submit" className='submit-button'>Reset Password</button>
          </form>
        </div>
    </div>
  );
}
export default PwResetRequest;