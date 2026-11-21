import { getPositions } from "../../../../firebase/firestoreService";
import UrsusStatus from "../../../brand/UrsusStatus";
import usePortfolioCollection from "../../usePortfolioCollection";

export default function ExperienceNodes({ id }) {
  const { state, items } = usePortfolioCollection(getPositions);

  return (
    <section className="u-section" id={id} tabIndex={-1} aria-labelledby="experience-heading">
      <h2 className="u-section-title" id="experience-heading">Experience</h2>
      <p className="u-muted u-section-description">My professional experience, both past and present.</p>
      <UrsusStatus state={state} subject="positions" />
      {state === "ready" && (
        <div className="u-experience">
          {items.map((position) => (
            <article className="u-card u-position" key={position.id}>
              <h3>{position.company}</h3>
              <p>{position.title}</p>
              <p className="u-muted">{position.start} – {position.end || "Present"}</p>
              {position.description.length > 0 && (
                <ul className="u-muted">
                  {position.description.map((description, index) => <li key={index}>{description}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
