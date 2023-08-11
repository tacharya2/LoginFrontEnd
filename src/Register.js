import React, {useState} from 'react';
import axios from 'axios';

function Register(){

const [name, setName] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');


    const handleNameChange = (e) => {
    setName(e.target.value);
    };

    const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    };

//    const handleRePasswordChange = (e)=>{
//    setRePassword(e..target.value)
//    }

    const handleSubmit = (e) => {
    e.preventDefault();

    if(password === null){
    alert("Password required")
    }

    // prepare the data to be sent to the server

    const dataToSend = {
    name : name,
    username : username,
    password : password
    };
    console.log(dataToSend)
    axios.post('http://localhost:8080/api/user/create', dataToSend)
    .then((response) => {
    console.log(response.data);
    setMessage(`Hello ${response.data.name}! Thank you for registering with us with a username: {response.data.username}`);

    setName('');
    setUsername('');
    setPassword('');

    })
    .catch(error =>{
    console.log('Error: ', error);
    });
  };

  return(
      <div className="container">
       <div className="form-wrapper">
          <h2>Registration Form</h2>
          <form onSubmit={handleSubmit}>
              <div className="form-element">
                  <label>Name </label>
                  <input required type="Text" placeholder="John Owen" value={name} onChange={handleNameChange}/>
              </div>
              <div className="form-element">
                  <label> Username </label>
                  <input required type="text" placeholder="username" value={username} onChange={handleUsernameChange}/>
              </div>

              <div className="form-element">
                <label>Password</label>
                <input required type="password" placeholder="8 characters long" value={password} onChange={handlePasswordChange}/>
              </div>

              <button type="submit" className="submit-button" >Register with Intra Foundation </button>
              <p className="message">{message}</p>
              <p className="log-in">Please <a href="/login">Login</a> to access you account</p>
          </form>
          </div>
      </div>
  );
}
export default Register;