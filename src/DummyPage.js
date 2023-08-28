import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useAuthentication } from './AuthenticationContext';
import { Navigate, useNavigate } from 'react-router-dom';
import ChildForm from './AddChild';
//import './AppContainer.css';

function DummyPage() {
    const { authenticated, setAuthenticated } = useAuthentication();
    const navigate = useNavigate(); // Declare navigate


const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
const userId = decodedToken.userId;


    console.log('userId:', userId);
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);

      if (decodedToken.userId) {
        const userId = parseInt(decodedToken.userId, 10);
        console.log('Parsed userId:', userId);
      } else {
        console.log('userId field not found in the token');
      }
    } else {
      console.log('jwtToken not found in localStorage');
    }



    useEffect(() => {
    // Update the session start timestamp when the user interacts with the DummyPage
    localStorage.setItem('sessionStart', new Date().getTime());
  }, []);
    const handleLogout = () => {
        // Clear the authentication state and redirect to the Home page
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('authenticated');
        localStorage.removeItem('sessionStart');
        setAuthenticated(false);
        navigate('/Home'); // Redirect to the Home page
      };
  // If not authenticated, render nothing (or an appropriate message)
  if (!authenticated) {
    return null;
  }
    const handleChildAdded = (childInfo) => {
      console.log('Child added:', childInfo);
    }
  // Render the DummyPage content for authenticated users
  return (
    <div className='page-container'>
      <h1>Intra-national Support Foundation of America </h1>
      {/* Add your content here */}
      <h2>Please register your child</h2>
      <p>A family can register maximum of 3 child</p>
      <ChildForm onChildAdded={handleChildAdded} userId={userId} />
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
}
export default DummyPage;