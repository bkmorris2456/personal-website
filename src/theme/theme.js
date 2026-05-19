import { createTheme } from "@mui/material";

const fonts = {
  display: '"ClashDisplay", sans-serif',
  body: '"Satoshi", sans-serif',
};

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
      fontFamily: fonts.body,

      h1: {
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: "2.5rem",
      },
      h2: {
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: "2rem",
      },
      h3: {
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: "1.75rem",
      },

      h4: {
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: "1.4rem",
      },
      h5: {
        fontFamily: fonts.display,
        fontWeight: 700,
        fontSize: "1.2rem",
      },
      h6: {
        fontFamily: fonts.display,
        fontWeight: 600,
        fontSize: "1rem",
      },

      subtitle1: {
        fontFamily: fonts.body,
        fontWeight: 500,
      },
      subtitle2: {
        fontFamily: fonts.body,
        fontWeight: 500,
      },
      body1: {
        fontFamily: fonts.body,
        fontWeight: 400,
        fontSize: "1rem",
      },
      body2: {
        fontFamily: fonts.body,
        fontWeight: 400,
        fontSize: "0.9rem",
      },
      button: {
        fontFamily: fonts.body,
        fontWeight: 700,
        textTransform: "none",
      },
    },
  });