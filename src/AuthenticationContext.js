// AuthenticationContext.js
import React, { useContext, useState, useEffect } from 'react';

const AuthenticationContext = React.createContext();

export function useAuthentication() {
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  // Check if a valid JWT token is present in local storage during initialization
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthenticationContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
