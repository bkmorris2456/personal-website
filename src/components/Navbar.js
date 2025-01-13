import * as React from "react";
import {
  AppBar,
  Toolbar,
  Tooltip,
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { GitHub, LinkedIn, Menu as MenuIcon, Close } from "@mui/icons-material";
import LeetCode from "../images/leetcode.svg";
import { Link as ScrollLink } from "react-scroll";

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

  // Toggle visibility of contact information
  const handleContactClick = () => {
    setShowContactInfo(!showContactInfo); // Toggle contact info visibility
  };

  // Common Box styling for navbars
  const commonNavbarStyles = {
    padding: "8px 16px",
    background: scrolled ? "rgba(255, 255, 255, 0.7)" : "transparent",
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
          {/* Left Side: Social Media Icons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
            {[
              { icon: <GitHub />, href: "https://github.com/bkmorris2456" },
              { icon: <LinkedIn />, href: "https://linkedin.com/in/bkmorris2024" },
              { 
                icon: (
                  <Box
                    component="img"
                    src={LeetCode}
                    alt="LeetCode"
                    sx={{
                      width: 24, 
                      height: 24,
                      transition: "filter 0.3s",
                      "&:hover": { filter: "brightness(0) saturate(100%) invert(55%) sepia(35%) saturate(1434%) hue-rotate(78deg) brightness(97%) contrast(95%)" }
                    }}
                  />
                ),
                href: "https://leetcode.com/u/bmorris56/"
              },
            ].map(({ icon, href }, index) => (
              <IconButton
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "black",
                  transition: "color 0.3s",
                  "&:hover": { color: "#4caf50" },
                }}
              >
                {icon}
              </IconButton>
            ))}
          </Box>

          {/* Center: Navigation Links */}
          <Box
            sx={{
              ...commonNavbarStyles,
              display: { xs: "none", md: "flex" },
            }}
          >
            {["home", "projects", "about"].map((item) => (
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
              display: { xs: "none", md: "flex" },
              gap: 2,
              alignItems: "center",
            }}
            onClick={handleContactClick}
          >
            <ScrollLink
              to="contact"
              smooth={true}
              duration={500}
              spy={true}
              offset={-70}
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#4caf50")}
              onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
            >
              Contact
            </ScrollLink>

            <a
              href="/path-to-resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                cursor: "pointer",
                textDecoration: "none",
                color: "inherit",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "color 0.3s",
              }}
              onMouseOver={(e) => (e.currentTarget.style.color = "#4caf50")}
              onMouseOut={(e) => (e.currentTarget.style.color = "inherit")}
            >
              Resume
            </a>
          </Box>

          {/* Collapsible Menu for Small Screens */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
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
          sx: { width: 250, padding: 1 },
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
        {["home", "projects", "about", "contact"].map((item) => (
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
            <img src={LeetCode} alt="LeetCode" style={{ width: "24px", height: "24px" }} />
          </ListItemIcon>
          <ListItemText>
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Instagram
            </a>
          </ListItemText>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}

export default Navbar;