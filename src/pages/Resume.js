import Navbar from "../components/Navbar";
import "../css/main.css";
import "../css/home.css";
import ProfileImage from '../images/IMG_7940.jpg';
import Instagram from '../images/instagram-icon.webp'
import LinkedIn from '../images/linkedin-icon.png'
import Github from '../images/github-icon.png'
import { Box, Grid, Typography } from "@mui/material";

function Resume() {

    return (
        <div id='home-container'>

            <div class='main-content'>

                <Navbar/>

            </div>

            <div id="line">
                <hr></hr>
            </div>

            <div id="logo-containers">

                    <a href="https://www.instagram.com/bmorris56/">
                        <img src={Instagram} alt="Instagram Icon" id="insta-icon"/>
                    </a>
                    <a href="https://www.linkedin.com/in/blake-morris-942699298/">
                        <img src={LinkedIn} alt="LinkedIn icon" id="linked-icon"/>
                    </a>
                    <a href="https://github.com/bkmorris2456">
                        <img src={Github} alt="Github Icon" id="git-icon"/>
                    </a>

            </div>
        </div>
    );

}

export default Resume;