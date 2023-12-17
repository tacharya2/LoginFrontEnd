import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendanceTable({ userId, selectedChildId }) {
  const [attendanceData, setAttendanceData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState([]);

  // Function to fetch attendance data
const fetchAttendanceData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8080/api/attendance/${userId}/${selectedChildId}/getAttendance`
    );

    // Ensure that the response data is an array and not empty
    if (Array.isArray(response.data) && response.data.length > 0) {
      // Update the state with the response data
      setAttendanceData(response.data);
      console.log('Attendance =' + JSON.stringify(response.data));
    } else {
      // Handle the case where the response data is empty
      console.log('No attendance data found.');
    }
  } catch (error) {
    console.error('Error fetching attendance data:', error);
  }
};


  useEffect(() => {
    // Fetch attendance data when the component mounts or when selectedChildId changes
    fetchAttendanceData();
  }, [userId, selectedChildId]);                                                                                                                                                                                                                                                                                                              

  // Function to update the current week's range
  const updateWeekRange = () => {
    // Calculate the start and end date of the current week
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start from Monday
    const endOfWeek = new Date(today);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End on Sunday

    // Format the date range as needed (e.g., "MM/DD/YYYY - MM/DD/YYYY")
    const formattedRange = `${startOfWeek.toLocaleDateString()} - ${endOfWeek.toLocaleDateString()}`;
    setCurrentWeek(formattedRange);
  };

  useEffect(() => {
    // Update the current week's range when the component mounts
    updateWeekRange();
  }, []);

  return (
    <div>
      <h2>Attendance for Current Week: {currentWeek}</h2>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((entry) => (
            <tr key={entry.attendanceId}>
              <td>{entry.day}</td>
              <td>{entry.attendanceStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
