import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthenticationProvider } from './AuthenticationContext'; // Import AuthenticationProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthenticationProvider> {/* Wrap the entire app with AuthenticationProvider */}
      <App />
    </AuthenticationProvider>
  </React.StrictMode>
);

reportWebVitals();
