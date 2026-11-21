import { routes } from "../../routing/routes";
import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import { useAuthContext } from "../../context/AuthContext";
import logo from "../../assets/images/ursus-logo.png";
import { UrsusLoader } from "../brand/UrsusStatus";
import "../brand/ursus.css";

export default function Login({ mode }) {
  const { state } = useLocation();
  const { user, isAdmin, authLoading } = useAuthContext();

  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (user && !isAdmin) {
      signOut(auth).catch((err) => console.error("Google sign-out error:", err));
      setError("This account does not have dashboard access.");
    }
  }, [user, isAdmin, authLoading]);

  const handleGoogleLogin = async () => {
    setError("");
    setSigningIn(true);

    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Unable to sign in with Google.");
    } finally {
      setSigningIn(false);
    }
  };

  if (!authLoading && user && isAdmin) {
    const destination = state?.from === routes.dashboard ? state.from : routes.dashboard;
    return <Navigate to={destination} replace />;
  }

  return (
    <div className="ursus" data-mode={mode}>
      <header className="u-header">
        <div className="u-container u-bar u-login-brand">
          <Link className="u-brand" to={routes.overview} aria-label="Ursus overview">
            <img src={logo} alt="" width="48" height="46" />
            <span>URSUS</span>
          </Link>
        </div>
      </header>
      <main className="u-container">
        <section className="u-card u-login u-entry" aria-labelledby="login-heading">
          <h1 id="login-heading">Admin Login</h1>
          <p className="u-muted">Sign in with your Google account.</p>

          {error && <p className="u-error" role="alert">{error}</p>}
          {(authLoading || signingIn) && (
            <p role="status" className="u-status u-muted">
              <UrsusLoader /> {signingIn ? "Signing in…" : "Checking sign-in…"}
            </p>
          )}

          <button className="u-button u-primary" type="button" onClick={handleGoogleLogin}
            disabled={signingIn || authLoading}>
            Continue with Google
          </button>
        </section>
      </main>
    </div>
  );
}
