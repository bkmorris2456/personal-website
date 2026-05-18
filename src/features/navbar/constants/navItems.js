import { GitHub, LinkedIn } from "@mui/icons-material";
import ComputerIcon from "@mui/icons-material/Computer";

export const sectionNavItems = [
  { label: "Home", to: "home" },
  { label: "Experience", to: "experience" },
  { label: "Skills", to: "skills" },
  { label: "Projects", to: "projects" },
  { label: "Contact", to: "contact" },
];

export const mobileSectionNavItems = [
  { label: "Home", to: "home" },
  { label: "Projects", to: "projects" },
  { label: "Experience", to: "experience" },
];

export const externalNavItems = [
  {
    label: "GitHub",
    href: "https://github.com/",
    Icon: GitHub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    Icon: LinkedIn,
  },
  {
    label: "Leetcode",
    href: "https://leetcode.com/u/bmorris56/",
    Icon: ComputerIcon,
  },
];