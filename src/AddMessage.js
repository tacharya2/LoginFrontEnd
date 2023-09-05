import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const AddMessage = () => {
  const [messageInfo, setMessageInfo] = useState({
    alert: '',
    emergency: '',
    info: '',
    newsfeed: '',
    announcements: '',
    infoStamp: '',
    // Add more fields as needed
  });

  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMessageInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const url = `http://localhost:8080/api/home/info`;
    try {
      setSubmitStatus('submitting...');
      await axios.post(url, messageInfo);
      setSubmitStatus('Success!');
        // Clear the form fields after a successful submission
        setMessageInfo(initialFormState);
      setTimeout(() => {
        setSubmitStatus(null);
      }, 12000); // Success! is displayed for 12 sec
    } catch (error) {
      console.error('Error submitting message data', error);
      setSubmitStatus('error');
    }
  };

  const initialFormState = {
    alert: '',
    emergency: '',
    info: '',
    newsfeed: '',
    announcements: '',
    infoStamp: '',
  };

  const handleResetFormFields = () => {
    setMessageInfo(initialFormState);
  };

  return (
    <div className="container">
          <div className="form-wrapper">
                <h1>Intra-National Support Foundation of America</h1>
                <h3 style={{ color: 'blue' }}> You can only fill one field for a nature of post at a time.</h3>
                <p>Add a Message. Please make sure it correctly corresponds to the nature of the message.</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-element">
                    <label>Alert
                    <input type="text"name="alert"placeholder="Severe Weather Alert..." value= {messageInfo.alert} onChange={handleInputChange}/>
                    </label>
                  </div>
                  <br />

                  <div className="form-element">
                    <label>Emergency
                    <input type="text"name="emergency"placeholder="Teacher is in a family emergency..." value= {messageInfo.emergency} onChange={handleInputChange}/>
                    </label>
                  </div>
                  <br />

                  <div className="form-element">
                    <label>General Information
                    <input type="text"name="info"placeholder="The second shift must wear dress-code..." value= {messageInfo.info} onChange={handleInputChange}/>
                    </label>
                  </div>
                  <br />

                  <div className="form-element">
                    <label>News of Company as a whole
                    <input type="text"name="newsfeed"placeholder="In our soccer final, yesterday, xx won the trophy.." value= {messageInfo.newsfeed} onChange={handleInputChange}/>
                    </label>
                  </div>
                  <br />

                  <div className="form-element">
                    <label>Announcement
                    <input type="text"name="announcements"placeholder="We are proud to inform you that we will be adding another..." value= {messageInfo.announcements} onChange={handleInputChange}/>
                    </label>
                  </div>
                  <br />
                  {/* Add similar form elements for other fields */}
                  <button type="reset" className="reset" onClick={handleResetFormFields} >Reset Form </button>
                  <button className="submit-button" type="submit">Post to public</button>
                </form>
                {submitStatus === 'Success!' && (
                  <p style={{ color: 'green' }}>Message added successfully!</p>
                )}
                {submitStatus === 'error' && (
                  <p style={{ color: 'red' }}>An error occurred. Please try again.</p>
                )}
                {submitStatus === 'submitting...' && (
                  <p style={{ color: 'blue' }}>Submitting....</p>
                )}
          </div>
    </div>
  );
};
export default AddMessage;