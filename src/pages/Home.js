import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProfileImage from '../images/IMG_7940.jpg';
import Instagram from '../images/instagram-icon.webp';
import LinkedIn from '../images/linkedin-icon.png';
import Github from '../images/github-icon.png';
import Prosperity from '../images/Prosperity-.png';
import Loading from '../images/loading.gif';
import { Box, Grid, Typography, Link } from "@mui/material";
import {motion} from 'framer-motion';

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
                            Hello. My name is Blake Morris, an aspiring Software Engineer.
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
                                sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" } }}
                            >
                                I have a growing interest and passion in software development, and I take pride in continuously learning and researching methods and practices
                                that can improve my skills. Below you'll see a collection of the projects I've worked on and am currently working on, and ways to contact me!
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
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography 
                                variant="body1"
                                sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" } }}
                            >
                                Prosperity is a web application currently in development, and will focus on providing an efficient, more concise solution to tracking nutrition and macros, as well as be able to structure and plan workouts
                                accordingly. While development will start with it being a web application, it will eventually be also integrated as a mobile application.
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
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography 
                                variant="body1"
                                sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" } }}
                            >
                                Gedara will be a mobile application focused on assisting with managing and sorting household inventory. From the kitchen to the garage to the bedroom, Gedara
                                will help homeowners sort thorugh the multitude of items they have within their homes, and take managing their living to the next level.
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
                id="about"
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
                            About Me
                            </Typography>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{textAlign: 'center', fontSize: {xs: "14px", sm: "18px"}}}
                        >
                            Image goes here.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <Typography
                                sx={{textAlign: 'justify', fontSize: {xs: "14px", sm: "18px"}}}
                            >
                                My journey with programming began in high school. My junior year, they started offering the option to select classes that focused on various topics in computer science. One was based on learning the basics behind web development, using HTML and CSS,
                                and the other class focused on learning introductory topics in Python. Because I was always known as the tech-savvy kid in my family, and I also held a general curiosity for how games and applications as a whole worked behind the scenes, I decided to
                                put both classes on my schedule. Almost immediately after I started both classes, I realized that it was the only academic subject in school that I held a huge amount of interest. I loved the opportunity I had to be able to create and build something, 
                                and it was around then where I realized that I would want a career in this field, although at the time my main focus was becoming a game developer.

                            </Typography>
                        </motion.div>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    );
}

export default Home;
