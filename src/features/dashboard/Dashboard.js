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
import { StatCard } from "./components/StatCard";
import { DashboardFormModal } from "./components/DashboardFormModal";
import { DashboardFormFields } from "./components/DashboardFormFields";
import { DashboardTables } from "./components/DashboardTables";
import { ViewAllModal } from "./components/ViewAllModal";

// Dashboard Hook Imports
import { useDashboardData } from "./hooks/useDashboardData";
import { useDashboardDisplayData } from "./hooks/useDashboardDisplayData";
import { useDashboardModal } from "./hooks/useDashboardModal";
import { useDashboardCrud } from "./hooks/useDashboardCrud";

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
    <Box
      className="dashboard-container"
      sx={{
        minHeight: "100vh",
        backgroundColor: "#050505",
        px: { xs: 2, md: 4, lg: 6 },
        py: { xs: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Button
          onClick={() => navigate("/home")}
          startIcon={<ArrowBackRoundedIcon />}
          sx={{
            color: "#6BA36E",
            textTransform: "none",
            fontWeight: 700,
            mb: 2,
            px: 0,
            minWidth: "unset",
            justifyContent: "flex-start",
            "&:hover": {
              backgroundColor: "transparent",
              color: "#7ab47d",
            },
          }}
        >
          Return to Home
        </Button>

        <Typography
          sx={{
            color: "#f3f3f3",
            fontSize: { xs: "2rem", md: "2.4rem" },
            fontWeight: 700,
            letterSpacing: "-0.03em",
            textAlign: "left",
            width: "100%",
          }}
        >
          Dashboard
        </Typography>
      </Box>

      {loading ? (
        <Box
          sx={{
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress sx={{ color: "#6BA36E" }} />
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