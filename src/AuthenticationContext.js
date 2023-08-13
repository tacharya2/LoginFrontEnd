// AuthenticationContext.js
import React, { useContext, useState } from 'react';

const AuthenticationContext = React.createContext();

export function useAuthentication() {
console.log("Authentication Context called");
  return useContext(AuthenticationContext);
}

export function AuthenticationProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthenticationContext.Provider value={{ authenticated, setAuthenticated }}>
      {children}
    </AuthenticationContext.Provider>
  );
}
