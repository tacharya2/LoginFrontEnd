import {useState, useEffect} from 'react';
import axios from 'axios';

function EmergencyDisplay({emergencyId}){


    const [emergencyContent, setEmergencyContent] = useState({});

    useEffect(() => {
     console.log('emergencyId:', emergencyId);

    fetchEmergencyContent();

    }, [emergencyId]);
const apiUrl =  `http://localhost:8080/api/emergency/${emergencyId}/info`;
 console.log('apiUrl:', apiUrl);
    async function fetchEmergencyContent(){
        try{
            const emergencyEntity = await axios.get(apiUrl);
            setEmergencyContent(emergencyEntity.data);
        }catch(error){
            console.error('Error fetching emergency info', error);
        }
    }
    return (
      <div className="user-info-container">
        <h3>Emergencies</h3>
        <div>
          {emergencyContent !== null ? (
            <div>
              <p>{emergencyContent.messageTime}</p>
              <h3>{emergencyContent.messageSubject}</h3>
              <p>{emergencyContent.messageContent}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
}
export default EmergencyDisplay;