import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import experience from "../data/experience.json";
import { getPositions } from "../firebase/firestoreService";

export default function ExperienceNodes({ id }) {

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const data = await getPositions();
            setPositions(data);
        };

        loadData();
    }, []);

    return (
        <Box
            id={id}
            sx={{ flex: 1, p: { xs: 2, sm: 4, md: 6 }, maxWidth: "100%", mx: "auto", marginTop: "1vh", marginBottom: "1vh" }}
        >
            <Box sx={{ textAlign: "center", mb: 8 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <Typography
                        variant="h2"
                        sx={{ fontSize: { xs: "35px", sm: "45px" }, mb: "4vh", mt: "4vh" }}
                    >
                        Experience
                    </Typography>
                </motion.div>
            </Box>

            {positions.map((exp, idx) => (
                <Box key={exp.id} sx={{ mb: 8, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                    >
                        <Typography
                            variant="h4"
                            sx={{ textAlign: "left", fontSize: { xs: "24px", sm: "30px" }, mb: "1vh" }}
                        >
                            {exp.company}
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{ textAlign: "left", fontSize: { xs: "14px", sm: "16px" }, mb: "1vh" }}
                        >
                            {exp.title}
                        </Typography>
                        <Typography
                            variant="h4"
                            sx={{ textAlign: "left", fontSize: { xs: "14px", sm: "16px" }, mb: "1vh" }}
                        >
                            {exp.start}{exp.end ? ` - ${exp.end}` : " - Present"}
                        </Typography>

                        <Box sx={{ maxWidth: { sm: "25vw" }, minWidth: {sm: "350px"}, mx: "auto" }}>
                            {exp.description.map((desc, i) => (
                                <Typography
                                    key={i}
                                    variant="body1"
                                    sx={{ textAlign: "justify", fontSize: { xs: "12px", sm: "14px" }, mb: 1 }}
                                >
                                    {desc}
                                </Typography>
                            ))}
                        </Box>
                    </motion.div>
                </Box>
            ))} 
        </Box>
    );

}
