import logo from "../../assets/images/ursus-logo.png";

export function UrsusLoader() {
  return <span className="u-loader" aria-hidden="true"><img src={logo} alt="" /></span>;
}

export default function UrsusStatus({ state, subject }) {
  if (state === "ready") return null;

  return (
    <p className="u-status u-muted" role="status">
      {state === "loading" && <UrsusLoader />}
      {state === "loading" ? `Loading ${subject}…`
        : state === "error" ? `Unable to load ${subject} right now.`
        : `No ${subject} to show yet.`}
    </p>
  );
}
