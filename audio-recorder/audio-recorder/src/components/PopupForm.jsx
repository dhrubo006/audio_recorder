import React, { useState } from "react";

const PopupForm = ({ onSave, onCancel }) => {
  const [patientName, setPatientName] = useState("");
  const [patientBirthdate, setPatientBirthdate] = useState("");

  // Handle name input change
  const handleNameChange = (event) => {
    setPatientName(event.target.value);
  };

  // Handle birthdate input change
  const handleBirthdateChange = (event) => {
    setPatientBirthdate(event.target.value);
  };

  // Call onSave when the save button is clicked
  const handleSubmit = () => {
    if (!patientName || !patientBirthdate) {
      alert("Please provide both your name and birthdate.");
      return;
    }
    onSave(patientName, patientBirthdate);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h3>Enter your details</h3>
      
      <label>
        Name:
        <input 
          type="text" 
          value={patientName} 
          onChange={handleNameChange} 
          placeholder="Enter Patient's name" 
          style={{ display: 'block', width: '100%',marginTop: '10px', marginBottom: '10px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
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
