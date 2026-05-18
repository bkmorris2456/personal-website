import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebase";
import { useAuthContext } from "../../context/AuthContext";
import {
  authPageSx,
  authCardSx,
  authCardContentSx,
  authTitleSx,
  authSubtitleSx,
  authErrorSx,
  authButtonSx,
  authButtonSpinnerSx,
} from "./styles/authStyles";

export default function Login() {
  const navigate = useNavigate();
  const { user, isAdmin, authLoading } = useAuthContext();

  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (user && isAdmin) {
      navigate("/dashboard", { replace: true });
      return;
    }

    if (user && !isAdmin) {
      signOut(auth);
      setError("This account does not have dashboard access.");
    }
  }, [user, isAdmin, authLoading, navigate]);

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

  return (
    <Box sx={authPageSx}>
      <Card sx={authCardSx}>
        <CardContent sx={authCardContentSx}>
          <Typography sx={authTitleSx}>Admin Login</Typography>

          <Typography sx={authSubtitleSx}>
            Sign in with your Google account.
          </Typography>

          {error && (
            <Alert severity="error" sx={authErrorSx}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleGoogleLogin}
            disabled={signingIn || authLoading}
            sx={authButtonSx}
          >
            {signingIn || authLoading ? (
              <CircularProgress size={22} sx={authButtonSpinnerSx} />
            ) : (
              "Continue with Google"
            )}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}