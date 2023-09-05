import React, { Component } from 'react';
import axios from 'axios';

class MessageForm extends Component {
  constructor(props) {
    super(props);
        this.state = {
          messageType: 'Info', //default
          messageSubject: '',
          messageContent: '',
          messageBy: '',
          postMessage: null, // Message to display after posting
          isPostSuccess: null, // Flag to track success or error
    };
  }

  // Function to handle the change in message type
  handleMessageTypeChange = (e) => {
    this.setState({ messageType: e.target.value });
  };

  // Async function to handle form submission
  handleSubmit = async (e) => {
    e.preventDefault();
    const { messageType, messageSubject, messageContent, messageBy, messageTime } = this.state;
    const newMessage = {
      messageSubject,
      messageContent,
      messageBy,
      messageTime: null,
    }; // 10 seconds;

    console.log('Payload before sending:', newMessage);
    const controllerUrls = {
      Alert: 'http://localhost:8080/api/alert/post',
      Emergency: 'http://localhost:8080/api/emergency/post',
      Info: 'http://localhost:8080/api/info/post',
      newsFeed: 'http://localhost:8080/api/newsFeed/post',
      Announcement: 'http://localhost:8080/api/announcement/post',
    };
    const controllerUrl = controllerUrls[this.state.messageType];

    try {
      // Use async/await to make the POST request
      const response = await axios.post(controllerUrl, newMessage);
      // Handle the response from the server
      console.log('Response from server:', response.data);
      if (response.status === 200) {
        this.setState({
          postMessage: 'Message posted successfully!',
          isPostSuccess: true,
        });
          setTimeout(() => {
            this.setState({
              postMessage: null,
              isPostSuccess: null,
            });
          }, 10000);
      } else {
        this.setState({
          postMessage: 'Failed to post message. Please try again.',
          isPostSuccess: false,
        });
      }
      // You can access the JSON data here
      console.log(response.data);

      // Clear the form fields after submission
      this.setState({
        messageType: 'Info',
        messageSubject: '',
        messageContent: '',
        messageBy: '',
      });
    } catch (error) {
      // Handle errors here
    this.setState({
        postMessage: 'Failed to post message. Please try again.',
        isPostSuccess: false,
      });
      console.error(error);
    }
  };
  handleMessageContentChange = (e) => {
    const content = e.target.value;
    if (content.length <= 900) {
      this.setState({ messageContent: content });
    }
  };
    handleMessageContentChange2 = (e) => {
      const content2 = e.target.value;
      if (content2.length <= 100) {
        this.setState({ messageSubject: content2 });
      }
    };
      // Function to reset form fields
      handleReset = () => {
        this.setState({
          messageType: 'Info',
          messageSubject: '',
          messageContent: '',
          messageBy: '',
        });
      };
  render() {
      const remainingCharacters = 900 - this.state.messageContent.length;
      const isDisabled = remainingCharacters <= 0;

      const remainingCharacters2 = 100 - this.state.messageSubject.length;
      const isDisabled2 = remainingCharacters2 <= 0;
    return (
      <div className="container">
      <div className="form-wrapper">
        <h1>Message Form</h1>
        {this.state.postMessage && (
          <div className={`messages ${this.state.isPostSuccess ? 'success' : 'error'}`}>
            {this.state.postMessage}
          </div>
        )}
        <form onSubmit={this.handleSubmit}>
          <div className="form-element">
            <label htmlFor="messageType">Select Message Type:</label>
            <select
              id="messageType"
              name="messageType"
              value={this.state.messageType}
              onChange={this.handleMessageTypeChange}
            >
              <option value="Info">Info</option>
              <option value="Alert">Alert</option>
              <option value="Emergency">Emergency</option>
              <option value="newsFeed">News Feed</option>
              <option value="Announcement">Announcement</option>
            </select>
          </div>
          <div className="form-element">
            <label  htmlFor="messageSubject">Subject:</label>
            <input required type="text" id="messageSubject" name="messageSubject" value={this.state.messageSubject} onChange={this.handleMessageContentChange2} placeholder="Enter short subject here"/>
                <span className="character-count">
                  {remainingCharacters2} character remaining
                </span>
          </div>
          <div className="form-element">
            <label htmlFor="messageContent">Message:</label>
            <textarea id="messageContent" name="messageContent" value={this.state.messageContent} onChange={this.handleMessageContentChange} placeholder="900 characters" required></textarea>
                <span className="character-count">
                  {remainingCharacters} character remaining
                </span>
          </div>
          <div className="form-element">
            <label htmlFor="messageBy">Your Name(won't be posted):</label>
            <input required type="text" id="messageBy" name="messageBy" value={this.state.messageBy} onChange={(e) => this.setState({ messageBy: e.target.value })} placeholder="Raghu Osti"/>
          </div>
          <button className="reset" type="reset" onClick={this.handleReset}> Start Over </button>
          <button className="reset" type="submit">Post Message</button>
        </form>
            {this.state.postMessage && (
              <div className={`messages ${this.state.isPostSuccess ? 'success' : 'error'}`}>
                {this.state.postMessage}
              </div>
            )}
        </div>
      </div>
    );
  }
}
export default MessageForm;