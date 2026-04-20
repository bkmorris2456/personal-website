import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, Button, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase";
import { useAuthContext } from "../context/AuthContext";

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
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          backgroundColor: "#0b0b0b",
          color: "#f3f3f3",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "20px",
          boxShadow: "none",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography sx={{ fontSize: "1.8rem", fontWeight: 700, mb: 1 }}>
            Admin Login
          </Typography>

          <Typography sx={{ color: "rgba(255,255,255,0.6)", mb: 3 }}>
            Sign in with your Google account.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: "12px" }}>
              {error}
            </Alert>
          )}

          <Button
            variant="contained"
            fullWidth
            onClick={handleGoogleLogin}
            disabled={signingIn || authLoading}
            sx={{
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: 700,
              backgroundColor: "#6BA36E",
              color: "#050505",
              "&:hover": {
                backgroundColor: "#7ab47d",
              },
            }}
          >
            {signingIn || authLoading ? <CircularProgress size={22} sx={{ color: "#050505" }} /> : "Continue with Google"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}