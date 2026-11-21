import './App.css';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './features/home/Home.jsx';
import Login from './features/login/Login.jsx';
import { AuthProvider } from './context/AuthContext';
import './assets/fonts/fonts.css';
import { lazy, Suspense } from "react";

import UrsusStatus from "./features/brand/UrsusStatus";

const Dashboard = lazy(() => import("./features/dashboard/Dashboard.jsx"));

function App({ toggleTheme, mode }) {

  return (
    <div className="App">
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route index element={<Home toggleTheme={toggleTheme} mode={mode} />}/>
            <Route path="/home" element={<Home toggleTheme={toggleTheme} mode={mode} />}/>
            <Route path="/login" element={<Login mode={mode} />}/>
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={
                  <div className="ursus" data-mode={mode}>
                    <div className="u-container"><UrsusStatus state="loading" subject="dashboard" /></div>
                  </div>
                }>
                  <Dashboard mode={mode} toggleTheme={toggleTheme} />
                </Suspense>
              }
            />
            <Route path="*" element={<Navigate to="/home" replace />}/>
          </Routes>
        </HashRouter>
      </AuthProvider>
    </div>
  );
}

export default App;