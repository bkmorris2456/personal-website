import './App.css';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './features/home/Home.jsx';
import Login from './features/login/Login.jsx';
import ProtectedRoute from './features/login/ProtectedRoute.jsx';
import { AuthProvider } from './context/AuthContext';
import './fonts/fonts.css';
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./features/dashboard/Dashboard.jsx"));

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <HashRouter>
          <Routes>
            <Route index element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route
              path="/dashboard"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Dashboard />
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