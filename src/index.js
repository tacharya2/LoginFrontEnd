import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthenticationProvider } from './AuthenticationContext'; // Import AuthenticationProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
      <React.StrictMode>
        <AuthenticationProvider> {/* Wrap the entire app with AuthenticationProvider */}
          <App />
        </AuthenticationProvider>
      </React.StrictMode>
    </div>
);

reportWebVitals();
