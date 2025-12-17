import Navbar from "../components/Navbar";
import UpdatedPhoto from '../images/linkedin-headshot.jpeg';
import { Box, Grid, Typography } from "@mui/material";
import {motion} from 'framer-motion';
import ExperienceNodes from "../components/ExperienceNodes";
import ContactForm from "../components/ContactForm";
import SkillsSection from "../components/SkillsSection";
import ProjectTabs from "../components/ProjectTabs";

function Home() {

    const skills = [
    { name: "React", iconClass: "devicon-react-original colored" },
    { name: "JavaScript", iconClass: "devicon-javascript-plain colored" },
    { name: "HTML5", iconClass: "devicon-html5-plain colored" },
    { name: "CSS3", iconClass: "devicon-css3-plain colored" },
    { name: "GitHub", iconClass: "devicon-github-original" },
    { name: "Python", iconClass: "devicon-python-plain colored" },
    { name: "Node.js", iconClass: "devicon-nodejs-plain colored" },
    { name: "MySQL", iconClass: "devicon-mysql-plain colored" },
    ];

    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", alignItems: "center" }}>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <Box 
                id="home"
                component="main" 
                sx={{ flex: 1, p: { xs: 2, sm: 4, md: 6 }, maxWidth: "1200px", mx: "auto", marginBottom: "10vh" }}
            >
                <Grid container spacing={4} alignItems="center">

                    <Grid item xs={12} sm={12} sx={{display: "flex", justifyContent: "center"}}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography variant="h1" sx={{ textAlign: "center", marginTop: "10vh", marginBottom: "10vh", fontSize: { xs: "35px", sm: "45px" } }}>
                                My name is Blake Morris, and I'm a Software Developer.
                            </Typography>
                        </motion.div>
                    </Grid>

                    {/* Profile Image */}
                    <Grid item xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}>
                        <Box
                            component="img"
                            src={UpdatedPhoto}
                            alt="My Picture"
                            sx={{
                                borderRadius: "50%",
                                width: { xs: "200px", sm: "350px" },
                                height: { xs: "200px", sm: "350px" },
                                objectFit: "cover",
                            }}
                        />
                    </Grid>

                    {/* Summary Text */}
                    <Grid item xs={12} sm={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography 
                                variant="body1" 
                                sx={{ textAlign: "justify", fontSize: { xs: "14px", sm: "16px" }, marginBottom: "2vh" }}
                            >
                                I have a deep passion for designing and developing effective applications that not only assist with problems and make every-day life easier, 
                                but also help me tackle tough problems that help me learn and improve as a developer. I take great pride in knowing that I continuously improve 
                                in the work that I do, and I always look for the greatest chances to help me grow.
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ textAlign: "justify", fontSize: { xs: "14px", sm: "16px" }, marginBottom: "2vh" }}
                            >
                                Currently, I work as a contracting software developer, actively seeking out clients and individuals who can benefit from tailored software solutions 
                                to enhance their business or daily lives. I use these opportunities not only to solve real-world problems but also to explore new technologies and build 
                                innovative products.
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ textAlign: "justify", fontSize: { xs: "14px", sm: "16px" } }}
                            >
                                In the past couple of years, I've had the pleasure of accruing knowledge and experience during my time studying at Michigan State University, 
                                working with Ally Financial, and continuing my work with other clients. If I'm not developing projects or studying Data Structures and Algorithms, 
                                then I'm most likely deep diving into one of my hobbies!
                            </Typography>
                        </motion.div>
                    </Grid>
                </Grid>
            </Box>

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
