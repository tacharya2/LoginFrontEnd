import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import InputMask from 'react-input-mask'
import axios from 'axios';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';
import ChildTable from './ChildTable';


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
    date: moment().format('MM/DD/YYYY'),
    // Add more fields as needed
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [childrenData, setChildrenData] = useState([]);

        const handleInputChange = (event) => {
          const { name, value } = event.target;

          // Handle special case for the date field
          if (name === 'date') {
            const formattedDate = value ? moment(value).format('MM/DD/YYYY') : '';
            setChildInfo((prevInfo) => ({
              ...prevInfo,
              [name]: formattedDate,
            }));
          } else {
            setChildInfo((prevInfo) => ({
              ...prevInfo,
              [name]: value,
            }));
          }
        };

        const handleInputChange2 = (event) => {
          const { name, value } = event.target;

          // Handle special case for the phone number field
          if (name === 'emPhone') {
            const formattedPhoneNumber = value.replace(/[^\d]/g, ''); // Remove non-digit characters
            if (formattedPhoneNumber.length === 10) {
              const phoneNumberWithHyphens = `${formattedPhoneNumber.slice(0, 3)}-${formattedPhoneNumber.slice(3, 6)}-${formattedPhoneNumber.slice(6)}`;
              setChildInfo((prevInfo) => ({
                ...prevInfo,
                [name]: phoneNumberWithHyphens,
              }));
            } else {
              setChildInfo((prevInfo) => ({
                ...prevInfo,
                [name]: formattedPhoneNumber,
              }));
            }
          } else {
            setChildInfo((prevInfo) => ({
              ...prevInfo,
              [name]: value,
            }));
          }
        };

    const handleSubmit = async (event) => {
    event.preventDefault();

    // After adding the child, update the UI by calling onChildAdded
    const url = `http://localhost:8080/api/users/${userId}/children`;
    try{
    setSubmitStatus('submitting...');
            setTimeout(() => {
            setSubmitStatus(null);
            handleResetFormFields();
          }, 7000);
    await axios
            .post(url, childInfo)
        onChildAdded(childInfo);
        setSubmitStatus("success");
        setTimeout(() => {
        setSubmitStatus(null);
        handleResetFormFields();
      }, 7000); //Success! is displayed for 5 sec
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
          date: moment().format('MM/DD/YYYY'),
      };
    const handleResetFormFields = () => {
      setChildInfo(initialFormState);
    };
        const handleDateChange = (name, date) => {
          const formattedDate = date ? moment(date).format('MM/DD/YYYY') : '';
          setChildInfo((prevInfo) => ({
            ...prevInfo,
            [name]: formattedDate,
          }));
        };
useEffect(() => {
console.log("userId for API call:", userId);

  const fetchChildrenData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/children/${userId}/myChild`);
      console.log('API Response:', response);
      const parsedData = response.data;
      console.log('Response data:', parsedData);
      setChildrenData(parsedData);

    } catch (error) {
      console.error('Error fetching children data', error);
    }

  };

  fetchChildrenData();
}, [userId]);

  return (
     <div className="container">
      <div className="form-wrapper">
      <h3>Add a Child</h3>
      <form onSubmit={handleSubmit}>
           <div className='form-element'>
            <label> Child's Full Name:
              <input required type="text" name="fullName" placeholder="Prinsa Sharma" value={childInfo.fullName} onChange={handleInputChange}/>
            </label>
            </div>
            <br />
           <div className='form-element'>
          <label> Gender:
            <select required name="gender" value={childInfo.gender} onChange={handleInputChange}>
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
             <DatePicker
               id="dobField"
               selected={childInfo.dob ? moment(childInfo.dob, 'MM/DD/YYYY').toDate() : null}
               onChange={(date) => handleDateChange('dob', date)}
               dateFormat="MM/dd/yyyy"
               showMonthDropdown
               showYearDropdown
               dropdownMode="select"
             />
   </label>
           </div>
            <br />
              <div className='form-element'>
                <label> Emergency Contact Person Full Name:
                  <input required type="text"name="emName"placeholder="Heema Sharma" value={childInfo.emName} onChange={handleInputChange}/>
                </label>
               </div>
                <br />
              <div className='form-element'>
              <label> Emergency Contact Person Phone Number:
                <InputMask
                  mask="999-999-9999" // Use the mask pattern for the desired format
                  placeholder="123-456-7890"
                  name="emPhone"
                  value={childInfo.emPhone}
                  onChange={handleInputChange2}
                />
              </label>
              </div>
                <br />
              <div className='form-element'>
                <label> Name of the Driver | Carpool Driver:
                  <input required type="text"name="driver" placeholder="Puspa Sharma" value={childInfo.driver} onChange={handleInputChange}/>
                </label>
              </div>
                <br />
              <div className='form-element'>
             <label> Driver Relationship:
            <select required name="driverRelation" value={childInfo.driverRelation} onChange={handleInputChange}>
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
            <select required name="category" value={childInfo.category} onChange={handleInputChange}>
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
          <div className='form-element'>
            <label htmlFor="dateField">Today's Date:</label>
            <DatePicker
              id="dateField"
              selected={childInfo.date ? new Date(childInfo.date) : null}
              onChange={(date) => handleDateChange('date', date)}
              dateFormat="MM/dd/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
           <br />
        <button type="reset" className="reset" onClick={handleResetFormFields} >Reset Form </button>
        <button className="submit-button" type="submit">Add Child</button>

      </form>
      {submitStatus === 'success' && (
        <p style={{ color: 'green' }}>Child added successfully! Please Refresh the page to display at the right panel</p>
      )}
      {submitStatus === 'error' && (
        <p style={{ color: 'red' }}>An error occurred. Please try again.</p>
      )}
      {submitStatus === 'submitting...' && (
        <p style={{ color: 'blue' }}>Submitting.....</p>
      )}
      </div>
      <div className="child-table-wrapper">
        <ChildTable children={childrenData} />
      </div>
    </div>
  );
};
export default ChildForm;