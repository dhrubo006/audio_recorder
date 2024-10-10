import React from "react";
import NotesBox from "./NotesBox";
import TranscriptionBox from "./TranscriptionBox";

const ResultPage = () => {
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
      <NotesBox />
      <TranscriptionBox />
    </div>
    

    </div>
    
  );
};

export default ResultPage;
