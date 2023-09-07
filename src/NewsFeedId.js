import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsFeedDisplay from './NewsFeedDisplay'

function NewsFeedId() {
  const [newsFeedId, setNewsFeedId] = useState(null);

  useEffect(() => {
    // Make a GET request to the first endpoint to get newsFeedId
    axios.get('http://localhost:8080/api/newsFeed/max-news-id')
      .then(response => {
      console.log('API Response:', response.data);
      const newsFeedIdInt = parseInt(response.data);
        setNewsFeedId(newsFeedIdInt);
      })
      .catch(error => {
        console.error('Error fetching newsFeedId:', error);
      });
  }, []);

  return (
    <div>
      {newsFeedId !== null ? <NewsFeedDisplay newsFeedId={newsFeedId} /> : null};
    </div>
  );
}
export default NewsFeedId