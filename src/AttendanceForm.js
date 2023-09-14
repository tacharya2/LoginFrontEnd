import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';



const AttendanceForm = ({ onAttendanceAdded, childId }) => {
  const [attendanceInfo, setAttendanceInfo] = useState({
    fullName: '',
    childId: '',
    day: '',
    attendanceStatus: '',
    sendEmail: '',
    date: moment().format('MM/DD/YYYY'),
    // Add more fields as needed
  });
  const [submitStatus, setSubmitStatus] = useState(null);

        const handleInputChange = (event) => {
          const { name, value } = event.target;

          // Handle special case for the date field
          if (name === 'date') {
            const formattedDate = value ? moment(value).format('MM/DD/YYYY') : '';
            setAttendanceInfo((prevInfo) => ({
              ...prevInfo,
              [name]: formattedDate,
            }));
          } else {
            setAttendanceInfo((prevInfo) => ({
              ...prevInfo,
              [name]: value,
            }));
          }
        };

    const handleSubmit = async (event) => {
    event.preventDefault();

    // After adding the child, update the UI by calling onAttendanceAdded
    const url = `http://localhost:8080//api/attendance/addAttendance`;
    try{
    setSubmitStatus('submitting...');
            setTimeout(() => {
            setSubmitStatus(null);
            handleResetFormFields();
          }, 7000);
    await axios
            .post(url, attendanceInfo)
        onAttendanceAdded(attendanceInfo);
        setSubmitStatus("success");
        setTimeout(() => {
        setSubmitStatus(null);
        handleResetFormFields();
      }, 7000); //Success! is displayed for 7 sec
    }catch(error){
    console.error("Error submitting child data", error);
    setSubmitStatus('error')
    }
  };
      const initialFormState = {
        fullName: '',
        childId: '',
        day: '',
        attendanceStatus: '',
        sendEmail: '',
        date: moment().format('MM/DD/YYYY'),
      };
    const handleResetFormFields = () => {
      setAttendanceInfo(initialFormState);
    };
        const handleDateChange = (name, date) => {
          const formattedDate = date ? moment(date).format('MM/DD/YYYY') : '';
          setAttendanceInfo((prevInfo) => ({
            ...prevInfo,
            [name]: formattedDate,
          }));
        };

  return (
     <div className="container">
      <div className="form-wrapper">
      <h3>Add an Attendance</h3>
      <form onSubmit={handleSubmit}>
           <div className='form-element'>
            <label> Child's Full Name:
              <input required type="text" name="fullName" placeholder="Search by Last Name" value={attendanceInfo.fullName} onChange={handleInputChange}/>
            </label>
            </div>
            <br />
           <div className='form-element'>
            <label> Child ID:
              <input required type="number" name="childId" placeholder="1" value={attendanceInfo.childId} onChange={handleInputChange}/>
            </label>
            </div>
            <br />
           <div className='form-element'>
          <label> Day:
            <select required name="day" value={attendanceInfo.day} onChange={handleInputChange}>
              <option value="">Select a day</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
              <option value="Other">Other</option>
              <option value="Occasion">Occasion</option>
            </select>
          </label>
          </div>
          <br />
           <div className='form-element'>
          <label> Attendance Status:
            <select required name="attendanceStatus" value={attendanceInfo.attendanceStatus} onChange={handleInputChange}>
              <option value="">Select a status</option>
              <option value="Present">Present</option>
              <option value="Partial">Partial</option>
              <option value="Excused">Excused</option>
              <option value="Absent">Absent</option>
            </select>
          </label>
          </div>
          <br />
          <div className='form-element'>
            <label htmlFor="dateField">Date:</label>
            <DatePicker
              id="dateField"
              selected={attendanceInfo.date ? new Date(attendanceInfo.date) : null}
              onChange={(date) => handleDateChange('date', date)}
              dateFormat="MM/dd/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
           <br />
        <button type="reset" className="reset" onClick={handleResetFormFields} >Reset Form </button>
        <button className="submit-button" type="submit">Publish</button>

      </form>
      {submitStatus === 'success' && (
        <p style={{ color: 'green' }}>Published successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p style={{ color: 'red' }}>An error occurred. Please try again.</p>
      )}
      {submitStatus === 'submitting...' && (
        <p style={{ color: 'blue' }}>Submitting.....</p>
      )}
      </div>
    </div>
  );
};
export default AttendanceForm;