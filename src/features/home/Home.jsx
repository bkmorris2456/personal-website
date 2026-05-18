import { Box, Grid, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar.jsx";
import ExperienceNodes from "./components/experience/ExperienceNodes.jsx";
import ContactForm from "./components/contact/ContactForm.jsx";
import SkillsSection from "./components/skills/SkillsSection.jsx";
import ProjectTabs from "./components/projects/ProjectTabs.jsx";
import HeroSection from "./components/HeroSection.jsx";

import { skills } from "./constants/skills.jsx";

function Home() {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", alignItems: "center" }}>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <HeroSection/>

            {/* Experiences Section */}
            <ExperienceNodes id="experience"/>

            {/* Skills Section */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "800px",
                    marginBottom: "8vh",
                }}
                id="skills"
            >
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center", fontSize: { xs: "35px", sm: "45px" }, marginBottom: "2vh", marginTop: "2vh" }}
                >
                    Skills
                </Typography>

                <SkillsSection skills={skills} />
            </Box>
            
            {/* Projects Section */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                id="projects"
            >
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center", fontSize: { xs: "35px", sm: "45px" }, marginBottom: "2vh", marginTop: "2vh" }}
                >
                    Projects
                </Typography>

                <ProjectTabs/>

            </Box>

            {/* Contact Section */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "16vh",
                    marginTop: "8vh",
                    width: "100%",
                }}
                id="contact"
            >
                <Typography
                    variant="h3"
                    sx={{ textAlign: "center", fontSize: { xs: "35px", sm: "45px" }, marginBottom: "4vh", marginTop: "2vh" }}
                >
                    Contact Me
                </Typography>
                <Box
                    sx={{
                        width: {xs: "90%", sm: "70%", md: "50%"},
                        maxWidth: "450px",
                    }}
                >
                    <ContactForm/>
                </Box>
            </Box>

            
            
        </Box>
    );
}

export default Home;
