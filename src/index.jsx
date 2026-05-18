import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './assets/fonts/fonts.css';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material";
import { getAppTheme } from "./theme/theme";

const root = ReactDOM.createRoot(document.getElementById('root'));

function RootComponent() {
  // Load dark mode preference from localStorage
  const storedTheme = localStorage.getItem("themeMode") || "dark";
  const [mode, setMode] = useState(storedTheme);

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  // Function to toggle theme
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("themeMode", newMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Ensures default MUI styles for dark mode */}
      <App toggleTheme={toggleTheme} mode={mode} />
    </ThemeProvider>
  );
}

root.render(
  <React.StrictMode>
    <RootComponent />
  </React.StrictMode>
);

reportWebVitals();
