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

  const fetchAllData = async () => {
    setLoading(true);

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
    fetchAllData,
  };
}