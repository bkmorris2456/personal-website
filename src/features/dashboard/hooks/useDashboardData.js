import { useEffect, useState } from "react";
import {
  getPositions,
  getProjects,
  getSkills,
} from "../../../firebase/firestoreService";

export function useDashboardData() {
  const [positions, setPositions] = useState([]);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const fetchAllData = async () => {
    setLoading(true);
    setLoadError(false);

    try {
      const [positionsData, projectsData, skillsData] = await Promise.all([
        getPositions(),
        getProjects(),
        getSkills(),
      ]);

      setPositions(positionsData);
      setProjects(projectsData);
      setSkills(skillsData);
    } catch (error) {
      setLoadError(true);
      console.error("Error fetching dashboard data:", error);
      setPositions([]);
      setProjects([]);
      setSkills([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return {
    positions,
    projects,
    skills,
    loading,
    loadError,
    fetchAllData,
  };
}