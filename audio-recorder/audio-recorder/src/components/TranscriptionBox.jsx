import React, { useEffect, useState } from "react";

const TranscriptionBox = ({ selectedText }) => {
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

  // Function to render highlighted transcription text
  const renderHighlightedText = () => {
    if (!selectedText) return transcription;

    // Escape special characters in the selectedText to avoid regex issues
    const escapedSelectedText = selectedText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Split the transcription into parts by the selected text
    const regex = new RegExp(`(${escapedSelectedText})`, "gi");
    const parts = transcription.split(regex);

    return parts.map((part, index) => 
      regex.test(part) ? <mark key={index}>{part}</mark> : <span key={index}>{part}</span>
    );
  };

  return (
    <div style={{ flex: 1, border: '1px solid black', padding: '10px', height: '100vh', overflowY: 'auto' }}>
      <h3>Transcription</h3>
      {/* Render the transcription text with highlighted parts */}
      <div style={{ whiteSpace: 'pre-wrap' }}>
        {renderHighlightedText()}
      </div>
    </div>
  );
};

export default TranscriptionBox;
