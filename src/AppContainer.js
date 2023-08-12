import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import DummyPage from './DummyPage';
import NavigationBar from './NavigationBar';

function AppContainer({authenticated, setAuthenticated}) {
  return (
    <div>
      {/* Include the NavigationBar component */}
      <NavigationBar authenticated = {authenticated} />

      {/* Define routes for different components */}
      <Routes>
        <Route path="/Login" element={<Login setAuthenticated = {setAuthenticated}/>} />
        <Route path="/Register" element={<Register setAuthenticated={setAuthenticated} />} />
        <Route path="/DummyPage" element={authenticated ? <DummyPage /> : <Navigate to="/Login" />} />
      </Routes>
    </div>
  );
}
export default AppContainer;