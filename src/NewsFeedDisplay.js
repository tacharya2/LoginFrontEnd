import {useState, useEffect} from 'react';
import axios from 'axios';

function NewsFeedDisplay({newsFeedId}){


    const [newsFeedContent, setNewsFeedContent] = useState({});

    useEffect(() => {
     console.log('newsFeedId:', newsFeedId);

    fetchNewsFeedContent();

    }, [newsFeedId]);
const apiUrl =  `http://localhost:8080/api/newsFeed/${newsFeedId}/info`;
 console.log('apiUrl:', apiUrl);
    async function fetchNewsFeedContent(){
        try{
            const newsFeedEntity = await axios.get(apiUrl);
            setNewsFeedContent(newsFeedEntity.data);
        }catch(error){
            console.error('Error fetching newsFeed', error);
        }
    }
    return (
      <div className="user-info-container">
        <h3>NewsFeed</h3>
        <div>
          {newsFeedContent !== null ? (
            <div>
              <p>{newsFeedContent.messageTime}</p>
              <h3>{newsFeedContent.messageSubject}</h3>
              <p>{newsFeedContent.messageContent}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
}
export default NewsFeedDisplay;