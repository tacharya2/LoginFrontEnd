import React, { useEffect } from 'react';
import { useAuthentication } from './AuthenticationContext';
import { Navigate, useNavigate } from 'react-router-dom';

function DummyPage() {
    const { authenticated, setAuthenticated } = useAuthentication();
    const navigate = useNavigate(); // Declare navigate
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

  // Render the DummyPage content for authenticated users
  return (
    <div>
      <h1>Welcome to this Dummy Page</h1>
      {/* Add your content here */}
      <h2>Your future account activity will be accounted here</h2>
      <p>We are growing this page. Please visit it later</p>
      <button onClick={handleLogout}>Logout</button> {/* Logout button */}
    </div>
  );
}

export default DummyPage;
