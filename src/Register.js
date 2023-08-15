import React, {useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './App.css';

function Register(){

    const [firstName, setFirstName] = useState('');
    const [middleInitial, setMiddleInitial] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');

    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    //Address fields
      const[street, setStreet] = useState('');
      const[city, setCity] = useState('');
      const[state, setState] = useState('');
      const[zip, setZip] = useState('');

        // Function to reset address fields
        const resetAddressFields = () => {
          setStreet('');
          setCity('');
          setState('');
          setZip('');
        };

    const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    };

    const handleMiddleInitialChange = (e) => {
    setMiddleInitial(e.target.value);
    };

    const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    };

    const handlePhoneChange = (e) => {
    setPhone(e.target.value);
    };

    const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    };

          const handleStreetChange = (e) => {
            setStreet(e.target.value.trim());
          };

          const handleCityChange = (e) => {
            setCity(e.target.value.trim());
          };


          const handleStateChange = (e) => {
            setState(e.target.value.trim());
          };

          const handleZipChange = (e) => {
          setZip(e.target.value.trim());
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
    firstName : firstName,
    middleInitial : middleInitial,
    lastName : lastName,
    phone : phone,
    address: {
            street: street,
            city: city,
            state: state,
            zip: zip
            },
    username : username,
    password : password
    };
    console.log(dataToSend)
    axios.post('http://localhost:8080/api/user/create', dataToSend)
    .then((response) => {
    console.log(response.data);
    setMessage(`Hello ${response.data.firstName} ${response.data.lastName}! Thank you for registering with us with a username: ${response.data.username}`);

    setFirstName('');
    setMiddleInitial('');
    setLastName('');
    setPhone('');
    resetAddressFields();
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
                  <label>First Name </label>
                  <input required type="Text" placeholder="John" value={firstName} onChange={handleFirstNameChange}/>
              </div>
              <div className="form-element">
                  <label>Middle Initial </label>
                  <input type="Text" placeholder="B" value={middleInitial} onChange={handleMiddleInitialChange}/>
              </div>
              <div className="form-element">
                  <label>Last Name </label>
                  <input required type="Text" placeholder="Owen" value={lastName} onChange={handleLastNameChange}/>
              </div>

              <div className="form-element">
                  <label> Phone Number </label>
                  <input required type="text" placeholder="123-456-7890" value={phone} onChange={handlePhoneChange}/>
              </div>
            <div className="form-element">
              <label>Street</label>
              <input required type="text" placeholder="123 Main Street" value={street} onChange={handleStreetChange} />
            </div>
            <div className="form-element">
              <label>City</label>
              <input required type="text" placeholder="San Antoine" value={city} onChange={handleCityChange} />
            </div>
            <div className="form-element">
              <label>State</label>
              <input required type="text" placeholder="TX" value={state} onChange={handleStateChange} />
            </div>
            <div className="form-element">
              <label>Zip</label>
              <input required type="text" placeholder="30084" value={zip} onChange={handleZipChange} />
            </div>
              <div className="form-element">
                  <label> Email/Username </label>
                  <input required type="email" placeholder="johnowen@gmail.com" value={username} onChange={handleUsernameChange}/>
              </div>

              <div className="form-element">
                <label>Password</label>
                <input required type="password" placeholder="8 characters long" value={password} onChange={handlePasswordChange}/>
              </div>

              <button type="submit" className="submit-button" >Register with Intra Foundation </button>
              <p className="message">{message}</p>
              <p className="log-in">Please <Link to="/Login">Login</Link> to access you account</p>
          </form>
          </div>
      </div>
  );
}
export default Register;