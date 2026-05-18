import { motion, AnimatePresence } from "framer-motion";
import { MenuItem, Typography, Box } from "@mui/material";
import React from "react";
import {
  contactButtonWrapperSx,
  contactMenuItemSx,
  contactPopupMotionStyle,
  contactPopupSx,
  contactPopupTextSx,
  contactPopupPhoneSx,
} from "../../styles/contactStyles";

function ContactButton() {
  const [showContactInfo, setShowContactInfo] = React.useState(false);

  return (
    <Box sx={contactButtonWrapperSx}>
      <MenuItem
        onClick={() => setShowContactInfo((prev) => !prev)}
        sx={contactMenuItemSx}
      >
        Contact
      </MenuItem>

      <AnimatePresence>
        {showContactInfo && (
          <motion.div
            key="contact-popup"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={contactPopupMotionStyle}
          >
            <Box sx={contactPopupSx}>
              <Typography sx={contactPopupTextSx}>
                Email: bkmorris2024@gmail.com
              </Typography>

              <Typography sx={contactPopupPhoneSx}>
                Phone: (248) 925-8946
              </Typography>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default ContactButton;