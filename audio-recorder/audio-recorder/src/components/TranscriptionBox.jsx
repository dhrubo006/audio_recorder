import React, { useEffect, useState } from "react";

const TranscriptionBox = () => {
  const [transcription, setTranscription] = useState("");

  useEffect(() => {
    const fetchTranscription = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-transcription/");
        const data = await response.json();
        setTranscription(data.transcription);
      } catch (error) {
        console.error("Error fetching transcription:", error);
      }
    };

    fetchTranscription();
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
      <h3>Transcription</h3>
      <p>{transcription}</p>
    </div>
  );
};

export default TranscriptionBox;
