import React, { useEffect, useState } from "react";

const NotesBox = () => {
  const [notes, setNotes] = useState("");

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

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
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
    <h3>Notes</h3>
    <textarea 
      value={notes} 
      onChange={handleNotesChange} 
      style={{
        width: '95%', 
        height: '100%', 
        padding: '10px', 
        fontSize: '16px',
        resize: 'vertical', 
        border: '1px solid #ccc',
        overflowX: 'hidden',
        whiteSpace: 'pre-wrap',
      }}
    />

  </div>
  );
};

export default NotesBox;
