import Navbar from "../components/Navbar";
import ProfileImage from '../images/IMG_7940.jpg';
import Instagram from '../images/instagram-icon.webp';
import LinkedIn from '../images/linkedin-icon.png';
import Github from '../images/github-icon.png';
import Prosperity from '../images/Prosperity-.png';
import Loading from '../images/loading.gif';
import { Box, Grid, Typography, Link } from "@mui/material";

function Home() {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <Box 
                component="main" 
                sx={{ flex: 1, p: { xs: 2, sm: 4, md: 6 }, maxWidth: "1200px", mx: "auto" }}
            >
                <Grid container spacing={4} alignItems="center">

                    <Grid item xs={12} sm={12} sx={{display: "flex", justifyContent: "center"}}>
                        <Typography
                            variant="h2"
                            sx={{ textAlign: "justify", fontSize: { xs: "24px", sm: "36px" }, marginBottom: "4vh", marginTop: "4vh" }}
                        >
                            Hello. My name is Blake Morris, an aspiring Software Engineer.
                        </Typography>
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
                        <Typography 
                            variant="body1" 
                            sx={{ textAlign: "justify", fontSize: { xs: "18px", sm: "20px" } }}
                        >
                            I have a growing interest and passion in software development, and I take pride in continuously learning and researching methods and practices
                            that can improve my skills.
                        </Typography>
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
                sx={{ flex: 1, p: { xs: 2, sm: 4, md: 6 }, maxWidth: "1200px", mx: "auto" }}
            >
                <Grid container spacing={4} alignItems="left">

                    <Grid item xs={12} sm={12} sx={{display: 'flex', justifyContent: 'center'}}>
                        <Typography
                            variant="h2"
                            sx={{ textAlign: "justify", fontSize: { xs: "30px", sm: "40px" }, marginBottom: "4vh", marginTop: "4vh" }}
                        >
                            Projects
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center'}}>
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
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>

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
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center'}}>
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
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>

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
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center'}}>
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
                    </Grid>

                    <Grid item xs={12} sm={6} sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>

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
                    </Grid>

                </Grid>
            </Box>

            {/* Horizontal Line */}
            <Box sx={{ width: "97%", my: 2, px: { xs: 2, sm: 4 } }}>
                <Box component="hr" sx={{ border: "none", height: "1px", backgroundColor: "#ccc" }} />
            </Box>

            {/* Social Media Icons */}
            <Box 
                sx={{ 
                    display: "flex", 
                    justifyContent: "center", 
                    gap: 4, 
                    my: 2 
                }}
            >
                <Link href="https://www.instagram.com/bmorris56/" target="_blank">
                    <Box
                        component="img"
                        src={Instagram}
                        alt="Instagram Icon"
                        sx={{ width: "40px", height: "40px", cursor: "pointer" }}
                    />
                </Link>
                <Link href="https://www.linkedin.com/in/blake-morris-942699298/" target="_blank">
                    <Box
                        component="img"
                        src={LinkedIn}
                        alt="LinkedIn Icon"
                        sx={{ width: "40px", height: "40px", cursor: "pointer" }}
                    />
                </Link>
                <Link href="https://github.com/bkmorris2456" target="_blank">
                    <Box
                        component="img"
                        src={Github}
                        alt="Github Icon"
                        sx={{ width: "40px", height: "40px", cursor: "pointer" }}
                    />
                </Link>
            </Box>
        </Box>
    );
}

export default Home;
