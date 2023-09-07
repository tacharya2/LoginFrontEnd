import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfoDisplay from './InfoDisplay'

function InfoId() {
  const [infoId, setInfoId] = useState(null);

  useEffect(() => {
    // Make a GET request to the first endpoint to get infoId
    axios.get('http://localhost:8080/api/info/max-info-id')
      .then(response => {
      console.log('API Response:', response.data);
      const infoIdInt = parseInt(response.data);
        setInfoId(infoIdInt);
      })
      .catch(error => {
        console.error('Error fetching infoId:', error);
      });
  }, []);

  return (
    <div>
      {infoId !== null ? <InfoDisplay infoId={infoId} /> : null};
    </div>
  );
}
export default InfoId;