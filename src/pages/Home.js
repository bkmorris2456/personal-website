import Navbar from "../components/Navbar";
import UpdatedPhoto from '../images/linkedin-headshot.jpeg';
import { Box, Grid, Typography } from "@mui/material";
import {motion} from 'framer-motion';
import ProjectList from "../components/ProjectTabs";
import ExperienceNodes from "../components/ExperienceNodes";

function Home() {

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <Box 
                id="home"
                component="main" 
                sx={{ flex: 1, p: { xs: 2, sm: 4, md: 6 }, maxWidth: "1200px", mx: "auto", marginBottom: "20vh" }}
            >
                <Grid container spacing={4} alignItems="center">

                    <Grid item xs={12} sm={12} sx={{display: "flex", justifyContent: "center"}}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography variant="h2" sx={{ textAlign: "center", marginTop: "10vh", marginBottom: "10vh", fontSize: { xs: "35px", sm: "45px" } }}>
                            Hello. My name is Blake Morris, and I'm a Software Developer.
                            </Typography>
                        </motion.div>
                    </Grid>

                    {/* Profile Image */}
                    <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
                        <Box
                            component="img"
                            src={UpdatedPhoto}
                            alt="My Picture"
                            sx={{
                                borderRadius: "50%",
                                width: { xs: "200px", sm: "300px" },
                                height: { xs: "200px", sm: "300px" },
                                objectFit: "cover",
                            }}
                        />
                    </Grid>

                    {/* Summary Text */}
                    <Grid item xs={12} sm={8}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography 
                                variant="body1" 
                                sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" }, marginBottom: "5vh" }}
                            >
                                I have a deep passion for designing and developing effective applications that not only assist with problems and make every-day life easier, 
                                but also help me tackle tough problems that help me learn and improve as a developer. I take great pride in knowing that I continuously improve 
                                in the work that I do, and I always look for the greatest chances to help me grow.
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" }, marginBottom: "5vh" }}
                            >
                                Currently, I work as a contracting software developer, actively seeking out clients and individuals who can benefit from tailored software solutions 
                                to enhance their business or daily lives. I use these opportunities not only to solve real-world problems but also to explore new technologies and build 
                                innovative products.
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" } }}
                            >
                                In the past couple of years, I've had the pleasure of accruing knowledge and experience during my time studying at Michigan State University, 
                                working with Ally Financial, and continuing my work with other clients. If I'm not developing projects or studying Data Structures and Algorithms, 
                                then I'm most likely deep diving into one of my hobbies!
                            </Typography>
                        </motion.div>
                    </Grid>
                </Grid>
            </Box>

            {/* Horizontal Line */}
            <Box sx={{ width: "97%", my: 2, px: { xs: 2, sm: 4 } }}>
                <Box component="hr" sx={{ border: "none", height: "1px", backgroundColor: "#ccc" }} />
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
                    sx={{ textAlign: "center", fontSize: { xs: "30px", sm: "40px" }, marginBottom: "4vh", marginTop: "4vh" }}
                >
                    Projects
                </Typography>
                <ProjectList />
            </Box>

            {/* Horizontal Line */}
            <Box sx={{ width: "97%", my: 2, px: { xs: 2, sm: 4 } }}>
                <Box component="hr" sx={{ border: "none", height: "1px", backgroundColor: "#ccc" }} />
            </Box>
            
            {/* Experiences Section */}
            <ExperienceNodes id="experience"/>
            
        </Box>
    );
}

export default Home;
