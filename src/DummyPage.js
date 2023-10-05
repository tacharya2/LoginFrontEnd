import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios'; // Import axios for making API requests
import { useAuthentication } from './AuthenticationContext';
import { useNavigate } from 'react-router-dom';
import ChildForm from './AddChild';
import ParentInfo from './ParentInfo';
import AttendanceTable from './AttendanceTable';

function DummyPage() {
  const { authenticated, setAuthenticated } = useAuthentication();
  const navigate = useNavigate();

  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  const userId = decodedToken.userId;

  console.log("My Id ="+ userId);

  // State to store the list of children and the selected child ID
  const [children, setChildren] = useState([]); // Initialize with an empty array
  const [selectedChildId, setSelectedChildId] = useState(null);

  // Fetch the list of children associated with the parent
  const fetchChildren = async () => {
    try {
      // Make an API call to fetch the children data for the current parent (userId)
      const response = await axios.get(`http://localhost:8080/api/children/${userId}/myChild`);
      const childNames = response.data.map((child)=> child.fullName);

        //Just an example on how to get and map the particular data from the response data.
      const childIds = response.data.map((child) => child.age);
      console.log(childIds);

      setChildren(childNames); // Update the state with the fetched children data
      console.log("myChild = " + childNames);
    } catch (error) {
      console.error('Error fetching children data:', error);
    }
  };
  // Call fetchChildren when the component mounts
  useEffect(() => {
    fetchChildren();
  }, []);

  const handleChildAdded = (childInfo) => {
    console.log('Child added:', childInfo);
    // After adding a child, you can choose to refresh the list of children
    fetchChildren();
  };
  const handleLogout = () => {
    // Clear the authentication state and redirect to the Home page
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('authenticated');
    localStorage.removeItem('sessionStart');
    setAuthenticated(false);
    navigate('/Home'); // Redirect to the Home page
  };

  const handleChildSelect = (childId) => {
    // Set the selected child ID when a child is selected from the dropdown
    setSelectedChildId(childId);
  };

  // Render the DummyPage content for authenticated users
  return (
    <div className="page-container">
      <h1>Intra-national Support Foundation of America</h1>
      {/* Add your content here */}
      <h2>Please register your child</h2>
      <p>A family can register a maximum of 3 children</p>
      <ChildForm onChildAdded={handleChildAdded} userId={userId} />
      <ParentInfo userId={userId} onLogout={handleLogout} />

      {/* Child selection dropdown */}
      <h3>Select a Child:</h3>
            <select
              onChange={(e) => handleChildSelect(e.target.value)}
              value={selectedChildId}
            >
              <option value="">Select a Child</option>
              {children.map((childName, index) => (
                <option key={index} value={index}>
                  {childName}
                </option>
              ))}
            </select>

      {/* Pass userId, selectedChildId, and children to AttendanceTable */}
      <AttendanceTable userId={userId} selectedChildId={selectedChildId} children={children} />
    </div>
  );
}

export default DummyPage;
