import React from "react";
import { Navigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import { useAuthContext } from "../../context/AuthContext";
import { authPageSx, authSpinnerSx } from "./styles/authStyles";

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, authLoading } = useAuthContext();

  if (authLoading) {
    return (
      <Box sx={authPageSx}>
        <CircularProgress sx={authSpinnerSx} />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
}