import {useState, useEffect} from 'react';
import axios from 'axios';

function InfoDisplay({infoId}){


    const [infoContent, setInfoContent] = useState({});

    useEffect(() => {
     console.log('infoId:', infoId);

    fetchInfoContent();

    }, [infoId]);
const apiUrl =  `http://localhost:8080/api/info/${infoId}/info`;
 console.log('apiUrl:', apiUrl);
    async function fetchInfoContent(){
        try{
            const infoEntity = await axios.get(apiUrl);
            setInfoContent(infoEntity.data);
        }catch(error){
            console.error('Error fetching info info', error);
        }
    }
    return (
      <div className="user-information-container">
        <h3>Information</h3>
        <div>
          {infoContent !== null ? (
            <div>
              <p>Posted: {infoContent.messageTime}</p>
              <h3>{infoContent.messageSubject}</h3>
              <p>{infoContent.messageContent}</p>
              {/* Add more fields as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    );
}
export default InfoDisplay;