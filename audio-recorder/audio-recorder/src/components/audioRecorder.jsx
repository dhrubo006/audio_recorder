import React, { useState } from "react";

const AudioStreamer = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [error, setError] = useState(null);
  const [socket, setSocket] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startStreaming = () => {
    const ws = new WebSocket("ws://localhost:8000/audio-stream");

    ws.onopen = () => {
      setSocket(ws);
      setIsStreaming(true);

      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          setMediaRecorder(recorder);

          recorder.ondataavailable = (event) => {
            if (event.data.size > 0 && ws.readyState === WebSocket.OPEN) {
              ws.send(event.data);
            }
          };

          recorder.onerror = (e) => {
            console.error("Recording error:", e);
            setError("Error during recording. Please try again.");
            stopStreaming();
          };

          recorder.start(1000); // Send data every second (1000 ms)
        })
        .catch((err) => {
          console.error("Error accessing microphone:", err);
          setError("Could not access microphone. Please check permissions.");
        });
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setError("Could not connect to the server. Please try again.");
      stopStreaming();
    };
  };

  const stopStreaming = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
    if (socket) {
      socket.close();
    }
    setIsStreaming(false);
    setIsPaused(false);
    setSocket(null);
    setMediaRecorder(null);
  };

  const pauseStreaming = () => {
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.pause();
      setIsPaused(true);
    }
  };

  const resumeStreaming = () => {
    if (mediaRecorder && mediaRecorder.state === "paused") {
      mediaRecorder.resume();
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
