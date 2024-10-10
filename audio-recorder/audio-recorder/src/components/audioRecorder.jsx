import React, { useState } from "react";
import RecordRTC from "recordrtc";

const AudioStreamer = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);
  const [showResult, setShowResult] = useState(false); // State for showing result box
  const [notes, setNotes] = useState(""); // State for notes
  const [transcription, setTranscription] = useState(""); // State for transcription

  const startStreaming = async () => {
    const ws = new WebSocket("ws://localhost:8000/audio-stream");

    ws.onopen = async () => {
      setSocket(ws);

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        const rec = new RecordRTC(stream, {
          type: "audio",
          mimeType: "audio/wav",
          timeSlice: 1000, // Send audio chunks every second
          ondataavailable: (blob) => {
            if (ws.readyState === WebSocket.OPEN) {
              ws.send(blob); // Send each WAV chunk to server
            }
          }
        });

        setRecorder(rec);
        setIsStreaming(true);
        setShowResult(false); // Hide result box when starting streaming

        rec.startRecording();
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setError("Could not access microphone. Please check permissions.");
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("Could not connect to the server. Please try again.");
    };
  };

  const stopStreaming = async () => {
    if (recorder) {
      recorder.stopRecording(() => {
        if (socket) {
          socket.close();
        }
      });
    }
    setIsStreaming(false);
    setIsPaused(false);
    setSocket(null);
    setRecorder(null);

    // Fetch notes and transcription via HTTP requests
    try {
      const notesResponse = await fetch("http://localhost:8000/get-notes/");
      const notesData = await notesResponse.json();
      setNotes(notesData.notes);

      const transcriptionResponse = await fetch("http://localhost:8000/get-transcription/");
      const transcriptionData = await transcriptionResponse.json();
      setTranscription(transcriptionData.transcription);

    } catch (error) {
      console.error("Error fetching notes or transcription:", error);
    }

    setShowResult(true); // Show the result box after stopping the stream
  };

  const pauseStreaming = () => {
    if (recorder) {
      recorder.pauseRecording();
      setIsPaused(true);
    }
  };

  const resumeStreaming = () => {
    if (recorder) {
      recorder.resumeRecording();
      setIsPaused(false);
    }
  };

  return (
    <div>
      {!isStreaming ? (
        <button onClick={startStreaming}>Start Streaming</button>
      ) : (
        <>
          {!isPaused ? (
            <button onClick={pauseStreaming}>Pause Streaming</button>
          ) : (
            <button onClick={resumeStreaming}>Resume Streaming</button>
          )}

          <button onClick={stopStreaming} style={{ marginLeft: '10px' }}>
            Stop Streaming
          </button>
        </>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Show box with notes and transcription when streaming stops */}
      {showResult && (
        <div style={{ display: 'flex', border: '1px solid black', marginTop: '20px' }}>
          <div style={{ flex: 1, padding: '10px', borderRight: '1px solid black' }}>
            <h3>Notes</h3>
            <p>{notes}</p>
          </div>
          <div style={{ flex: 1, padding: '10px' }}>
            <h3>Transcription</h3>
            <p>{transcription}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioStreamer;
