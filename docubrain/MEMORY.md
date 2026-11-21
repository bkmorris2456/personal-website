---
title: Project memory
created: 2026-11-19T23:29:36-05:00
last_updated: 2026-11-21T08:58:27-05:00
status: active
---

# Project memory

This repository is a personal software development portfolio with a public homepage and an owner-facing content dashboard. React 18, Vite 8 and MUI 5 form a browser SPA configured for GitHub Pages under /personal-website/. Hash routes handle navigation and the dashboard loads lazily. Firebase Auth handles Google sign-in, Firestore stores editable content, and EmailJS handles contact submission.

- **Public site.** Ursus portfolio with Overview, Experience, Projects, About, Technologies Used and Contact. Ursus tokens style Home, Login, the dashboard and its portaled dialogs. The sole visible public dashboard entry is in the top bar. Experience and projects read Firestore. Skills read bundled constants. The palette preference lives in localStorage.
- **Dashboard.** Positions, projects and skills have tables, counts and CRUD paths. Firestore rules are the write authority. The lazy dashboard is gated on the Firebase admin claim.
- **Preserve key boundaries.** Keep the Pages base path and hash routing in mind. Check both public readers and dashboard payloads before changing Firestore fields. Read the [decision records](decisions/DECISION_INDEX.md) for the rationale that can be established.
- **Current focus.** DocuBrain is initialized. Dependency security remediation is complete locally and awaiting review; no push was made. See the [alert ledger](development/DEPENDABOT_REMEDIATION.md). The current branch standardizes section hash paths, replaces history on in-page navigation, and gates the dashboard. Proposed priorities include verifying deployed authorization rules, addressing date precision, and aligning content contracts.
- **Verification limits.** Live provider settings and deployed revision remain unknown. See [current state](CURRENT_STATE.md) for the build and test baseline.

Start with [current state](CURRENT_STATE.md) and the [latest session](sessions/SESSION_INDEX.md). Use the [overview](PROJECT_OVERVIEW.md), [architecture](architecture/SYSTEM_ARCHITECTURE.md), [features](features/FEATURE_INDEX.md), [known issues](development/KNOWN_ISSUES.md), [technical debt](development/TECHNICAL_DEBT.md), and [workflow](references/DEVELOPMENT_WORKFLOW.md) as needed.
