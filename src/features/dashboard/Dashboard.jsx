import { useState } from "react";

import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

// Icon Imports
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

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
  returnButtonSx,
  dashboardTitleSx,
  loadingContainerSx,
  loadingSpinnerSx,
} from "./styles/dashboardStyles";

// Dashboard Page
export default function Dashboard() {
  const {
    positions,
    projects,
    skills,
    loading,
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

  const navigate = useNavigate();

  const modal = useDashboardModal({ modalLoading: false });

  const { modalLoading, handleSubmitModal } = useDashboardCrud({
    modalState: modal.modalState,
    formState: modal.formState,
    fetchAllData,
    handleCloseModal: modal.handleCloseModal,
  });

  return (
    <Box className="dashboard-container" sx={dashboardPageSx}>
      <Box sx={dashboardHeaderSx}>
        <Button
          onClick={() => navigate("/home")}
          startIcon={<ArrowBackRoundedIcon />}
          sx={returnButtonSx}
        >
          Return to Home
        </Button>

        <Typography
          sx={dashboardTitleSx}
        >
          Dashboard
        </Typography>
      </Box>

      {loading ? (
        <Box sx={loadingContainerSx}>
          <CircularProgress sx={loadingSpinnerSx} />
        </Box>
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
        onClose={modal.handleCloseModal}
        onSubmit={handleSubmitModal}
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
      />
    </Box>
  );
}