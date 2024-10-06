import React, { useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import axios from "axios";

const AudioRecorder = () => {
  const [showPause, setShowPause] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [error, setError] = useState(null);

  const handleStopRecording = (blobUrl, blob) => {
    setAudioURL(blobUrl);
    const formData = new FormData();
    formData.append("file", blob, "audio.wav");

    // Send the audio file to the backend
    axios
      .post("http://localhost:8000/upload-audio/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Audio uploaded successfully:", response.data);
        setAudioURL(response.data.audioUrl); // assuming your backend returns a URL for the uploaded file
      })
      .catch((error) => {
        console.error("Error uploading audio:", error);
        setError("Failed to upload audio. Please try again.");
      });
  };

  return (
    <div>
      <ReactMediaRecorder
        audio
        onStop={handleStopRecording}
        render={({ startRecording, stopRecording, pauseRecording, resumeRecording, mediaBlobUrl }) => (
          <div>
            {!showPause ? (
              <button
                onClick={() => {
                  startRecording();
                  setShowPause(true);
                }}
              >
                Record
              </button>
            ) : (
              <>
                {!isPaused ? (
                  <button
                    onClick={() => {
                      pauseRecording();
                      setIsPaused(true);
                    }}
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      resumeRecording();
                      setIsPaused(false);
                    }}
                  >
                    Resume
                  </button>
                )}

                <button
                  onClick={() => {
                    stopRecording();
                    setShowPause(false);
                    setIsPaused(false); // Reset the pause state after stopping
                  }}
                >
                  Stop
                </button>
              </>
            )}

            {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
          </div>
        )}
      />
      
      {audioURL && (
        <div>
          <p>Uploaded Audio:</p>
          <audio src={audioURL} controls />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AudioRecorder;