import React, { useState } from 'react';
import axios from 'axios';
import '../css/settings.css';

export default function Settings() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Initialize with a default color
  const [notificationSound, setNotificationSound] = useState(true); // Initialize with notification sound on

  const handleSaveChanges = () => {
    const updatedUser = {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      notificationSound: notificationSound, // Include the notification sound setting in the request
    };

    // Send a request to update the user's settings on the server
    axios
      .put('http://localhost:5050/users/update', updatedUser)
      .then((response) => {
        // Handle success, e.g., show a success message
      })
      .catch((error) => {
        // Handle error, e.g., display an error message
        console.error(error);
      });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  return (
    <div>
      <header>Settings</header>
      <h1>Change Profile Info</h1>
      <form>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>
      <h1>Change Website Preferences</h1>
      <form>
        <div>
        <label>Website Color</label>
          <input
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
          
        </div>
        
        <div style={{ backgroundColor: selectedColor, width: '50px', height: '50px' }}>
        {/* Display a preview of the selected color */}
        </div>

        <div>
          <label>Notification Sound</label>
          <input
            type="checkbox"
            checked={notificationSound}
            onChange={() => setNotificationSound(!notificationSound)}
          />
        </div>
        <button type="button" onClick={handleSaveChanges}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
