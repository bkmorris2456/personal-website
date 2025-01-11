import * as React from "react";
import { AppBar, Toolbar, Box, IconButton, Typography } from "@mui/material";
import { GitHub, LinkedIn, Instagram } from "@mui/icons-material";
import { Link as ScrollLink } from "react-scroll";

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);

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
            justifyContent: "center",
          }}
        >
          <Box sx={commonNavbarStyles}>
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
        </Toolbar>
      </AppBar>

      {/* Navbar 1: Social Media Icons */}
      <Box
        sx={{
          ...commonNavbarStyles,
          position: "fixed",
          top: "4px",
          left: "16px",
          zIndex: 1000,
        }}
      >
        {/* Social Media Icons */}
        {[
          { icon: <GitHub />, href: "https://github.com/" },
          { icon: <LinkedIn />, href: "https://linkedin.com/" },
          { icon: <Instagram />, href: "https://instagram.com/" },
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

      {/* Navbar 2: Extras */}
      <Box
        sx={{
          ...commonNavbarStyles,
          position: "fixed",
          top: "5px",
          right: "16px",
          zIndex: 1000,
        }}
      >
        {/* Contact Button */}
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

        {/* Resume Button */}
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
    </React.Fragment>
  );
}

export default Navbar;
