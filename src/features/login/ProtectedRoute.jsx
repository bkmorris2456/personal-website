import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { routes } from "../../routing/routes";
import UrsusStatus from "../brand/UrsusStatus";

export default function ProtectedRoute({ children, mode }) {
  const { user, isAdmin, authLoading } = useAuthContext();

  if (authLoading) {
    return (
      <div className="ursus" data-mode={mode}>
        <div className="u-container"><UrsusStatus state="loading" subject="authorization" /></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={routes.login} state={{ from: routes.dashboard }} replace />;
  }

  if (!isAdmin) {
    return <Navigate to={routes.overview} replace />;
  }

  return children;
}
