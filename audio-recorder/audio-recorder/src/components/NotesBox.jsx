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

  return (
    <div style={{ 
      flex: 1, 
      border: '1px solid black', 
      padding: '10px', 
      marginRight: '10px', 
      height: '100vh', // Set height to 100% of the view height
      overflowY: 'auto' // Enable scrolling for overflow content
  }}>
      <h3>Notes</h3>
      <p>{notes}</p>
    </div>
  );
};

export default NotesBox;
