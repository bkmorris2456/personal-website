import React, { useRef, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../components/projects.json";

const tabs = ["Completed", "In Progress", "Upcoming"];

export default function ProjectTabs() {
    const [selectedTab, setSelectedTab] = useState("Completed");
    const tabRefs = useRef([]);

    const handleTabClick = (tab, index) => {
        setSelectedTab(tab);
        if (tabRefs.current[index]) {
            tabRefs.current[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        }
    };

    const filteredProjects = projects.filter(project => project.status === selectedTab);

    return (
        <Box 
        sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "100%", 
            margin: "0 auto",
            p: 2
        }}
        >
            {/* Tab bar */}
            <Box
            sx={{
                display: "flex",
                gap: 2,
                overflowX: "auto",
                pb: 1,
                scrollbarWidth: "none",
                "&::-webkit-scrollbar": { display: "none" },
            }}
            >
            {tabs.map((tab, i) => (
                <motion.div
                key={tab}
                ref={el => (tabRefs.current[i] = el)}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleTabClick(tab, i)}
                style={{
                    flexShrink: 0,
                    padding: "6px 16px",
                    cursor: "pointer",
                    background: tab === selectedTab ? "#224730" : "#e0e0e0",
                    color: tab === selectedTab ? "#fff" : "#333",
                    fontWeight: 500,
                    transition: "0.3s",
                    whiteSpace: "nowrap",
                }}
                >
                {tab}
                </motion.div>
            ))}
            </Box>

            {/* Project Cards */}
            <Box sx={{ mt: 3, display: "grid", gap: 2 }}>
            <AnimatePresence mode="wait">
                {filteredProjects.map(project => (
                <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{}}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    whileHover={{y: -5, boxShadow: "0 8px 20px rgba(0,0,0,0.2)"}}
                    onClick={() => console.log(`Clicked on ${project.title}`)}
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "16px",
                        padding: "24px",
                        background: "#1e1e1e",
                        color: "#ffffff",
                        cursor: "pointer",
                        maxWidth: "90%", // Optional, can also use e.g., "700px"
                        width: "100%",
                        boxSizing: "border-box",
                        margin: "0 auto",
                        fontSize: "1.1rem",
                      }}
                >
                    <Typography variant="h5" gutterBottom>
                    {project.title}
                    </Typography>
                
                    
                    {/* Project Tags */}
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
                    {project.tags.map((tag, i) => (
                        <Chip 
                        key={i} 
                        label={tag} 
                        variant="outlined" 
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            color: "#fff",
                            backgroundColor: "224730",
                            fontSize: "0.9rem",
                            padding: "4px 10px",
                            borderRadius: "16px",
                        }} 
                        />
                    ))}
                    </Box>
                </motion.div>
                ))}
            </AnimatePresence>
            </Box>
        </Box>
    );
}