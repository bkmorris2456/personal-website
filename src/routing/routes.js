export const sectionIds = {
  overview: "overview",
  experience: "experience",
  projects: "projects",
  about: "about",
  technologies: "technologies",
  contact: "contact",
};

export const sectionNavItems = [
  { id: sectionIds.overview, label: "Overview" },
  { id: sectionIds.experience, label: "Experience" },
  { id: sectionIds.projects, label: "Projects" },
  { id: sectionIds.about, label: "About" },
  { id: sectionIds.technologies, label: "Technologies Used" },
  { id: sectionIds.contact, label: "Contact" },
];

// Distinguish section clicks from legacy redirects, which also replace history.
export const sectionLinkOptions = { replace: true, state: { scrollToSection: true } };

export const sectionPath = (id) => `/${id}`;

export const routes = {
  overview: sectionPath(sectionIds.overview),
  login: "/login",
  dashboard: "/dashboard",
};

export function getPortfolioSection(pathname, hash) {
  const anchor = hash.slice(1);
  const section = /^\/(?:home)?\/?$/.test(pathname) ? anchor : pathname.slice(1).replace(/\/$/, "");
  if (section === "skills") return sectionIds.technologies;
  return sectionNavItems.find(({ id }) => id === section)?.id ?? sectionIds.overview;
}
