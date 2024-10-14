import React, { useEffect, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css"; // Import the default styles
import PopupForm from "./PopupForm"; // Import the PopupForm component

const NotesBox = () => {
  const [notes, setNotes] = useState("");


  // Fetch the initial notes when the component loads
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-notes/");
        const data = await response.json();
        setNotes(data.notes);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  // Update the notes as the user types in the textarea
  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  // Save the notes with additional user info
  const saveNotes = async (fullName, firstName, lastName, birthdate, closePopup) => {
    try {
      const response = await fetch("http://localhost:8000/save-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          notes, 
          first_name: firstName,
          last_name: lastName,
          full_name: fullName, 
          birthdate: birthdate  
        }),
      });
      if (response.ok) {
        alert("Notes saved successfully!");
      } else {
        alert("Failed to save notes.");
      }
      closePopup();  // Close the popup after successful save
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  // Confirm before deleting notes
  const confirmDelete = async () => {
    const userConfirmed = window.confirm("Are you sure you want to delete the notes?");
    if (userConfirmed) {
      deleteNotes(); // Call the delete function if confirmed
    }
  };

  // Delete the notes (clears the textarea and optionally deletes on the backend)
  const deleteNotes = async () => {
    setNotes(""); // Clear the textarea

    try {
      const response = await fetch("http://localhost:8000/delete-notes", {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Notes deleted successfully!");
      } else {
        alert("Failed to delete notes.");
      }
    } catch (error) {
      console.error("Error deleting notes:", error);
    }
  };

  return (
    <div style={{ 
        flex: 1, 
        border: '1px solid black', 
        padding: '10px', 
        marginRight: '10px', 
        height: '100vh', 
        overflowY: 'auto' 
    }}>
      {/* Flex container for heading and buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h3>Notes</h3>
        <div>
          {/* Save Button */}
          <Popup 
            trigger={<button 
              style={{
                marginRight: '10px', 
                padding: '5px 15px', 
                fontSize: '14px', 
                cursor: 'pointer'
              }}>Save</button>} 
            modal
            closeOnDocumentClick={false}
          >
            {close => (
              <PopupForm 
                onSave={(fullName, firstName, lastName, birthdate) => saveNotes(fullName, firstName, lastName, birthdate, close)} 
                onCancel={close} 
              />
            )}
          </Popup>

          {/* Delete Button */}
          <button 
            onClick={confirmDelete}
            style={{
              padding: '5px 15px', 
              fontSize: '14px', 
              cursor: 'pointer'
            }}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Editable textarea */}
      <textarea 
        value={notes} 
        onChange={handleNotesChange} 
        style={{
          width: '95%', 
          height: '100%', 
          padding: '10px', 
          fontSize: '16px',
          resize: 'vertical', 
          overflowX: 'hidden', 
          whiteSpace: 'pre-wrap', 
          border: '1px solid #ccc'
        }}
      />
    </div>
  );
};

export default NotesBox;
