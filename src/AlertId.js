import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlertDisplay from './AlertDisplay'

function AlertId() {
  const [alertId, setAlertId] = useState(null);

  useEffect(() => {
    // Make a GET request to the first endpoint to get alertId
    axios.get('http://localhost:8080/api/alert/max-alert-id')
      .then(response => {
      console.log('API Response:', response.data);
      const alertIdInt = parseInt(response.data);
        setAlertId(alertIdInt);
      })
      .catch(error => {
        console.error('Error fetching alertId:', error);
      });
  }, []);

  return (
    <div>
      {alertId !== null ? <AlertDisplay alertId={alertId} /> : null};
    </div>
  );
}
export default AlertId;