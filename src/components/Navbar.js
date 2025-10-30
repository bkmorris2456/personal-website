import * as React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { GitHub, LinkedIn,  Menu as MenuIcon, Close } from "@mui/icons-material";
import ComputerIcon from '@mui/icons-material/Computer';
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showContactInfo, setShowContactInfo] = React.useState(false);
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
    setShowContactInfo(false); // Close contact pop-up
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
          {/* Left Side: Social Media Icons */}
          {/* <Box sx={{ 
              ...frostedGlassBox,
              display: { xs: "none", md: "flex" },
              width: "auto",
              padding: "6px 12px",
              marginTop: "8px",
              marginLeft: "-1vw",
          }}>
            {[
              { icon: <GitHub />, href: "https://github.com/bkmorris2456" },
              { icon: <LinkedIn />, href: "https://linkedin.com/in/bkmorris2024" },
              { icon: <ComputerIcon/>, href: "https://leetcode.com/u/bmorris56/" }
            ].map(({ icon, href }, index) => (
              <IconButton
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "white",
                  transition: "color 0.3s",
                  "&:hover": { color: "#224730" },
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Box> */}

          {/* Center: Navigation Links */}
          <Box
            sx={{
              ...frostedGlassBox,
              display: { xs: "none", md: "flex" },
            }}
          >
            {["home", "experience", "skills", "projects", "contact"].map((item) => (
              <ScrollLink
                key={item}
                to={item}
                smooth={true}
                duration={500}
                spy={true}
                offset={-70}
                style={{
                  cursor: "pointer",
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "18px",
                  textTransform: "none",
                  fontWeight: "bold",
                  transition: "color 0.3s",
                }}
                activeStyle={{ color: "#4caf50" }}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </ScrollLink>
            ))}
          </Box>

          {/* Right Side: Resume and Contact */}
          <Box
            sx={{
              ...frostedGlassBox,
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
              position: "relative"
            }}
          >
            {/* <Typography
              onClick={() => setShowContactInfo((prev) => !prev)}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "color 0.3s",
                "&:hover": { color: "#4caf50" },
              }}
            >
              Contact Me
            </Typography> */}

            {/* Animated Contact Info Pop-Up */}
            {/* <AnimatePresence>
              {showContactInfo && (
                <motion.div
                  key="contact-popup"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: "absolute",
                    top: "100%", // Position below the button
                    right: 0, // Align to the right
                    background: "rgba(0, 0, 0, 0.6)", // Adjust translucency (lower alpha value for more translucency)
                    backdropFilter: "blur(10px)", // Same blur effect as the dropdown menu
                    borderRadius: "16px", // Match dropdown's rounded corners
                    padding: "16px", // Padding inside the box
                    zIndex: 10, // Higher stacking order
                    color: "white", // White text
                    width: "220px", // Box width
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Slightly stronger shadow
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "13px",
                      textAlign: "left",
                      color: "white",
                    }}
                  >
                    Email: bkmorris2024@gmail.com
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      textAlign: "left",
                      color: "white",
                      marginTop: "8px",
                    }}
                  >
                    Phone: (248) 925-8946
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence> */}
          </Box>

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
      <Menu
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: { 
            width: 250, 
            padding: 1,
            background: "rgba(0, 0, 0, 0.7)", // Translucent black background
            backdropFilter: "blur(10px)", // Apply blur effect
            borderRadius: "16px", // Rounded corners
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Optional shadow
            overflow: "visible", // Ensure the dropdown doesn't clip the content
          },
        }}
      >
        <IconButton
          onClick={handleMenuClose}
          sx={{ alignSelf: "flex-end", marginBottom: 1 }}
        >
          <Close />
        </IconButton>
        <Divider />

        {/* Navigation Links */}
        {["home", "projects", "experience"].map((item) => (
          <MenuItem key={item} onClick={handleMenuClose}>
            <ScrollLink
              to={item}
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
              style={{
                textDecoration: "none",
                color: "inherit",
                fontSize: "16px",
                textTransform: "none",
              }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </ScrollLink>
          </MenuItem>
        ))}

        <MenuItem
          onClick={() => setShowContactInfo((prev) => !prev)} // Toggle the state
          sx={{
            position: "relative", // Required for the pop-up positioning
            textDecoration: "none",
            color: "inherit",
            fontSize: "16px",
            textTransform: "none",
          }}
        >
          Contact

          {/* Contact Info Pop-Up */}
          <AnimatePresence>
            {showContactInfo && (
              <motion.div
                key="dropdown-contact-popup"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 10 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  top: 0, // Align with the button
                  left: "100%", // Position it outside the dropdown width
                  background: "rgba(0, 0, 0, 0.6)", // Adjust translucency (lower alpha value for more translucency)
                  backdropFilter: "blur(10px)", // Same blur effect as the dropdown menu
                  borderRadius: "16px", // Match dropdown's rounded corners
                  padding: "16px", // Padding inside the box
                  zIndex: 10, // Higher stacking order
                  color: "white", // White text
                  width: "220px", // Box width
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", // Slightly stronger shadow
                }}
              >
                <Typography sx={{ fontSize: "13px", marginBottom: "4px" }}>
                  Email: bkmorris2024@gmail.com
                </Typography>
                <Typography sx={{ fontSize: "13px" }}>
                  Phone: (248) 925-8946
                </Typography>
              </motion.div>
            )}
          </AnimatePresence>
        </MenuItem>

        <MenuItem>
          <ListItemIcon>
            <GitHub />
          </ListItemIcon>
          <ListItemText>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              GitHub
            </a>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <LinkedIn />
          </ListItemIcon>
          <ListItemText>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              LinkedIn
            </a>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ComputerIcon />
          </ListItemIcon>
          <ListItemText>
            <a
              href="https://leetcode.com/u/bmorris56/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Leetcode
            </a>
          </ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default Navbar;