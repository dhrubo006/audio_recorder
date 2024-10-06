import React, { useState } from "react";

const AudioRecorder = () => {
  const [showPause, setShowPause] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div>
      {!showPause ? (
        <button
          onClick={() => {
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
                setIsPaused(true);
              }}
            >
              Pause
            </button>
          ) : (
            <button
              onClick={() => {
                setIsPaused(false);
              }}
            >
              Resume
            </button>
          )}

          <button
            onClick={() => {
              setShowPause(false);
              setIsPaused(false); // Reset the pause state after stopping
            }}
          >
            Stop
          </button>
        </>
      )}
    </div>
  );
};

export default AudioRecorder;
