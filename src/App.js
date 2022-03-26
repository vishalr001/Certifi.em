import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Generate from './components/pages/Generate';
import Verify from './components/pages/Verify';
import Download from './components/pages/Download';


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/verify" element={<Verify />} />
          {/* <Route path="/download" element={<Download />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
