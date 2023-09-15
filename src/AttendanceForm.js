import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select'; // Import React Select
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';

const AttendanceForm = ({ onAttendanceAdded }) => {
  const [attendanceInfo, setAttendanceInfo] = useState({
    childId: '',
    day: '',
    attendanceStatus: '',
    attendanceDate: moment().format('MM/DD/YYYY'),
  });
  const [submitStatus, setSubmitStatus] = useState(null);
  const [childNames, setChildNames] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [fullName, setFullName] = useState('');
  const [formErrors, setFormErrors] = useState({});


  useEffect(() => {
    async function fetchChildNames() {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/attendance/children/names'
        );
        const names = response.data.map((child) => ({
          value: child.childId, // Store childId as value
          label: `${child.fullName} (ID: ${child.childId})`, // Display full name with childId
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

  const handleAddRecord = () => {
    // Validate the input fields
    const errors = {};
    if (!attendanceInfo.childId) {
      errors.childId = 'Child ID is required.';
    }
    if (!attendanceInfo.day) {
      errors.day = 'Day is required.';
    }
    if (!attendanceInfo.attendanceStatus) {
      errors.attendanceStatus = 'Attendance Status is required.';
    }
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Add a new attendance record to the list
      const newRecord = {
        childId: selectedChild ? selectedChild.value : attendanceInfo.childId,
        day: attendanceInfo.day,
        attendanceStatus: attendanceInfo.attendanceStatus,
        attendanceDate: attendanceInfo.attendanceDate,
      };

      setAttendanceRecords([...attendanceRecords, newRecord]);
      setFullName(selectedChild ? selectedChild.label.split(' (')[0] : ''); // Set the full name

      // Clear the input fields after adding the record
      setAttendanceInfo({
        childId: '',
        day: '',
        attendanceStatus: '',
        attendanceDate: moment().format('MM/DD/YYYY'),
      });
      setSelectedChild(null);
    }
  };

  const handlePublish = async () => {
    // Validate if there are added records
    if (attendanceRecords.length === 0) {
      alert('Please add at least one attendance record.');
      return;
    }

    const url = 'http://localhost:8080/api/attendance/addAttendance';
    try {
      setSubmitStatus('submitting...');
      setTimeout(() => {
        setSubmitStatus(null);
        handleResetFormFields();
      }, 7000);

      // Create an array of formatted records
      const formattedRecords = attendanceRecords.map((record) => ({
        childId: record.childId,
        day: record.day,
        attendanceDate: record.attendanceDate,
        attendanceStatus: record.attendanceStatus,
        sendEmail: false, // You can set this to false as per your server-side requirements
      }));

      // Send the formatted records to the backend
      await axios.post(url, formattedRecords);
      onAttendanceAdded(attendanceRecords);
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
      childId: '',
      day: '',
      attendanceStatus: '',
      attendanceDate: moment().format('MM/DD/YYYY'),
    });
    setSelectedChild(null);
    setAttendanceRecords([]); // Clear the attendance records list
    setFullName(''); // Clear the full name
    setFormErrors({}); // Clear form errors
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h3>Add an Attendance</h3>
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
          {formErrors.childId && (
            <span className="error">{formErrors.childId}</span>
          )}
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
          {formErrors.day && <span className="error">{formErrors.day}</span>}
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
          {formErrors.attendanceStatus && (
            <span className="error">{formErrors.attendanceStatus}</span>
          )}
        </div>
        <br />
        <div className="form-element">
          <label> Date:</label>
          <DatePicker
            required
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
        <button className="reset" type="button" onClick={handleAddRecord}>
          Add Record
        </button>
        <button type="reset" className="reset" onClick={handleResetFormFields}>
          Reset Form
        </button>
        {attendanceRecords.length > 0 && (
          <div className="records-list">
            <h4>Added Record for <b>{fullName}</b>:</h4>
            <ul>
              {attendanceRecords.map((record, index) => (
                <li key={index}>
                  {record.childId} - {record.day} - {record.attendanceStatus} - {record.attendanceDate}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button className="reset" type="button" onClick={handlePublish}>
          Publish
        </button>
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