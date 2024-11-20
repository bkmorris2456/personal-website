import Navbar from "../components/Navbar";
import "../css/main.css";
import "../css/home.css";
import ProfileImage from '../images/IMG_7940.jpg';
import InnovationImage from '../images/Innovation.jpg';
import ResumeImage from '../images/resume.png';
import Instagram from '../images/instagram-icon.webp'
import LinkedIn from '../images/linkedin-icon.png';
import Github from '../images/github-icon.png';
import { Box, Grid, Typography } from "@mui/material";

function Home() {

    return (
        <div id='home-container'>

            <div class='main-content'>
                <Navbar/>

                <Grid container spacing={2} id="home-container">

                    <Grid item>
                        <img src={ProfileImage} alt="My Picture" id="profile-pic"></img>
                    </Grid>

                    <Grid item id="summary-container">
                        <Typography variant='body1'>
                            Hello there! My name is Blake Krishan Morris, and I am a graduate from Michigan State University, and I have studied Computer Science. 
                            My goal is to create and maintain a successful career within the software industry, and to further gain and improve my knowledge on the technologies and concepts
                            present in the world today, as well as any technologies that may arise in the future. I have experience in a multitude of programming languages, but I am proficient
                            with Python, HTML, CSS, and JavaScript. On this website you will examples of some of the code and projects I have worked on since graduating, as well as a secondary
                            feature of the website meant for my personal use only. More will be explained on its specific webpage!
                        </Typography>
                    </Grid>

                </Grid>
            </div>

            {/* <div id='projects-content'>

                <Grid container spacing={2} id='projects-container'>
                    <Grid item>
                        <img src={InnovationImage} alt="innovation graphic" id='innovation-pic'/>
                    </Grid>

                    <Grid item id='projects-text'>
                        <Typography variant='body1'>

                        </Typography>
                    </Grid>
                </Grid>

            </div> */}

            <div id="line">
                <hr></hr>
            </div>

            <div id="logo-containers">

                    <a href="https://www.instagram.com/bmorris56/" id="insta-link">
                        <img src={Instagram} alt="Instagram Icon" id="insta-icon"/>
                    </a>

                    <a href="https://www.linkedin.com/in/blake-morris-942699298/" id="linked-link">
                        <img src={LinkedIn} alt="LinkedIn icon" id="linked-icon"/>
                    </a>

                    <a href="https://github.com/bkmorris2456" id="github-link">
                        <img src={Github} alt="Github Icon" id="git-icon"/>
                    </a>

            </div>
        </div>
    );

};

export default Home;