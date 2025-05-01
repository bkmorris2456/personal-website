import React, { useRef, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
    { id: 1, title: "Portfolio Website", status: "Completed", tags: ["React", "MUI"] },
    { id: 2, title: "Prosperity Wellness App", status: "Upcoming", tags: ["TBD"] },
    { id: 3, title: "Gedara", status: "In Progress", tags: ["React Native", "JavaScript", "Firebase"] },
    { id: 4, title: "AI Chatbot", status: "Upcoming", tags: ["TBD"] },
];

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
        <Box sx={{ maxWidth: "100%", overflow: "hidden", p: 2 }}>
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
                    // borderRadius: "999px",
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
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                    border: "1px solid #ccc",
                    borderRadius: "12px",
                    padding: "16px",
                    background: "#1e1e1e",
                    color: "#ffffff",
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                    {project.title}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {project.tags.map((tag, i) => (
                        <Chip 
                        key={i} 
                        label={tag} 
                        variant="outlined" 
                        sx={{
                            color: "000",
                            backgroundColor: "224730",
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