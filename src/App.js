import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import Home from './pages/Home';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import About from './pages/About';
import Applications from './pages/Applications';
import axios from 'axios';

function App() {

  const [message, setMessage] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/resume" element={<Resume/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/applications" element={<Applications/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;