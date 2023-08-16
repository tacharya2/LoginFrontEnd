import React from 'react';
import { Link } from 'react-router-dom';
import './AppContainer.css';

function Terms() {
    return (
        <div className='home'>
            <h2>Intra National Support Foundation of America </h2>
            {/* Add your content here */}
            <h1>Software usage terms and conditions</h1>
            <p>We are growing this page. Please visit it later </p>
            <p className="log-in">Please <Link to="/Login">click here</Link> to log into your account</p>
        </div>
    );
}

export default Terms;