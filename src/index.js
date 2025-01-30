import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './fonts/fonts.css';
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

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
          fontFamily: '"CustomFont", sans-serif',
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
