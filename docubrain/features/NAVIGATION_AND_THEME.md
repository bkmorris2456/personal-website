---
title: Navigation and theme
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-21T08:07:13-05:00
status: active
---

# Navigation and theme

**Verified.** [Navbar](../../src/features/navbar/Navbar.jsx) uses a sticky desktop bar or mobile disclosure with the same public destinations. Experience precedes Projects in both menus. The desktop indicator follows scrolling and slides between links. Section links update the HashRouter fragment, honor reduced motion, and move focus to the selected section. The desktop bar and mobile disclosure expose GitHub, LinkedIn and a Contact section link. The hero also links to Contact with Get in Touch. The sole Admin dashboard link is next to the top-bar theme toggle at all widths. Escape closes the mobile disclosure and restores focus to its button.

[Root state](../../src/index.jsx) loads and saves themeMode in localStorage. The [Ursus stylesheet](../../src/features/brand/ursus.css) supplies the scoped public dark and light palettes. The dashboard shares the Ursus palette with Home and Login, including its MUI dialogs.

See the [redesign record](../development/URSUS_BRAND_REDESIGN.md) for browser and keyboard validation.
