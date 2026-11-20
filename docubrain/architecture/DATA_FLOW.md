---
title: Data flow and document shapes
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:27:18-05:00
status: active
---

# Data flow and document shapes

**Verified.** [Shared readers](../../src/firebase/firestoreService.js) use one-shot unfiltered Firestore collection reads and return document IDs with fields. Experience and Projects fetch independently at mount. Skills renders a bundled constant. Dashboard reads all collections together, derives counts and table rows, and refreshes after a mutation. Google sign-in feeds an auth observer, which refreshes token claims and supplies state to login and the available guard. Contact sends the form directly to EmailJS.

| Collection | Dashboard payload | Reader details |
| --- | --- | --- |
| positions | title, company, description, location, start and end | Writes use Firestore timestamps or null. Shared reads format dates as month and year, fill missing end with Present, and normalize description strings to arrays. |
| projects | title, stack, description, status | Public cards read title, description, imageKey, demoLink and githubLink. The technologies prop is passed but unused. Dashboard also reads legacy project and stack aliases. |
| skills | name, category | Dashboard also reads legacy skill. Home uses [its own constants](../../src/features/home/constants/skills.jsx). |

[CRUD](../../src/features/dashboard/hooks/useDashboardCrud.js) uses addDoc, updateDoc and deleteDoc. [Dashboard utilities](../../src/features/dashboard/utils/dashboardUtils.js) validate and construct payloads. These shapes come from code. Deployed schema and constraints are **unknown**. See [dashboard](../features/ADMIN_DASHBOARD.md) and [known issues](../development/KNOWN_ISSUES.md).
