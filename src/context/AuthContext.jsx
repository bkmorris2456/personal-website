import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();
const signedOut = { user: null, isAdmin: false, authLoading: false };
const checking = { ...signedOut, authLoading: true };

export function AuthProvider({ children }) {
  const [session, setSession] = useState(checking);

  useEffect(() => {
    let revision = 0;
    let subscribed = true;
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!subscribed) return;
      const currentRevision = ++revision;
      if (!user) {
        setSession(signedOut);
        return;
      }

      setSession(checking);
      let isAdmin = false;
      try {
        const token = await user.getIdTokenResult(true);
        isAdmin = token.claims.admin === true;
      } catch (error) {
        if (subscribed && revision === currentRevision) {
          console.error("Error reading admin claim:", error);
        }
      }

      if (subscribed && revision === currentRevision) {
        setSession({ user, isAdmin, authLoading: false });
      }
    });

    return () => {
      subscribed = false;
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
