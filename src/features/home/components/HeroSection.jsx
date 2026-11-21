import { Link } from "react-router-dom";
import logo from "../../../assets/images/ursus-logo.png";
import { overviewSectionId, sectionPath } from "../../navbar/constants/navItems";

export default function HeroSection() {
  return (
    <section className="u-hero" id={overviewSectionId} tabIndex={-1} aria-labelledby="overview-heading">
      <div className="u-entry">
        <h1 id="overview-heading">Blake Morris</h1>
        <p className="u-hero-role">Developer. Thinker. Builder.</p>
        <p className="u-hero-intro">
          I design and build practical applications that solve everyday problems.
        </p>
        <div className="u-actions">
          <Link className="u-button u-primary" to={sectionPath("projects")}>View Projects</Link>
          <Link className="u-button" to={sectionPath("contact")}>Get in Touch</Link>
        </div>
      </div>
      <img className="u-hero-mark" src={logo} alt="" width="1278" height="1230" fetchpriority="high" />
    </section>
  );
}
