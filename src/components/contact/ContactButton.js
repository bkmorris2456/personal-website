import { motion, AnimatePresence } from "framer-motion";
import { MenuItem, Typography, Box } from "@mui/material";
import React from "react";

function ContactButton() {
  const [showContactInfo, setShowContactInfo] = React.useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <MenuItem
        onClick={() => setShowContactInfo((prev) => !prev)}
        sx={{
          textDecoration: "none",
          color: "inherit",
          fontSize: "16px",
          textTransform: "none",
        }}
      >
        Contact
      </MenuItem>

      {/* Sliding Pop-up Box */}
      <AnimatePresence>
        {showContactInfo && (
          <motion.div
            key="contact-popup"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "100%",
              background: "white",
              borderRadius: "8px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "16px",
              zIndex: 10,
            }}
          >
            <Typography
              sx={{
                fontSize: "13px",
                textAlign: "left",
                color: "black",
              }}
            >
              Email: bkmorris2024@gmail.com
            </Typography>
            <Typography
              sx={{
                fontSize: "13px",
                textAlign: "left",
                color: "black",
                marginTop: "8px",
              }}
            >
              Phone: (248) 925-8946
            </Typography>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}

export default ContactButton;
