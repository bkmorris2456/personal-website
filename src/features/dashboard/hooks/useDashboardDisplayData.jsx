import { useMemo } from "react";

import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import FolderOpenRoundedIcon from "@mui/icons-material/FolderOpenRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

import { formatDate, formatEndDate } from "../utils/dashboardUtils";

export function useDashboardDisplayData({ positions, projects, skills }) {
  const completedProjectsCount = useMemo(() => {
    return projects.filter(
      (project) => project.status?.toLowerCase() === "complete"
    ).length;
  }, [projects]);

  const statCards = useMemo(
    () => [
      {
        title: "Positions Worked",
        value: positions.length,
        icon: <WorkOutlineRoundedIcon />,
      },
      {
        title: "Projects Completed",
        value: completedProjectsCount,
        icon: <FolderOpenRoundedIcon />,
      },
      {
        title: "Skills Attained",
        value: skills.length,
        icon: <AutoAwesomeRoundedIcon />,
      },
    ],
    [positions.length, completedProjectsCount, skills.length]
  );

  const positionRows = useMemo(() => {
    return positions.map((item) => ({
      id: item.id,
      columns: [
        item.title || "",
        item.company || "",
        `${formatDate(item.start)} - ${formatEndDate(item.end)}`,
      ],
      raw: item,
    }));
  }, [positions]);

  const projectRows = useMemo(() => {
    return projects.map((item) => ({
      id: item.id,
      columns: [
        item.project || item.title || "Untitled Project",
        item.status || "",
      ],
      raw: item,
    }));
  }, [projects]);

  const skillRows = useMemo(() => {
    return skills.map((item) => ({
      id: item.id,
      columns: [item.skill || item.name || "", item.category || ""],
      raw: item,
    }));
  }, [skills]);

  return {
    completedProjectsCount,
    statCards,
    positionRows,
    projectRows,
    skillRows,
  };
}