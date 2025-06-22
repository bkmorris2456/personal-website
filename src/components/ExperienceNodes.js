import React, { useRef, useState } from "react";
import { Box, Typography, Chip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import experience from "./experience.json";
import Tag from "./SkillTag";

export default function ExperienceNodes({ id }) {

    return (
        <Box
            id={id}
            sx={{ flex: 1, p: { xs: 2, sm: 4, md: 6 }, maxWidth: "100%", mx: "auto", marginTop: "1vh", marginBottom: "12vh" }}
        >
            <Box sx={{ textAlign: "center", mb: 8 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Typography
                        variant="h2"
                        sx={{ fontSize: { xs: "30px", sm: "40px" }, mb: "4vh", mt: "4vh" }}
                    >
                        Experience
                    </Typography>
                </motion.div>
            </Box>

            {experience.map((exp, idx) => (
                <Box key={exp.id} sx={{ mb: 8, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                    >
                        <Typography
                            variant="h4"
                            sx={{ textAlign: "center", fontSize: { xs: "24px", sm: "30px" }, mb: "2vh" }}
                        >
                            {exp.title} – {exp.company}
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{ textAlign: "center", fontSize: { xs: "12px", sm: "16px" }, mb: "2vh" }}
                        >
                            {exp.start} - {exp.end}
                        </Typography>

                        <Box sx={{ maxWidth: { sm: "40vw" }, mx: "auto" }}>
                            {exp.description.map((desc, i) => (
                                <Typography
                                    key={i}
                                    variant="body1"
                                    sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" }, mb: 2 }}
                                >
                                    {desc}
                                </Typography>
                            ))}
                        </Box>

                        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1, mt: 2 }}>
                            {exp.skills.map((skill, i) => (
                                <Tag key={i} label={skill} />
                            ))}
                        </Box>
                    </motion.div>
                </Box>
            ))}
        </Box>
    );

}
