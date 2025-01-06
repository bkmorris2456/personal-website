import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import Home from './pages/Home';
import About from './pages/About';
import axios from 'axios';
import './fonts/fonts.css';

function App() {

  const [message, setMessage] = useState('');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;