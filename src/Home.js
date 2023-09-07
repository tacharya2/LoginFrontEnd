import React from 'react';
import { Link } from 'react-router-dom';
import './AppContainer.css';
import MessageForm from './MessageForm';
import AlertId from './AlertId';
import EmergencyId from './EmergencyId';
import InfoId from './InfoId';
import NewsFeedId from './NewsFeedId';
import AnnouncementId from './AnnouncementId';

function Home() {

    return (
        <div className='page-container'>
         <h1>Intra-National Support Foundation of America</h1>
            <h2>Welcome to the Home Page</h2>
            <MessageForm />
            {/* Add your content here */}
            <p>We are growing this page. Please visit it later </p>
            <p className="log-in">Please <Link to="/Login">click here</Link> to log into your account</p>
             <AlertId/>
             <EmergencyId/>
             <InfoId/>
             <NewsFeedId/>
             <AnnouncementId/>
        </div>
    );
}

export default Home;