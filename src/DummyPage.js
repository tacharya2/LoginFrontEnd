import React from 'react';
import { useAuthentication } from './AuthenticationContext';
import { Navigate } from 'react-router-dom';

function DummyPage() {
  const { authenticated } = useAuthentication();

  // Redirect to login page if not authenticated
  if (!authenticated) {
    return <Navigate to="/Login" />;
  }

  // Render the DummyPage content for authenticated users
  return (
    <div>
      <h1>Welcome to this Dummy Page</h1>
      {/* Add your content here */}
      <h2>Your future account activity will be accounted here</h2>
      <p>We are growing this page. Please visit it later</p>
    </div>
  );
}

export default DummyPage;
