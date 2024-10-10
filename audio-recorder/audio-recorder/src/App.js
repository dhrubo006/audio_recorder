import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AudioStreamer from "./components/audioRecorder"; // Streaming page
import ResultPage from "./components/ResultPage"; // New page to show Notes and Transcription

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AudioStreamer />} />
        <Route path="/results" element={<ResultPage />} />
      </Routes>
    </Router>
  );
};

export default App;
