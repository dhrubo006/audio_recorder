import React, { useState } from "react";
import NotesBox from "./NotesBox";
import TranscriptionBox from "./TranscriptionBox";

const DisplayManager = () => {
  const [selectedText, setSelectedText] = useState("");

  // Handle selected text from NotesBox
  const handleTextSelect = (text) => {
    setSelectedText(text); // Pass selected text to Transcription or other components
  };


  return (
    <div>
        <div style={{justifyContent: 'center'}}><h1>Result</h1></div>
        <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        height: '100vh', // Full height of the view
        padding: '20px', // Add some padding for visual spacing
        overflow: 'auto'
    }}>
      <NotesBox onTextSelect={handleTextSelect} />
      <TranscriptionBox selectedText={selectedText} />
    </div>
    

    </div>
    
  );
};

export default DisplayManager;
