import { useLayoutEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import ExperienceNodes from "./components/experience/ExperienceNodes.jsx";
import ContactForm from "./components/contact/ContactForm.jsx";
import SkillsSection from "./components/skills/SkillsSection.jsx";
import ProjectTabs from "./components/projects/ProjectTabs.jsx";
import HeroSection from "./components/HeroSection.jsx";
import portrait from "../../assets/images/linkedin-headshot.webp";
import "../brand/ursus.css";

function Home({ toggleTheme, mode }) {
  const { hash, key } = useLocation();
  const navigation = useNavigationType();

  useLayoutEffect(() => {
    const section = hash ? document.getElementById(hash.slice(1)) : null;
    const main = section?.closest(".u-main");
    if (!main) {
      if (!hash) window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    section.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: navigation === "PUSH" && !reduced ? "smooth" : "instant" });

    if (typeof ResizeObserver !== "function") return;
    // Keep a deep link aligned if data above it arrives late. Yield as soon as the visitor interacts.
    let previousTop = section.offsetTop;
    const observer = new ResizeObserver(() => {
      const top = section.offsetTop;
      if (top !== previousTop && document.activeElement === section) {
        section.scrollIntoView({ behavior: "instant" });
      }
      previousTop = top;
    });
    const stop = () => observer.disconnect();
    const inputEvents = ["wheel", "touchstart", "pointerdown", "keydown"];
    observer.observe(main);
    inputEvents.forEach((event) => window.addEventListener(event, stop, { passive: true, once: true }));
    return () => {
      stop();
      inputEvents.forEach((event) => window.removeEventListener(event, stop));
    };
  }, [hash, key, navigation]);

  return (
    <div className="ursus" data-mode={mode}>
      <Navbar toggleTheme={toggleTheme} mode={mode} />

      <main className="u-container u-main">
        <HeroSection />

        <ExperienceNodes id="experience" />

        <section className="u-section" id="projects" tabIndex={-1} aria-labelledby="projects-heading">
          <h2 className="u-section-title" id="projects-heading">Featured Projects</h2>
          <p className="u-muted u-section-description">A collection of the software projects that I've worked on.</p>
          <ProjectTabs />
        </section>

        <section className="u-section" id="about" tabIndex={-1} aria-labelledby="about-heading">
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

        <section className="u-section" id="skills" tabIndex={-1} aria-labelledby="skills-heading">
          <h2 className="u-section-title" id="skills-heading">Technologies Used</h2>
          <SkillsSection />
        </section>

        <section className="u-section u-contact" id="contact" tabIndex={-1} aria-labelledby="contact-heading">
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
