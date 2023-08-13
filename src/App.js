import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './AppContainer';
import { AuthenticationProvider, useAuthentication } from './AuthenticationContext';

function App() {
  const { setAuthenticated } = useAuthentication(); // Get the setAuthenticated function from the context
  const [authenticated, setLocalAuthenticated] = useState(false);

  // Check for authentication and session expiry on app load
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const sessionStart = parseInt(localStorage.getItem('sessionStart'));

    if (token && !isNaN(sessionStart)) {
      const currentTime = new Date().getTime();
      const sessionDuration = 3600000;

      if (currentTime - sessionStart > sessionDuration) {
        // Session has expired
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('sessionStart');
        setLocalAuthenticated(false);
      } else {
        // Session is still active
        setLocalAuthenticated(true);
        setAuthenticated(true); // Set the authentication state in the context
      }
    }
  }, [setAuthenticated]);

  return (
    <Router>
      <AuthenticationProvider>
        <AppContainer authenticated={authenticated} />
      </AuthenticationProvider>
    </Router>
  );
}

export default App;
