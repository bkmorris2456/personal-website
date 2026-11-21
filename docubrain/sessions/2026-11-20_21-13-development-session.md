---
title: Ursus About and Contact layout
created: 2026-11-20T21:14:39-05:00
last_updated: 2026-11-20T21:14:39-05:00
status: active
---

# Ursus About and Contact layout

- **Objective.** Center Contact in one column and group the About portrait and biography.
- **Implemented.** Updated Home markup and the shared Ursus stylesheet. Details are in the [redesign record](../development/URSUS_BRAND_REDESIGN.md#about-and-contact-layout-refinement).
- **Verified.** All 35 tests, ESLint and an isolated production build passed. Chromium layout checks passed at four widths in both themes. Native form validation and mocked success and error flows passed.
- **Remaining.** Existing build chunk-size warning. Live email delivery was outside verification. No commit, push or deployment.
