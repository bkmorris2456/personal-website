import { createTheme } from "@mui/material";

export const getAppTheme = (mode = "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#4A6958",
        light: "#6F8F7A",
      },
      secondary: {
        main: "#435146",
      },
      background: {
        default: mode === "dark" ? "#1C1C1C" : "#F5F7F2",
        paper: mode === "dark" ? "#1B2922" : "#FFFFFF",
        elevated: mode === "dark" ? "#435146" : "#E7ECE8",
      },
      text: {
        primary: mode === "dark" ? "#F5F7F2" : "#1C1C1C",
        secondary:
          mode === "dark"
            ? "rgba(245,247,242,0.72)"
            : "rgba(28,28,28,0.72)",
        muted:
          mode === "dark"
            ? "rgba(245,247,242,0.55)"
            : "rgba(28,28,28,0.55)",
      },
      divider:
        mode === "dark"
          ? "rgba(245,247,242,0.12)"
          : "rgba(28,28,28,0.12)",
    },
    typography: {
      fontFamily: '"ClashDisplay", sans-serif',
      h1: { fontWeight: 700, fontSize: "2.5rem" },
      h2: { fontWeight: 700, fontSize: "2rem" },
      h3: { fontWeight: 700, fontSize: "1.75rem" },
      body1: { fontWeight: 400, fontSize: "1rem" },
      body2: { fontWeight: 400, fontSize: "0.9rem" },
      button: { fontWeight: 700, textTransform: "none" },
    },
  });