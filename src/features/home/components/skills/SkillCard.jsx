export default function SkillCard({ name, icon }) {
  return (
    <li className="u-card u-skill">
      <span aria-hidden="true">{icon}</span>
      <span>{name}</span>
    </li>
  );
}
