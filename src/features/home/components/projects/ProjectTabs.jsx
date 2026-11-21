import ProjectCard from "./ProjectCard";
import { getProjects } from "../../../../firebase/firestoreService";
import UrsusStatus from "../../../brand/UrsusStatus";
import usePortfolioCollection from "../../usePortfolioCollection";

export default function ProjectTabs() {
  const { state, items } = usePortfolioCollection(getProjects);
  if (state !== "ready") return <UrsusStatus state={state} subject="projects" />;

  return (
    <div className="u-grid">
      {items.map((project) => (
        <ProjectCard key={project.id || project.title} project={project} />
      ))}
    </div>
  );
}
