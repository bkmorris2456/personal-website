import { GitHub, LinkedIn } from "@mui/icons-material";

export const sectionNavItems = [
  { label: "Overview", to: "home" },
  { label: "Experience", to: "experience" },
  { label: "Projects", to: "projects" },
  { label: "About", to: "about" },
  { label: "Skills", to: "skills" },
  { label: "Contact", to: "contact" },
];

export const sectionPath = (section) => `/home#${section}`;

export const externalNavItems = [
  { label: "GitHub", href: "https://github.com/bkmorris2456", Icon: GitHub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/bkmorris2024/", Icon: LinkedIn },
];
