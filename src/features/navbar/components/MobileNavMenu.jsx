import { useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import {
  mobileSectionNavItems,
  externalNavItems,
} from "../constants/navItems";

function MobileNavMenu({ anchorEl, open, onClose }) {
  const [showContactInfo, setShowContactInfo] = useState(false);

  const handleClose = () => {
    setShowContactInfo(false);
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 250,
          padding: 1,
          background: "rgba(0, 0, 0, 0.7)",
          backdropFilter: "blur(10px)",
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          overflow: "visible",
        },
      }}
    >
      <IconButton onClick={handleClose} sx={{ alignSelf: "flex-end", marginBottom: 1 }}>
        <Close />
      </IconButton>

      <Divider />

      {mobileSectionNavItems.map((item) => (
        <MenuItem key={item.to} onClick={handleClose}>
          <ScrollLink
            to={item.to}
            smooth
            duration={500}
            spy
            offset={-70}
            style={{
              textDecoration: "none",
              color: "inherit",
              fontSize: "16px",
              textTransform: "none",
            }}
          >
            {item.label}
          </ScrollLink>
        </MenuItem>
      ))}

      <MenuItem
        onClick={() => setShowContactInfo((prev) => !prev)}
        sx={{
          position: "relative",
          textDecoration: "none",
          color: "inherit",
          fontSize: "16px",
          textTransform: "none",
        }}
      >
        Contact

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
                top: 0,
                left: "100%",
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                padding: "16px",
                zIndex: 10,
                color: "white",
                width: "220px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
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

      {externalNavItems.map(({ label, href, Icon }) => (
        <MenuItem key={label}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {label}
            </a>
          </ListItemText>
        </MenuItem>
      ))}
    </Menu>
  );
}

export default MobileNavMenu;