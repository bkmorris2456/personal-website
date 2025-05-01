import Navbar from "../components/Navbar";
import Tag from "../components/SkillTag";
import ProfileImage from '../images/IMG_7940.jpg';
import Prosperity from '../images/Prosperity-.png';
import Gedara from '../images/Gedara.jpg';
import BlakeBot from '../images/BlakeBot.jpg';
import { Box, Grid, Typography } from "@mui/material";
import {motion} from 'framer-motion';
import ProjectTabs from "../components/ProjectTabs";

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
                            Hello. My name is Blake Morris, and I'm a Software Engineer.
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
                                in both my time earning my degree at Michigan State University and working under the company 
                                Ally Financial. When i'm not studying Leetcode or working on project code, some of my favorite
                                hobbies are gaming, reading, chess, and exercising at the gym!
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
                                Prosperity is a fitness mobile app that I currently have in development, and the goal behind it is to provide a platform to not only
                                track macros and nutritional information from meals within each day, but to also help with creating and managing workout routines and schedules. I noticed that
                                with the apps I use now, they either lock most of their features behind a paywall, or they don't have the features I want in general. So, I decided to start developing Prosperity
                                to provide myself with an option that I can use and enjoy.
                            </Typography>

                            <Box
                                sx={{mt: 2,}}
                            >
                                <Tag label="React"/>
                                <Tag label="MaterialUI"/>
                                <Tag label="JavaScript"/>
                                <Tag label="HTML"/>
                                <Tag label="CSS"/>
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
                                    src={Gedara}
                                    alt="Gedara Logo"
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
                                Gedara is another mobile application that I currently have in development, and its main premise is to serve as a platform for the organization and management of
                                household inventory, such as furniture, appliances, and other valuable items. The goal behind Gedara is to provide users with the opportunity to create a virtual 
                                catalog of their belongings, which can be useful in various situations, such as moving, renovating, or simply keeping track of possessions.
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
                                    src={BlakeBot}
                                    alt="BlakeBot Logo"
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
                            BlakeBot will be my first attempt at developing an AI chatbot (name subject to change). I'm mainly working on developing this project to further my understanding
                            on the topic of artificial intelligence, as well as to gain experience in the topics and information pertaining to AI. My goal for this project is to create a chatbot that mimics
                            my tendencies and habits regarding not only my writing style, but also my personality and character when answering questions or giving advice. 
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
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    maxWidth: "100%",
                }}
            >
                <ProjectTabs />
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
                                sx={{ textAlign: "center", fontSize: { xs: "30px", sm: "40px" }, marginBottom: "4vh", marginTop: "4vh" }}
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
                                sx={{ textAlign: "justify", mx: "auto", fontSize: { xs: "18px", sm: "20px"}, maxWidth: {sm: "35vw" } }}
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
                                sx={{ textAlign: "justify", mx: "auto", fontSize: { xs: "18px", sm: "20px" }, maxWidth: {sm: "35vw" }}}
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
