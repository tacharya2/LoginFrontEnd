import {useState, useEffect} from 'react';
import axios from 'axios';

function ParentInfo({userId, onLogout}){
    const apiUrl = `http://localhost:8080/api/users/${userId}/parentInfo`;
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
    fetchUserInfo();
    },[userId]); //userId as a dependency in the array

    async function fetchUserInfo(){
        try{
            const response = await axios.get(apiUrl);
            setUserInfo(response.data);
        }catch(error){
            console.error('Error fetching user info: ', error);
        }
    }
  return (
<div className="user-info-container">
  <h3>User/Parent</h3>
  <div>
    <p>{userInfo.firstName} {userInfo.lastName}</p>
    <p>{userInfo.phone}</p>
    {userInfo.address && <p>Location: {userInfo.address.zip}</p>}
    <button  className="refresh-button" onClick={onLogout}>Logout</button>
    {/* Add more fields as needed */}
  </div>
</div>

  );
}
export default ParentInfo;