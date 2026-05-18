import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

import DesktopNav from "./components/DesktopNav";
import MobileNavMenu from "./components/MobileNavMenu.jsx";

function Navbar({toggleTheme, mode}) {
  const [scrolled, setScrolled] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);

  // Track scroll position
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Translucent Container Styling for Navbar
  const frostedGlassBox = {
    padding: "8px 16px",
    background: scrolled ? "rgba(0, 0, 0, 0.7)" : "transparent",
    backdropFilter: scrolled ? "blur(10px)" : "none",
    borderRadius: "24px",
    transition: "background 0.3s ease, backdrop-filter 0.3s ease",
    display: "flex",
    gap: 2,
    alignItems: "center",
  };


  // Menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {/* Main Center Navbar */}
      <AppBar
        elevation={0}
        sx={{
          background: "transparent",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >

          {/* Navigation Links */}
          <DesktopNav sx={frostedGlassBox}/>

          {/* Collapsible Menu for Small Screens */}
          <IconButton
            sx={{ 
              display: { xs: "flex", md: "none" },
              background: "rgba(0, 0, 0, 0.7)", // Translucent black background
              backdropFilter: "blur(10px)", // Apply blur effect
              borderRadius: "16px", // Rounded corners
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow
            }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Dropdown Menu */}
      <MobileNavMenu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
      />
    </React.Fragment>
  );
}

export default Navbar;