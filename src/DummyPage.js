import React, { useEffect } from 'react';
import { useAuthentication } from './AuthenticationContext';

function DummyPage() {
  const { authenticated } = useAuthentication();

  useEffect(() => {
    // Update the session start timestamp when the user interacts with the DummyPage
    localStorage.setItem('sessionStart', new Date().getTime());
  }, []);

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
    </div>
  );
}

export default DummyPage;
