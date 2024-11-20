import Navbar from "../components/Navbar";
import Entry from "../components/Entry"
import "../css/main.css";
import "../css/home.css";
import "../css/projects.css"
import ProfileImage from '../images/IMG_7940.jpg';
import Instagram from '../images/instagram-icon.webp'
import LinkedIn from '../images/linkedin-icon.png'
import Github from '../images/github-icon.png'
import Loading from '../images/loading.gif';
import { Box, Grid, Typography } from "@mui/material";
import { Title } from "@mui/icons-material";

function Projects() {

    const projectData = [
        {
            title: "Job Search Management Platform",
            details: ["This future project focuses on serving as an alternative for tracking and managing all applications sent by a user for potential jobs, internships, and other opportunities.",
                    " I plan to utilize React, HTML, CSS, and JavaScript to structure the frontend, and SQL to serve as the backend.",
                    " I created this project as an alternative method to using an excel sheet or other application to track companies I apply to. "]
        },
        {
            title: "Home Inventory App",
            details: ["This project will soon be in development, and will focus on generating the ability to access and manage records of all household items, their quantity, and quality.",
                " It will be initially be designed as an easily accessible mobile app, with plans to also create a compatible web platform.",
                " Coming soon!"]
        },
        {
            title: "Project Prosperity",
            details: "Coming soon!"
        }
    ];

    return (
        <div id='home-container'>

            <Navbar/>

            <div id='project-list'>
                <h1>My Projects</h1>

                {projectData.map((project, index) => (
                    <div key={index}>
                        <Entry title={project.title} details={project.details} />
                        <hr id='project-divider'/>
                    </div>
                ))}

                
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

export default Projects;