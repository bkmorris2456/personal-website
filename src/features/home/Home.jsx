import { sectionIds } from "../../routing/routes";
import useSectionNavigation from "./useSectionNavigation";
import Navbar from "../navbar/Navbar.jsx";
import ExperienceNodes from "./components/experience/ExperienceNodes.jsx";
import ContactForm from "./components/contact/ContactForm.jsx";
import SkillsSection from "./components/skills/SkillsSection.jsx";
import ProjectTabs from "./components/projects/ProjectTabs.jsx";
import HeroSection from "./components/HeroSection.jsx";
import portrait from "../../assets/images/linkedin-headshot.webp";
import "../brand/ursus.css";

function Home({ section, toggleTheme, mode }) {
  const active = useSectionNavigation(section);
  return (
    <div className="ursus" data-mode={mode}>
      <Navbar toggleTheme={toggleTheme} mode={mode} active={active} />

      <main className="u-container u-main">
        <HeroSection />

        <ExperienceNodes id={sectionIds.experience} />

        <section className="u-section" id={sectionIds.projects} tabIndex={-1} aria-labelledby="projects-heading">
          <h2 className="u-section-title" id="projects-heading">Featured Projects</h2>
          <p className="u-muted u-section-description">A collection of the software projects that I've worked on.</p>
          <ProjectTabs />
        </section>

        <section className="u-section" id={sectionIds.about} tabIndex={-1} aria-labelledby="about-heading">
          <h2 className="u-section-title" id="about-heading">About</h2>
          <div className="u-about-content">
            <div className="u-about">
              <img src={portrait} alt="Blake Morris" width="1428" height="2016" loading="lazy" />
              <div className="u-muted">
                <p>
                  I'm a software developer who enjoys building practical, reliable applications that solve real problems. I approach development with an emphasis on thoughtful design, maintainability, 
                  and continuous improvement. Whether I'm developing something from scratch or improving an existing system, I enjoy understanding how things work and finding ways to make them better and more
                  efficient.
                </p>
                <p>
                  My background includes a degree in Computer Science from Michigan State University (Go Green!), experience working with professional companies like Ally Financial and Results at Hand Software,
                  and experience building and maintaining mobile and web applications for personal use and for clients. These experiences have given me opportunities to work across different technologies, 
                  troubleshoot complex issues, and contribute to software throughout its development lifecycle.
                </p>
                <p>
                  Outside of my professional work, I spend time exploring new technologies, building more personal tools and projects to help with my day-to-day, and expanding my knowledge of system design and 
                  software engineering. When I am not working on software, I primarily enjoy my hobbies of gaming, weightlifting, running, and custom mechanical keyboards!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="u-section" id={sectionIds.technologies} tabIndex={-1} aria-labelledby="technologies-heading">
          <h2 className="u-section-title" id="technologies-heading">Technologies Used</h2>
          <SkillsSection />
        </section>

        <section className="u-section u-contact" id={sectionIds.contact} tabIndex={-1} aria-labelledby="contact-heading">
          <h2 className="u-section-title" id="contact-heading">Contact Me</h2>
          <div className="u-contact-content">
            <p className="u-contact-intro u-muted">Have a project in mind? Get in touch.</p>
            <ContactForm />
          </div>
        </section>

      </main>

      <div className="u-container">
        <footer className="u-footer">
          <span>© {new Date().getFullYear()} Ursus</span>
        </footer>
      </div>
    </div>
  );
}

export default Home;
