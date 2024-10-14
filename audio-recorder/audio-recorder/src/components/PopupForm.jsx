import React, { useState } from "react";

const PopupForm = ({ onSave, onCancel, note }) => {
  const [userName, setUserName] = useState("");  // State to track the user's name
  const [userBirthdate, setUserBirthdate] = useState("");  // State to track the user's birthdate

  // Handle form submission (when "Save" is clicked)
  const handleSave = () => {
    if (userName && userBirthdate) {
      // Pass the name, birthdate, and note to the onSave function
      onSave(userName, userBirthdate);
    } else {
      alert("Please enter both name and birthdate.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.popup}>
        <h3>Provide Your Details</h3>
        <form>
          <div style={styles.formGroup}>
            <label>Name:</label>
            <input 
              type="text" 
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Birthdate:</label>
            <input 
              type="date" 
              value={userBirthdate}
              onChange={(e) => setUserBirthdate(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.buttons}>
            <button type="button" onClick={handleSave} style={styles.saveButton}>
              Save
            </button>
            <button type="button" onClick={onCancel} style={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Inline styles for the popup
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    width: "400px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "8px",
    fontSize: "14px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
  },
  saveButton: {
    padding: "10px 20px",
    backgroundColor: "green",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    backgroundColor: "red",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default PopupForm;
