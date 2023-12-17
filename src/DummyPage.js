import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
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

  console.log("My Id =" + userId);

  // State to store the list of children and the selected child ID
  const [children, setChildren] = useState([]); // Initialize with an empty array
  const [selectedChildId, setSelectedChildId] = useState(null); // Initialize with null
  const [childNamesAndIds, setChildNamesAndIds] = useState([]); // Initialize with an empty array

  // Fetch the list of children associated with the parent
  const fetchChildren = async () => {
    try {
      // Make an API call to fetch the children data for the current parent (userId)
      const response = await axios.get(`http://localhost:8080/api/children/${userId}/myChild`);
      const childNames = response.data.map((child) => child.fullName);

      setChildren(childNames); // Update the state with the fetched children data
    } catch (error) {
      console.error('Error fetching children data:', error);
    }
  };

  // Fetch child names and IDs
  const fetchChildNamesAndIds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/attendance/children/names");
      const childNamesAndIds = response.data;
       console.log(childNamesAndIds);
      setChildNamesAndIds(childNamesAndIds); // Update the state with child names and IDs
    } catch (error) {
      console.error('Error fetching child names and IDs:', error);
    }
  };

  // Call fetchChildren and fetchChildNamesAndIds when the component mounts
  useEffect(() => {
    fetchChildren();
    fetchChildNamesAndIds();
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

const handleChildSelect = (childName) => {
  console.log("childNamesAndIds:", childNamesAndIds);
  console.log("selected childName:", childName);

  // Find the selected child's ID based on their name
  const selectedChild = childNamesAndIds.find((child) => child.fullName === childName);
  if (selectedChild) {
    const selectedId = selectedChild.childId;
    console.log("Selected Id: " + selectedId);
    setSelectedChildId(selectedId);
  } else {
    setSelectedChildId(null); // Set it to null if no child is selected
  }
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
        value={selectedChildId || ""}
      >
        <option value="">Select a Child</option>
        {children.map((childName, index) => (
          <option key={index} value={childName}>{childName}</option>
        ))}
      </select>
    {/* Display the selected child's information */}
    {selectedChildId !== null && (
      <div>
        <h3>Selected Child:</h3>
        <p>Name: {children[selectedChildId -1]}</p>
        {/* Add other child information here */}
      </div>
    )}
      {/* Pass userId and selectedChildId to AttendanceTable */}
      <AttendanceTable userId={userId} selectedChildId={selectedChildId} />
    </div>
  );
}

export default DummyPage;
