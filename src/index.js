import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './fonts/fonts.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "devicon/devicon.min.css";


const root = ReactDOM.createRoot(document.getElementById('root'));

function RootComponent() {
  // Load dark mode preference from localStorage
  const storedTheme = localStorage.getItem("themeMode") || "dark";
  const [mode, setMode] = useState(storedTheme);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode, // Supports "light" or "dark"
          primary: {
            main: "#224730",
          },
          secondary: {
            main: "#484b4a",
          },
          bright: {
            main: "#FFFFFF",
          },
          background: {
            default: mode === "dark" ? "#121212" : "#FFFFFF",
            paper: mode === "dark" ? "#1E1E1E" : "#F5F5F5",
          },
          text: {
            primary: mode === "dark" ? "#FFFFFF" : "#000000",
          },
        },
        typography: {
          fontFamily: '"ClashDisplay"',

          h1: {
            fontWeight: 700, // bold Inter
            fontSize: '2.5rem',
          },
          h2: {
            fontWeight: 700,
            fontSize: '2rem',
          },
          h3: {
            fontWeight: 700,
            fontSize: '1.75rem',
          },
          body1: {
            fontWeight: 400, // normal Inter
            fontSize: '1rem',
            opacity: 0.8,
          },
          body2: {
            fontWeight: 400,
            fontSize: '0.9rem',
            opacity: 0.8,
          },
          button: {
            fontWeight: 700,
            textTransform: 'none',
          },
        },
      }),
    [mode]
  );

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
