import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Tag from "../components/SkillTag";
import ProfileImage from '../images/IMG_7940.jpg';
import Prosperity from '../images/Prosperity-.png';
import Loading from '../images/loading.gif';
import { Box, Grid, Typography, Link } from "@mui/material";
import { useInView } from 'react-intersection-observer';
import {motion} from 'framer-motion';

function Home() {

    // Inside your "Projects" section
    const { ref: projectsRef, inView: projectsInView } = useInView({
        triggerOnce: true, // Trigger only once when it enters the viewport
        threshold: 0.1, // 10% of the section must be in view
    });

    // Inside your "Experience" section
    const { ref: experienceRef, inView: experienceInView } = useInView({
        triggerOnce: true, // Trigger only once when it enters the viewport
        threshold: 0.1, // 10% of the section must be in view
    });

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
                            Hello. My name is Blake Morris, Aspiring Software Developer.
                            </Typography>
                        </motion.div>
                    </Grid>

                    {/* Profile Image */}
                    <Grid item xs={12} sm={4} sx={{ display: "flex", justifyContent: "center" }}>
                        <Box
                            component="img"
                            src={ProfileImage}
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
                                I have a passion and deep interest for designing and developing applications 
                                that are not only functional and extremely helpful for everyday use, but also 
                                assist me in furthering my skills and talents as a developer. I take pride in 
                                continuously learning and researching new methods and practices that can both 
                                improve the quality of my projects, as well as my abilities. 
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" }, marginBottom: "5vh" }}
                            >
                                Currently, I focus on creating projects and applications centered around problems 
                                I want to solve in my every-day life, as well as spending time studying data structures 
                                and algorithms. I prioritize making sure that I improve day by day.
                            </Typography>
                            <Typography 
                                variant="body1" 
                                sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" } }}
                            >
                                In the past couple years, I’ve had the pleasure of gaining a multitude of experience 
                                from both my time earning my degree at Michigan State University and working under the company 
                                Ally Financial. In my free time I read, play videogames, and frequently go to the gym.
                            </Typography>
                        </motion.div>
                    </Grid>
                </Grid>
            </Box>

            {/* Horizontal Line */}
            <Box sx={{ width: "97%", my: 2, px: { xs: 2, sm: 4 } }}>
                <Box component="hr" sx={{ border: "none", height: "1px", backgroundColor: "#ccc" }} />
            </Box>

            <Box
                id="projects"
                component="projects"
                sx={{ flex: 1, p: { xs: 2, sm: 4, md: 6 }, maxWidth: "1200px", mx: "auto", marginTop: "12vh", marginBottom: "12vh" }}
            >
                <Grid container spacing={4} alignItems="left">

                    <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography
                                variant="h2"
                                sx={{ textAlign: "justify", fontSize: { xs: "30px", sm: "40px" }, marginBottom: "4vh", marginTop: "4vh" }}
                            >
                            My Projects
                            </Typography>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center'}}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.div
                                whileHover={{ y: -15 }} // Float up by 10px
                                transition={{ type: "spring", stiffness: 300, damping: 15 }} // Smooth spring animation
                                style={{ display: 'inline-block' }} // Ensures proper alignment
                            >
                                <Box
                                    component="img"
                                    src={Prosperity}
                                    alt="Prosperity"
                                    sx={{
                                        borderRadius: "20%",
                                        width: { xs: "200px", sm: "300px" },
                                        height: { xs: "200px", sm: "300px" },
                                        objectFit: "cover",    
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography 
                                variant="h4"
                                sx={{ textAlign: "justify", fontSize: { xs: "24px", sm: "30px" }, marginBottom: "4vh", marginTop: "4vh" }}
                            >
                                Prosperity
                            </Typography>

                            <Typography 
                                variant="body1"
                                sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" } }}
                            >
                                Prosperity is a web application currently in development, and will focus on providing an efficient, more concise solution to tracking nutrition and macros, as well as be able to structure and plan workouts
                                accordingly. While development will start with it being a web application, it will eventually be also integrated as a mobile application.
                            </Typography>

                            <Box
                                sx={{mt: 2}}
                            >
                                <Tag label="JavaScript"/>
                                <Tag label="HTML"/>
                                <Tag label="CSS"/>
                                <Tag label="MaterialUI"/>
                                <Tag label="Python"/>
                                <Tag label="MySQL"/>
                                <Tag label="Express"/>
                                <Tag label="Node.js"/>
                                <Tag label="React"/>
                            </Box>

                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center'}}>
                        <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                        >
                            <motion.div
                                whileHover={{ y: -15 }} // Float up by 10px
                                transition={{ type: "spring", stiffness: 300, damping: 15 }} // Smooth spring animation
                                style={{ display: 'inline-block' }} // Ensures proper alignment
                            >
                                <Box
                                    component="img"
                                    src={Loading}
                                    alt="Work in Progress"
                                    sx={{
                                        borderRadius: "20%",
                                        width: { xs: "200px", sm: "300px" },
                                        height: { xs: "200px", sm: "300px" },
                                        objectFit: "cover",    
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography 
                                variant="h4"
                                sx={{ textAlign: "justify", fontSize: { xs: "24px", sm: "30px" }, marginBottom: "4vh", marginTop: "4vh" }}
                            >
                                Gedara
                            </Typography>

                            <Typography 
                                variant="body1"
                                sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" } }}
                            >
                                Gedara will be a mobile application focused on assisting with managing and sorting household inventory. From the kitchen to the garage to the bedroom, Gedara
                                will help homeowners sort thorugh the multitude of items they have within their homes, and take managing their living to the next level.
                            </Typography>

                            <Box
                                sx={{mt: 2}}
                            >
                                <Tag label="React"/>
                            </Box>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center'}}>
                        <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                        >
                            <motion.div
                                whileHover={{ y: -15 }} // Float up by 10px
                                transition={{ type: "spring", stiffness: 300, damping: 15 }} // Smooth spring animation
                                style={{ display: 'inline-block' }} // Ensures proper alignment
                            >
                                <Box
                                    component="img"
                                    src={Loading}
                                    alt="Work in Progress"
                                    sx={{
                                        borderRadius: "20%",
                                        width: { xs: "200px", sm: "300px" },
                                        height: { xs: "200px", sm: "300px" },
                                        objectFit: "cover",    
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography 
                                variant="h4"
                                sx={{ textAlign: "justify", fontSize: { xs: "24px", sm: "30px" }, marginBottom: "4vh", marginTop: "4vh" }}
                            >
                                BlakeBot
                            </Typography>

                        <Typography 
                            variant="body1"
                            sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" } }}
                        >
                            BlakeBot will be my first attempt at re-educating myself at training an AI model, and basing it off of my own conversations and responses to questions.
                        </Typography>
                        </motion.div>
                    </Grid>

                </Grid>
            </Box>

            {/* Horizontal Line */}
            <Box sx={{ width: "97%", my: 2, px: { xs: 2, sm: 4 } }}>
                <Box component="hr" sx={{ border: "none", height: "1px", backgroundColor: "#ccc" }} />
            </Box>

            <Box
                id="experience"
                component="about"
                sx={{ flex: 1, p: { xs: 2, sm: 4, md: 6 }, maxWidth: "1200px", mx: "auto", marginTop: "12vh", marginBottom: "12vh" }}
            >

                <Grid container spacing={4} alignItems="left">
                    <Grid item xs={12} sm={12}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography
                                variant="h2"
                                sx={{ textAlign: "center", fontSize: { xs: "30px", sm: "40px" }, marginBottom: "4vh", marginTop: "4vh", marginBottom: "8vh" }}
                            >
                            Experience 
                            </Typography>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography 
                                variant="h4"
                                sx={{ textAlign: "center", fontSize: { xs: "24px", sm: "30px" }, marginBottom: "4vh", marginTop: "4vh" }}
                            >
                                Software Developer - Ally Financial, Michigan State University
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{ textAlign: "center", fontSize: { xs: "12px", sm: "16px" }, marginBottom: "4vh", marginTop: "4vh" }}
                            >
                                August 2023 - December 2023
                            </Typography>

                            <Typography 
                                variant="body1"
                                sx={{ textAlign: "justify", mx: "auto", fontSize: { xs: "18px", sm: "20px", maxWidth: "35vw" } }}
                            >
                                Assisted on a 5-person team to design and develop a mobile-based web application centered on providing financial education. Built and maintained
                                essential frontend components to improve overall user experience and application design. Conducted and lead team discussions and product presentations 
                                with the client Ally Financial.
                            </Typography>
                            <Box
                                sx={{mt: 2}}
                            >
                                <Tag label="JavaScript"/>
                                <Tag label="HTML"/>
                                <Tag label="CSS"/>
                                <Tag label="MaterialUI"/>
                                <Tag label="Python"/>
                                <Tag label="MySQL"/>
                            </Box>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography 
                                variant="h4"
                                sx={{ textAlign: "center", fontSize: { xs: "24px", sm: "30px" }, marginBottom: "4vh", marginTop: "4vh" }}
                            >
                                Python Tutor - SpartanTutors
                            </Typography>

                            <Typography
                                variant="body1"
                                sx={{ textAlign: "center", fontSize: { xs: "12px", sm: "16px" }, marginBottom: "4vh", marginTop: "4vh" }}
                            >
                                September 2023 - April 2024
                            </Typography>

                            <Typography 
                                variant="body1"
                                sx={{ textAlign: "justify", mx: "auto", fontSize: { xs: "18px", sm: "20px", maxWidth: "35vw" } }}
                            >
                                Educated and aided first-year university students on foundational programming concepts using Python. Scheduled and facilitated
                                one-on-one tutoring sessions to address student questions and concerns regarding material. Demonstrated proficiency in efficiently scheduling
                                and managing multiple tutoring appointments.
                            </Typography>
                            <Box
                                sx={{mt: 2}}
                            >
                                <Tag label="Python"/>
                                <Tag label="Communication Skills"/>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    );
}

export default Home;
