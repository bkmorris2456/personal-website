import Navbar from "../components/Navbar";
import "../css/main.css";
import "../css/home.css";
import ProfileImage from '../images/IMG_7940.jpg';
import { Box, Grid, Typography } from "@mui/material";

function Home() {

    return (
        <div id='home-container'>

            <div class='main-content'>
                <Navbar/>

                <Grid container spacing={2} alignItems="center">

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

            <hr></hr>

            <p>Insert social media icons/links here!!</p>
        </div>
    );

};

export default Home;