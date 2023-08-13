import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './AppContainer';
import { AuthenticationProvider } from './AuthenticationContext';

function App() {
const [authenticated, setAuthenticated] = useState(false);

//Check for authentication and session expiry on app load
useEffect(() => {
const token = localStorage.getItem('jwtToken'); //Check this
const sessionStart = parseInt(localStorage.getItem('sessionStart'));

if(token && !isNaN(sessionStart)){
const currentTime = new Date().getTime();

//Session duration in millisecond
const sessionDuration = 3600000;
//Check if the session has expired
if(currentTime - sessionStart > sessionDuration){
// Clear the authentication state and redirect to login page
localStorage.removeItem('jwtToken');
localStorage.removeItem('authenticated');
localStorage.removeItem('sessionStart');
setAuthenticated(false);

//Redirect to login page

 window.location.href = '/Login';

}

//set the authenticate state to true
setAuthenticated(true)
}
}, []);

  return (
    <Router>
      <AuthenticationProvider>
        <AppContainer />
      </AuthenticationProvider>
    </Router>
  );
}

export default App;
