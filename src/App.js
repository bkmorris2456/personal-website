import './App.css';
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import './fonts/fonts.css';

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
                <ProtectedRoute>
                  <Dashboard/>
                </ProtectedRoute>
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