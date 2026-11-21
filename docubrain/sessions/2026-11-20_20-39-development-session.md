---
title: Ursus brand redesign
created: 2026-11-20T20:44:36-05:00
last_updated: 2026-11-20T20:44:36-05:00
status: active
---

# Ursus brand redesign

- **Timing.** Implementation and validation on November 20, 2026. Completed 2026-11-20T20:44:36-05:00.
- **Implemented.** Used the supplied homepage and interaction references, kept the original Ursus PNG, and scoped shared design tokens and motion to the public and sign-in surfaces. Kept the React/Vite SPA route structure and added shareable section fragments. See the [redesign record](../development/URSUS_BRAND_REDESIGN.md) for changed files and choices.
- **Verified.** 29 tests, ESLint, compiler and isolated Vite production build passed. Chromium passed at five widths with mocked reads and external requests blocked. Verified keyboard focus, mobile disclosure, reduced motion, theme persistence, desktop indicator, direct links with delayed data, browser history and existing login/dashboard routes.
- **Remaining.** The build reports the existing large-chunk warning. Live provider behavior and cross-browser or screen-reader testing remain unverified. No deployment, push, commit, rule change or production data mutation.
