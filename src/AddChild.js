import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const ChildForm = ({ onChildAdded, userId }) => {
  const [childInfo, setChildInfo] = useState({
    fullName: '',
    gender: '',
    dob: '',
    emName: '',
    emPhone: '',
    driver: '',
    driverRelation: '',
    category:'',
    shift: '',
    // Add more fields as needed
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setChildInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

    const handleSubmit = async (event) => {
    event.preventDefault();

    // After adding the child, update the UI by calling onChildAdded
    const url = `http://localhost:8080/api/users/${userId}/children`;
    try{
    setSubmitStatus('submitting...');
    await axios
            .post(url, childInfo)
        onChildAdded(childInfo);





        setSubmitStatus("Success!");
        setTimeout(() => {
        setSubmitStatus(null);
      }, 5000); //Success! is displayed for 5 sec
    }catch(error){
    console.error("Error submitting child data", error);
    setSubmitStatus('error')
    }
  };
      const initialFormState = {
          fullName: '',
          gender: '',
          dob: '',
          emName: '',
          emPhone: '',
          driver: '',
          driverRelation: '',
          category:'',
          shift: '',
      };
    const handleResetFormFields = () => {
      setChildInfo(initialFormState);
    };
  return (
     <div className="container">
      <div className="form-wrapper">
      <h3>Add Child</h3>
      <form onSubmit={handleSubmit}>
           <div className='form-element'>
            <label> Full Name:
              <input type="text" name="fullName" value={childInfo.fullName} onChange={handleInputChange}/>
            </label>
            </div>
            <br />
           <div className='form-element'>
          <label> Gender:
            <select name="gender" value={childInfo.gender} onChange={handleInputChange}>
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="NON-BINARY">Unknown</option>
              <option value="PREFER_NOT_TO_SAY">Prefer Not to Say</option>
            </select>
          </label>
          </div>
          <br />
          <div className='form-element'>
            <label> Date Of Birth:
              <input type="text"name="dob" value={childInfo.dob} onChange={handleInputChange}/>
            </label>
           </div>
            <br />
          <div className='form-element'>
            <label> Emergency Contact Person Full Name:
              <input type="text"name="emName" value={childInfo.emName} onChange={handleInputChange}/>
            </label>
           </div>
            <br />
          <div className='form-element'>
            <label> Emergency Contact Person Phone Number:
              <input type="text"name="emPhone" value={childInfo.emPhone} onChange={handleInputChange}/>
            </label>
          </div>
            <br />
          <div className='form-element'>
            <label> Name of the Driver | Carpool Driver:
              <input type="text"name="driver" value={childInfo.driver} onChange={handleInputChange}/>
            </label>
          </div>
            <br />
          <div className='form-element'>
         <label> Driver Relationship:
        <select name="driverRelation" value={childInfo.driverRelation} onChange={handleInputChange}>
          <option value="">Select Relationship</option>
          <option value="FATHER">Father</option>
          <option value="MOTHER">Mother</option>
          <option value="UNCLE">Uncle</option>
          <option value="AUNT">Aunt</option>
          <option value="FRIEND_TO_PARENT">Friend to Parent</option>
          <option value="LEGAL_GUARDIAN">Legal Guardian</option>
        </select>
      </label>
      </div>
        <br />
       <div className='form-element'>
      <label> Category:
        <select name="category" value={childInfo.category} onChange={handleInputChange}>
          <option value="">Select Category</option>
          <option value="DANCE">Dancing</option>
          <option value="SING">Singing</option>
        </select>
      </label>
    </div>
        <br />
      <div className='form-element'>
      <label> Shift:
        <select name="shift" value={childInfo.shift} onChange={handleInputChange}>
          <option value="">Select Shift</option>
          <option value="FIRST">First</option>
          <option value="SECOND">Second</option>
          <option value="THIRD">Third</option>
        </select>
      </label>
     </div>
      <br />
        <button type="reset" className="reset" onClick={handleResetFormFields} >Reset Form </button>
        <button className="submit-button" type="submit">Add Child</button>

      </form>
      {submitStatus === 'success' && (
        <p style={{ color: 'green' }}>Child added successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p style={{ color: 'red' }}>An error occurred. Please try again.</p>
      )}
      </div>
    </div>
  );
};
export default ChildForm;