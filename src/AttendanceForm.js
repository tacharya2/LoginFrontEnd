import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select'; // Import React Select
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const AttendanceForm = ({ onAttendanceAdded }) => {
  const [attendanceInfo, setAttendanceInfo] = useState({
    fullName: '',
    childId: '',
    day: '',
    attendanceStatus: '',
    sendEmail: '',
    attendanceDate: moment().format('MM/DD/YYYY'),
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [childNames, setChildNames] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  useEffect(() => {
    async function fetchChildNames() {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/attendance/children/names'
        );
        const names = response.data.map((child) => ({
          value: child.fullName, // Display the full name in the dropdown
          label: `${child.fullName} (ID: ${child.childId})`, // Display full name with childId
          childId: child.childId, // Store childId separately for use in the handleSubmit
        }));
        setChildNames(names);
      } catch (error) {
        console.error('Error fetching child names', error);
      }
    }
    fetchChildNames();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAttendanceInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setAttendanceInfo((prevInfo) => ({
      ...prevInfo,
      attendanceDate: moment(date).format('MM/DD/YYYY'),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = 'http://localhost:8080/api/attendance/addAttendance';
    try {
      setSubmitStatus('submitting...');
      setTimeout(() => {
        setSubmitStatus(null);
        handleResetFormFields();
      }, 7000);

      await axios.post(url, {
        ...attendanceInfo,
        fullName: selectedChild ? selectedChild.value : attendanceInfo.fullName,
        childId: selectedChild ? selectedChild.childId : attendanceInfo.childId,
      });
      onAttendanceAdded(attendanceInfo);
      setSubmitStatus('success');
      setTimeout(() => {
        setSubmitStatus(null);
        handleResetFormFields();
      }, 7000);
    } catch (error) {
      console.error('Error submitting child data', error);
      setSubmitStatus('error');
    }
  };

  const handleResetFormFields = () => {
    setAttendanceInfo({
      fullName: '',
      childId: '',
      day: '',
      attendanceStatus: '',
      sendEmail: '',
      attendanceDate: moment().format('MM/DD/YYYY'),
    });
    setSelectedChild(null);
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h3>Add an Attendance</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-element">
            <label> Student's Full Name:</label>
            <Select
              value={selectedChild}
              onChange={(selectedOption) => setSelectedChild(selectedOption)}
              options={childNames}
              isClearable
              placeholder="Name(ID) look up"
            />
          </div>
          <br />
          <div className="form-element">
            <label> Student ID:</label>
            <input
              required
              type="number"
              name="childId"
              placeholder="1"
              value={attendanceInfo.childId}
              onChange={handleInputChange}
            />
          </div>
          <br />
          <div className="form-element">
            <label> Day:</label>
            <select
              required
              name="day"
              value={attendanceInfo.day}
              onChange={handleInputChange}
            >
              <option value="">Select a day</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
              <option value="Other">Other</option>
              <option value="Occasion">Occasion</option>
            </select>
          </div>
          <br />
          <div className="form-element">
            <label> Attendance Status:</label>
            <select
              required
              name="attendanceStatus"
              value={attendanceInfo.attendanceStatus}
              onChange={handleInputChange}
            >
              <option value="">Select a status</option>
              <option value="Present">Present</option>
              <option value="Partial">Partial</option>
              <option value="Excused">Excused</option>
              <option value="Absent">Absent</option>
            </select>
          </div>
          <br />
          <div className="form-element">
            <label> Date:</label>
            <DatePicker
              id="dobField"
              selected={moment(attendanceInfo.attendanceDate, 'MM/DD/YYYY').toDate()}
              onChange={handleDateChange}
              dateFormat="MM/dd/yyyy"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>
          <br />
          <button type="reset" className="reset" onClick={handleResetFormFields}>
            Reset Form
          </button>
          <button className="submit-button" type="submit">
            Publish
          </button>
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
