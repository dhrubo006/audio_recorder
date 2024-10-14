import React, { useState } from "react";

const PopupForm = ({ onSave, onCancel }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [patientBirthdate, setPatientBirthdate] = useState("");

  // Handle first name input change
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  // Handle last name input change
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };
  // Handle birthdate input change
  const handleBirthdateChange = (event) => {
    setPatientBirthdate(event.target.value);
  };

  // Call onSave when the save button is clicked
  const handleSubmit = () => {
    if (!firstName || !lastName || !patientBirthdate) {
      alert("Please provide both your name and birthdate.");
      return;
    }
    const fullName = `${firstName} ${lastName}`;
    onSave(fullName,firstName, lastName, patientBirthdate);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Enter your details</h3>
      
      <label>
        First Name:
        <input 
          type="text" 
          value={firstName} 
          onChange={handleFirstNameChange} 
          placeholder="Enter your first name" 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </label>

      <label>
        Last Name:
        <input 
          type="text" 
          value={lastName} 
          onChange={handleLastNameChange} 
          placeholder="Enter your last name" 
          style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </label>

      <label>
        Birthdate:
        <input 
          type="date" 
          value={patientBirthdate} 
          onChange={handleBirthdateChange} 
          style={{ display: 'block', width: '100%', marginTop: '10px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </label>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px' }}>
          Save
        </button>
        <button onClick={onCancel} style={{ padding: '10px 20px', fontSize: '14px', cursor: 'pointer', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px' }}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default PopupForm;
