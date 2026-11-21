import SkillCard from "./SkillCard";

export default function SkillsSection({ skills }) {
  return (
    <ul className="u-skills">
      {skills.map((skill) => <SkillCard key={skill.name} {...skill} />)}
    </ul>
  );
}
