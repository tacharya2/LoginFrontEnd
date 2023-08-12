import React from 'react';
import { Link } from 'react-router-dom';

function DummyPage() {
    return (
        <div>
            <h2>Welcome to the Dummy Page</h2>
            {/* Add your content here */}
            <h1>Successfully Visited your account</h1>
            <p>We are growing this page. Please visit it later </p>
            <p className="log-in">Please <Link to="/Register">click here</Link> to register another account</p>
        </div>
    );
}

export default DummyPage;