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

export default function ProjectList() {
  const [expanded, setExpanded] = useState(null);
  const theme = useTheme();

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
                    alignItems: { xs: "flex-start", sm: "center" },
                  }}
                >
                  {project.logo && (
                    <Box
                      component="img"
                      src={project.logo}
                      alt={`${project.title} logo`}
                      sx={{
                        width: "80px",
                        height: "80px",
                        objectFit: "contain",
                        mt: { xs: 1, sm: 0 },
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: "0.95rem",
                        mb: 2,
                        textAlign: "justify",
                      }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
