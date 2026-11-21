import { useState } from "react";

import {
  Box,
  Grid,
  Typography,
  Alert,
  useMediaQuery,
} from "@mui/material";

import { Link } from "react-router-dom";

import { DarkModeRounded, LightModeRounded } from "@mui/icons-material";
import logo from "../../assets/images/ursus-logo.png";
import UrsusStatus from "../brand/UrsusStatus";
import "../brand/ursus.css";

// Dashboard Component Imports
import { StatCard } from "./components/StatCard.jsx";
import { DashboardFormModal } from "./components/DashboardFormModal.jsx";
import { DashboardFormFields } from "./components/DashboardFormFields.jsx";
import { DashboardTables } from "./components/DashboardTables.jsx";
import { ViewAllModal } from "./components/ViewAllModal.jsx";

// Dashboard Hook Imports
import { useDashboardData } from "./hooks/useDashboardData";
import { useDashboardDisplayData } from "./hooks/useDashboardDisplayData";
import { useDashboardModal } from "./hooks/useDashboardModal";
import { useDashboardCrud } from "./hooks/useDashboardCrud";

// Dashboard Styling Imports
import {
  dashboardPageSx,
  dashboardHeaderSx,
  dashboardTitleSx,
  loadingContainerSx,
  dashboardFeedbackSx,
} from "./styles/dashboardStyles";

// Dashboard Page
export default function Dashboard({ mode, toggleTheme }) {
  const {
    positions,
    projects,
    skills,
    loading,
    loadError,
    fetchAllData,
  } = useDashboardData();

  const [viewAllState, setViewAllState] = useState({
    open: false,
    title: "",
    headers: [],
    rows: [],
  });

  const handleOpenViewAll = (title, headers, rows) => {
    setViewAllState({
      open: true,
      title,
      headers,
      rows,
    });
  };

  const handleCloseViewAll = () => {
    setViewAllState({
      open: false,
      title: "",
      headers: [],
      rows: [],
    });
  };

  const {
    statCards,
    positionRows,
    projectRows,
    skillRows,
  } = useDashboardDisplayData({ positions, projects, skills });

  const [feedback, setFeedback] = useState(null);
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const transitionDuration = reducedMotion ? 0 : 150;

  const modal = useDashboardModal({ modalLoading: false });

  const { modalLoading, handleSubmitModal } = useDashboardCrud({
    modalState: modal.modalState,
    formState: modal.formState,
    fetchAllData,
    handleCloseModal: modal.handleCloseModal,
    reportFeedback: (severity, message) => setFeedback({ severity, message }),
  });

  return (
    <div className="ursus" data-mode={mode}>
      <header className="u-header">
        <div className="u-container u-bar">
          <Link className="u-brand" to="/home" aria-label="Ursus overview">
            <img src={logo} alt="" width="48" height="46" />
            <span>URSUS</span>
          </Link>
          <div className="u-header-actions">
            <Link className="u-button" to="/home">Return to Home</Link>
            <button className="u-icon" type="button" onClick={toggleTheme}
              aria-label="Toggle light and dark mode" aria-pressed={mode === "light"}>
              {mode === "light" ? <LightModeRounded /> : <DarkModeRounded />}
            </button>
          </div>
        </div>
      </header>

      <Box component="main" className="u-container" sx={dashboardPageSx}>
        <Box sx={dashboardHeaderSx}>
          <Typography component="h1" sx={dashboardTitleSx}>Dashboard</Typography>
          <p className="u-muted">Manage positions, projects, and skills.</p>
        </Box>

        {loadError && <Alert severity="error" sx={dashboardFeedbackSx(true)}>Unable to load dashboard records.</Alert>}
        {feedback?.severity === "success" && (
          <Alert severity="success" role="status" sx={dashboardFeedbackSx(false)} onClose={() => setFeedback(null)}>
            {feedback.message}
          </Alert>
        )}

        {loading ? (
          <Box sx={loadingContainerSx}><UrsusStatus state="loading" subject="dashboard records" /></Box>
        ) : (
          <Grid container spacing={3}>
            {statCards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.title}>
                <StatCard {...card} />
              </Grid>
            ))}

            <DashboardTables
              positionRows={positionRows}
              projectRows={projectRows}
              skillRows={skillRows}
              onViewAll={handleOpenViewAll}
              onAdd={modal.handleOpenAdd}
              onEdit={modal.handleOpenEdit}
              onDelete={modal.handleOpenDelete}
            />
          </Grid>
        )}

        <DashboardFormModal
          open={modal.modalState.open}
          modalState={modal.modalState}
          modalTitle={modal.modalTitle}
          modalActionText={modal.modalActionText}
          modalLoading={modalLoading}
          mode={mode}
          transitionDuration={transitionDuration}
          error={feedback?.severity === "error" ? feedback.message : null}
          onClose={() => { setFeedback(null); modal.handleCloseModal(); }}
          onSubmit={() => { setFeedback(null); return handleSubmitModal(); }}
          renderFields={() => (
            <DashboardFormFields
              entity={modal.modalState.entity}
              formState={modal.formState}
              handleFormChange={modal.handleFormChange}
            />
          )}
        />

        {/* View All Modal */}
        <ViewAllModal
          open={viewAllState.open}
          title={viewAllState.title}
          headers={viewAllState.headers}
          rows={viewAllState.rows}
          onClose={handleCloseViewAll}
          mode={mode}
          transitionDuration={transitionDuration}
        />
      </Box>
    </div>
  );
}
