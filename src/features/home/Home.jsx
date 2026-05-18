import { Box, Typography } from "@mui/material";
import Navbar from "../navbar/Navbar.jsx";
import ExperienceNodes from "./components/experience/ExperienceNodes.jsx";
import ContactForm from "./components/contact/ContactForm.jsx";
import SkillsSection from "./components/skills/SkillsSection.jsx";
import ProjectTabs from "./components/projects/ProjectTabs.jsx";
import HeroSection from "./components/HeroSection.jsx";
import { skills } from "./constants/skills.jsx";

import {
  homePageSx,
  skillsSectionSx,
  projectsSectionSx,
  contactSectionSx,
  sectionTitleSx,
  contactFormWrapperSx,
} from "../../styles/homeStyles.js";

function Home() {
  return (
    <Box sx={homePageSx}>
      <Navbar />

      <HeroSection />

      <ExperienceNodes id="experience" />

      <Box sx={skillsSectionSx} id="skills">
        <Typography variant="h3" sx={sectionTitleSx}>
          Skills
        </Typography>

        <SkillsSection skills={skills} />
      </Box>

      <Box sx={projectsSectionSx} id="projects">
        <Typography variant="h3" sx={sectionTitleSx}>
          Projects
        </Typography>

        <ProjectTabs />
      </Box>

      <Box sx={contactSectionSx} id="contact">
        <Typography
          variant="h3"
          sx={{
            ...sectionTitleSx,
            marginBottom: "4vh",
          }}
        >
          Contact Me
        </Typography>

        <Box sx={contactFormWrapperSx}>
          <ContactForm />
        </Box>
      </Box>
    </Box>
  );
}

export default Home;