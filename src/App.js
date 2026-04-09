import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import './fonts/fonts.css';

function App() {

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;