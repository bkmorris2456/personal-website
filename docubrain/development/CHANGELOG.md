---
title: Application changelog
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-21T08:58:27-05:00
status: active
---

# Application changelog

Selected milestones verified against Git history and session records. Historical commit timestamps are Git author times.

| Timestamp | Commit | Change |
| --- | --- | --- |
| 2026-11-21T08:58:27-05:00 | [Working tree](../sessions/2026-11-21_08-58-development-session.md) | Portfolio section links replace the current history entry while page navigation retains history. |
| 2026-11-21T08:48:19-05:00 | [Working tree](../sessions/2026-11-21_08-48-development-session.md) | Added canonical section hash paths, predictable navigation history, legacy redirects, and an admin gate for the lazy dashboard. |
| 2026-11-20T14:28:28-05:00 | Working tree | Resolved all 56 original vulnerable advisory ranges locally, added validation tooling and documented the [security batches](DEPENDABOT_REMEDIATION.md). No push. |
| 2026-11-19T23:42:22-05:00 | [Working tree](../sessions/2026-11-19_23-39-development-session.md) | Added desktop GitHub and LinkedIn links beside the theme toggle and removed LeetCode from navigation. [Navigation](../features/NAVIGATION_AND_THEME.md) |
| 2026-05-19T22:16:49-04:00 | 2c57d8e | Updated [deployment scripts](../../package.json). |
| 2026-05-19T22:13:00-04:00 | 6d54008 | Restored GitHub Pages build publication. [Hosting ADR](../decisions/ADR-0001-static-hosting.md) |
| 2026-05-19T21:21:06-04:00 | 2e50590 | Restructured dashboard styling. [Dashboard](../features/ADMIN_DASHBOARD.md) |
| 2026-05-18T22:39:11-04:00 | 1d003a8 | Added light and dark modes. [Theme](../features/NAVIGATION_AND_THEME.md) |
| 2026-05-17T08:55:05-04:00 | ecae421 | Began CRA-to-Vite migration. [Vite config](../../vite.config.mjs) |
| 2026-05-16T09:07:57-04:00 | 6f9e25e | Added dashboard pagination, View All, and predefined status and category tags. [Dashboard](../features/ADMIN_DASHBOARD.md) |
| 2026-04-19T22:19:08-04:00 | 2b53570 | Added admin-login functionality. See [current authentication wiring](../features/AUTHENTICATION.md). |
| 2026-03-31T20:37:07-04:00 | 31036c7 | Migrated positions from JSON to Firestore. [Shared readers](../../src/firebase/firestoreService.js) |

DocuBrain initialization is recorded in the [session index](../sessions/SESSION_INDEX.md).
