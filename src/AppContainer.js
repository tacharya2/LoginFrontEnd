import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import DummyPage from './DummyPage';
import NavigationBar from './NavigationBar';
import { useAuthentication } from './AuthenticationContext';

function AppContainer() {
  const { authenticated } = useAuthentication();

  return (
    <div>
      <NavigationBar authenticated={authenticated} />
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/DummyPage" element={<DummyPage />} />
      </Routes>
    </div>
  );
}

export default AppContainer;
