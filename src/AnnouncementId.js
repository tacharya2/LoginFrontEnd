import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnnouncementDisplay from './AnnouncementDisplay'

function AnnouncementId() {
  const [announcementId, setAnnouncementId] = useState(null);

  useEffect(() => {
    // Make a GET request to the first endpoint to get announcementId
    axios.get('http://localhost:8080/api/announcement/max-announcement-id')
      .then(response => {
      console.log('API Response:', response.data);
      const announcementIdInt = parseInt(response.data);
        setAnnouncementId(announcementIdInt);
      })
      .catch(error => {
        console.error('Error fetching announcementId:', error);
      });
  }, []);

  return (
    <div>
      {announcementId !== null ? <AnnouncementDisplay announcementId={announcementId} /> : null};
    </div>
  );
}
export default AnnouncementId;