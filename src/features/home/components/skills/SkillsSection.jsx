import { technologyCategories } from "../../constants/skills.jsx";

export default function SkillsSection() {
  return (
    <div className="u-skills">
      {technologyCategories.map(({ title, technologies }) => (
        <div className="u-card u-skill-category" key={title}>
          <h3>{title}</h3>
          <ul className="u-tags">
            {technologies.map((technology) => (
              <li className="u-tag" key={technology}>{technology}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
