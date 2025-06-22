import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Collapse,
  Chip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../components/projects.json";

// Project Logos
import Roomary from "../images/roomary-logo-with-text.png"

const logoMap = {
  "roomary": Roomary
};

export default function ProjectList() {
  const [expanded, setExpanded] = useState(null);

  const handleExpandClick = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  return (
    <Box sx={{ px: 2, width: "100%", display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: "75vw", display: "flex", flexDirection: "column", gap: 3, marginBottom: 10 }}>
        <AnimatePresence>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{
                width: "100%",
                background: "#1e1e1e",
                border: "1px solid #ccc",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {/* Bar Header */}
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  px: 3,
                  py: 2,
                  minHeight: "70px",
                  cursor: "pointer",
                }}
                onClick={() => handleExpandClick(project.id)}
              >
                <Typography
                  variant="h6"
                  sx={{
                    flex: 1,
                    fontSize: { xs: "1rem", sm: "1.25rem" },
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textAlign: "left",
                  }}
                >
                  {project.title}, {project.label}
                </Typography>
                <IconButton
                  size="small"
                  sx={{ color: "#fff" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleExpandClick(project.id);
                  }}
                >
                  {expanded === project.id ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </Box>

              {/* Dropdown Content */}
              <Collapse in={expanded === project.id} timeout="auto" unmountOnExit>
                <Box
                  sx={{
                    px: 3,
                    pb: 3,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: 3,
                    alignItems: { xs: "flex-start", sm: "flex-start" },
                  }}
                >
                  {/* Image */}
                  <Box
                    sx={{
                      width: { xs: "100%", sm: "35%" },
                      maxWidth: "20vw",
                      height: "auto",
                      borderRadius: "16px",
                      overflow: "hidden",
                      backgroundColor: "#fff",
                      alignSelf: "center",
                      margin: {lg: "50px" }
                    }}
                  >
                    <Box
                      component="img"
                      src={logoMap[project.logo]}
                      alt={`${project.title} logo`}
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>

                  {/* Text + Tags Wrapper */}
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: { xs: "flex-start", sm: "center" }, // ⬅️ center vertically on sm+
                      alignItems: { xs: "flex-start", lg: "center" },
                      textAlign: { xs: "left", lg: "center" },
                      px: { xs: 0, sm: 2 },
                      height: "100%", // ⬅️ ensure it stretches fully
                    }}
                  >
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: { xs: "18px", sm: "20px" },
                        mb: 2,
                        maxWidth: "600px",
                        textAlign: "left",
                        justifyContent: "center",
                        marginTop: "5vh",
                      }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: { xs: "flex-start", lg: "center" }, gap: 1 }}>
                      {project.tags.map((tag, i) => (
                        <Chip
                          key={i}
                          label={tag}
                          variant="outlined"
                          sx={{
                            color: "#fff",
                            backgroundColor: "#224730",
                            fontSize: "0.75rem",
                            borderRadius: "16px",
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </Box>
              </Collapse>
            </motion.div>
          ))}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
