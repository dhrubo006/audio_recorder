import React, { useState } from "react";
import RecordRTC from "recordrtc";

const AudioStreamer = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);

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

  const stopStreaming = () => {
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
    </div>
  );
};

export default AudioStreamer;
