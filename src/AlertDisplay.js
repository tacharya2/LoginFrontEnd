import {useState, useEffect} from 'react';
import axios from 'axios';

function AlertDisplay({alertId}){


    const [alertContent, setAlertContent] = useState({});

    useEffect(() => {
     console.log('alertId:', alertId);

    fetchAlertContent();

    }, [alertId]);
const apiUrl =  `http://localhost:8080/api/alert/${alertId}/info`;
 console.log('apiUrl:', apiUrl);
    async function fetchAlertContent(){
        try{
            const alertEntity = await axios.get(apiUrl);
            setAlertContent(alertEntity.data);
        }catch(error){
            console.error('Error fetching alert info', error);
        }
    }
    return (
      <div className="user-alert-container">
        <h3>Alerts</h3>
        <div>
          {alertContent !== null ? (
            <div>
              <p>Posted: {alertContent.messageTime}</p>
              <h3>{alertContent.messageSubject}</h3>
              <p>{alertContent.messageContent}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
}
export default AlertDisplay;