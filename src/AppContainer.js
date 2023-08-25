import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import DummyPage from './DummyPage';
import Home from './Home';
import Terms from './Terms';
import NavigationBar from './NavigationBar';
import { useAuthentication } from './AuthenticationContext';
import PwResetRequest from './PwResetRequest';


function AppContainer() {
  const { authenticated } = useAuthentication();

  return (
<div className="appContainers">
    <NavigationBar className='navigationBar' authenticated={authenticated} />
    <div className="content">
        <Routes>
            <Route className="login" path="/Login" element={<Login />} />
            <Route className="register" path="/Register" element={<Register />} />
            <Route className="loggedIn" path="/DummyPage" element={<DummyPage />} />
            <Route className="home" path="/Home" element={<Home />} />
            <Route className="home" path="/terms-and-conditions" element={<Terms />} />
//            <Route className="home" path="/PwResetRequest" element={<PwResetRequest />} />
        </Routes>
    </div>
</div>
  );
}

export default AppContainer;
