import {useState, useEffect} from 'react';
import axios from 'axios';

function AnnouncementDisplay({announcementId}){


    const [announcementContent, setAnnouncementContent] = useState({});

    useEffect(() => {
     console.log('announcementId:', announcementId);

    fetchAnnouncementContent();

    }, [announcementId]);
const apiUrl =  `http://localhost:8080/api/announcement/${announcementId}/info`;
 console.log('apiUrl:', apiUrl);
    async function fetchAnnouncementContent(){
        try{
            const announcementEntity = await axios.get(apiUrl);
            setAnnouncementContent(announcementEntity.data);
        }catch(error){
            console.error('Error fetching announcement info', error);
        }
    }
    return (
      <div className="user-info-container">
        <h3>Announcements</h3>
        <div>
          {announcementContent !== null ? (
            <div>
              <p>{announcementContent.messageTime}</p>
              <h3>{announcementContent.messageSubject}</h3>
              <p>{announcementContent.messageContent}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
}
export default AnnouncementDisplay;