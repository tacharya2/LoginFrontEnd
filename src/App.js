import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './AppContainer';

function App() {
const [authenticated, setAuthenticated] = useState(false);
  return (
    <Router>
      <AppContainer authenticated = {authenticated} setAuthenticated = {setAuthenticated}/>
    </Router>
  );
}

export default App;
