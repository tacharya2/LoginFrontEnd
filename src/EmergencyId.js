import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmergencyDisplay from './EmergencyDisplay'

function EmergencyId() {
  const [emergencyId, setEmergencyId] = useState(null);

  useEffect(() => {
    // Make a GET request to the first endpoint to get emergencyId
    axios.get('http://localhost:8080/api/emergency/max-emergency-id')
      .then(response => {
      console.log('API Response:', response.data);
      const emergencyIdInt = parseInt(response.data);
        setEmergencyId(emergencyIdInt);
      })
      .catch(error => {
        console.error('Error fetching emergencyId:', error);
      });
  }, []);

  return (
    <div>
      {emergencyId !== null ? <EmergencyDisplay emergencyId={emergencyId} /> : null};
    </div>
  );
}
export default EmergencyId;