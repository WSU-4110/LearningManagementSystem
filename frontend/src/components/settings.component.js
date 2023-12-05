import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/settings.css';
import '../css/index.css';

export default function Settings() {
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Initialize with a default color
  const [notificationSound, setNotificationSound] = useState(true); // Initialize with notification sound on

  const handleSaveChanges = () => {
    const updatedUser = {
      selectedColor: selectedColor, // Add selectedColor to the updated user object
    };

    axios
      .put('http://localhost:5050/users/update', updatedUser)
      .then((response) => {
        // Handle success, assuming the response contains updated user data
        const updatedColor = response.data.selectedColor;
        setSelectedColor(updatedColor);
      })
      .catch((error) => {
        // Handle error, e.g., display an error message
        console.error(error);
      });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const updateSelectedColor = (color) => {
    document.documentElement.style.setProperty('--selected-color', color); // Update CSS variable value
    document.body.style.backgroundColor = color; // Change body background color
    localStorage.setItem("backgroundColor",color);
  };

  // Call updateSelectedColor function whenever selectedColor changes
  useEffect(() => {
    updateSelectedColor(selectedColor);
  }, [selectedColor]);

  return (
    <div className="settings-container">
      <h1>Settings</h1>

      <h2>Change Website Preferences</h2>
      <form>
        <div>
          <label>Website Color</label>
          <input
            className="color-btn"
            type="color"
            value={selectedColor}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </div>

        <div className="color-box" style={{ backgroundColor: selectedColor, width: '50px', height: '50px' }}>
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
