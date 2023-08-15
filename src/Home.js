import React from 'react';
import { Link } from 'react-router-dom';
import './AppContainer.css';

function Home() {
    return (
        <div className='home'>
            <h2>Welcome to the Home Page</h2>
            {/* Add your content here */}
            <h1>This will be your your home page</h1>
            <p>We are growing this page. Please visit it later </p>
            <p className="log-in">Please <Link to="/Login">click here</Link> to log into your account</p>
        </div>
    );
}

export default Home;