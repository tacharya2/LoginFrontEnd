import {useState, useEffect} from 'react';
import axios from 'axios';

function AttendanceInfo({userId, onLogout}){
    const apiUrl = `http://localhost:8080/api/attendance/addChild`;
    const [attendanceInfo, setAttendanceInfo] = useState({});

    useEffect(() => {
    fetchAttendanceInfo();
    },[userId]); //userId as a dependency in the array

    async function fetchAttendanceInfo(){
        try{
            const response = await axios.get(apiUrl);
            setAttendanceInfo(response.data);
        }catch(error){
            console.error('Error fetching user info: ', error);
        }
    }
  return (
<div className="user-info-container">
  <h3>User/Parent</h3>
      <div>
        <p>Friday Attendance </p>
        <p>{attendanceInfo.firstName} {attendanceInfo.lastName}</p>
        <p>{attendanceInfo.day}</p>
        {attendanceInfo.attendanceStatus}</p>}
      </div>
    <div>
      <p>Friday Attendance </p>
      <p>{attendanceInfo.firstName} {attendanceInfo.lastName}</p>
      <p>{attendanceInfo.day}</p>
      {attendanceInfo.attendanceStatus}</p>}
      <button  className="refresh-button" onClick={onLogout}>Logout</button>
      {/* Add more fields as needed */}
    </div>
</div>

  );
}
export default AttendanceInfo;