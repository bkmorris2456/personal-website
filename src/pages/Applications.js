import Navbar from "../components/Navbar";
import "../css/main.css";
import "../css/home.css";
import ProfileImage from '../images/IMG_7940.jpg';
import Instagram from '../images/instagram-icon.webp'
import LinkedIn from '../images/linkedin-icon.png'
import Github from '../images/github-icon.png'
import { Box, Grid, Typography } from "@mui/material";

function Applications() {

    return (
        <div id='home-container'>

            <div class='main-content'>

                <Navbar/>

            </div>

            <div id="line">
                <hr></hr>
            </div>

        </div>
    );

}

export default Applications;