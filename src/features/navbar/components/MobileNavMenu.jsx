import { useState } from "react";
import {
  Box,
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
import {
  mobileMenuPaperSx,
  mobileMenuCloseButtonSx,
  mobileScrollLinkStyle,
  mobileContactMenuItemSx,
  mobileContactPopupMotionStyle,
  mobileContactPopupSx,
  mobileContactTextSx,
  mobileContactPhoneSx,
  externalLinkStyle,
} from "../../../styles/navbarStyles";

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
      PaperProps={{ sx: mobileMenuPaperSx }}
    >
      <IconButton onClick={handleClose} sx={mobileMenuCloseButtonSx}>
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
            style={mobileScrollLinkStyle}
          >
            {item.label}
          </ScrollLink>
        </MenuItem>
      ))}

      <MenuItem
        onClick={() => setShowContactInfo((prev) => !prev)}
        sx={mobileContactMenuItemSx}
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
              style={mobileContactPopupMotionStyle}
            >
              <Box sx={mobileContactPopupSx}>
                <Typography sx={mobileContactTextSx}>
                  Email: bkmorris2024@gmail.com
                </Typography>
                <Typography sx={mobileContactPhoneSx}>
                  Phone: (248) 925-8946
                </Typography>
              </Box>
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
              style={externalLinkStyle}
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