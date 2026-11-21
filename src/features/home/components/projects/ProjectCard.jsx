import { GitHub, OpenInNew } from "@mui/icons-material";

function projectTags({ stack, techStack, technologies }) {
  const value = [stack, techStack, technologies].find(
    (field) => typeof field === "string" || Array.isArray(field),
  );
  const entries = typeof value === "string" ? value.split(",") : value ?? [];
  return [...new Set(entries.filter((entry) => typeof entry === "string").map((entry) => entry.trim()).filter(Boolean))];
}

export default function ProjectCard({ project }) {
  const { title, description, demoLink, githubLink } = project;
  const tags = projectTags(project);

  return (
    <article className="u-card u-project">
      <h3>{title || project.project}</h3>
      {description && <p className="u-muted">{Array.isArray(description) ? description.join(" ") : description}</p>}
      {(githubLink || demoLink) && (
        <div className="u-actions">
          {githubLink && (
            <a className="u-project-link" href={githubLink} target="_blank" rel="noopener noreferrer">
              <GitHub fontSize="inherit" aria-hidden="true" /> GitHub
            </a>
          )}
          {demoLink && (
            <a className="u-project-link" href={demoLink} target="_blank" rel="noopener noreferrer">
              <OpenInNew fontSize="inherit" aria-hidden="true" /> Demo
            </a>
          )}
        </div>
      )}
      {tags.length > 0 && (
        <ul className="u-tags" aria-label="Technologies">
          {tags.map((tag) => <li className="u-tag" key={tag}>{tag}</li>)}
        </ul>
      )}
    </article>
  );
}
