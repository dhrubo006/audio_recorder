import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioStreamer from "./components/audioRecorder"; // Streaming page
import DisplayManager from "./components/DisplayManager"; // New page to show Notes and Transcription

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AudioStreamer />} />
        <Route path="/display" element={<DisplayManager />} />
      </Routes>
    </Router>
  );
};

export default App;
