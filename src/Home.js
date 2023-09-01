import React from 'react';
import { Link } from 'react-router-dom';
import './AppContainer.css';

function Home() {

    return (
        <div className='page-container'>
         <h1>Intra-National Support Foundation of America</h1>
            <h2>Welcome to the Home Page</h2>
            {/* Add your content here */}
            <p>We are growing this page. Please visit it later </p>
            <p className="log-in">Please <Link to="/Login">click here</Link> to log into your account</p>
        </div>
    );
}

export default Home;