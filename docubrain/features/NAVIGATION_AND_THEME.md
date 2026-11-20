---
title: Navigation and theme
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:51:12-05:00
status: active
---

# Navigation and theme

**Verified by source.** [Navbar](../../src/features/navbar/Navbar.jsx) switches between desktop links and a mobile menu via [responsive styles](../../src/features/navbar/styles/navbarStyles.js). Desktop smooth-scrolls to five sections and routes Dashboard to Login. At the MUI md breakpoint and above, GitHub and LinkedIn text links appear in the top-right beside the theme toggle. Below md, the links appear in the hamburger menu alongside Home, Projects, Experience and Contact. Both layouts use the same GitHub and LinkedIn URLs and open them in new tabs. Both links open the owner's profiles. The mobile menu has no login entry. Scroll past 50 pixels changes the desktop nav styling. Closing the mobile menu resets its contact disclosure.

[Root state](../../src/index.jsx) loads themeMode from localStorage or defaults to dark. The toggle switches between dark and light, saves the mode, and rebuilds the [MUI theme](../../src/theme/theme.js). Local storage access has no error fallback.

See [static hosting ADR](../decisions/ADR-0001-static-hosting.md). No dedicated navigation or theme tests were found. See the [navigation session](../sessions/2026-11-19_23-39-development-session.md) for the Chromium smoke test.
