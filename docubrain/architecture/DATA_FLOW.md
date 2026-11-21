---
title: Data flow and document shapes
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-21T08:05:00-05:00
status: active
---

# Data flow and document shapes

**Verified.** [Shared readers](../../src/firebase/firestoreService.js) use one-shot unfiltered Firestore collection reads and return document IDs with fields. Experience and Projects fetch independently at mount. Technologies Used renders four categories from bundled data. Dashboard reads all collections together, derives counts and table rows, and refreshes after a mutation. Google sign-in feeds an auth observer, which refreshes token claims and supplies state to login and the available guard. Contact sends the form directly to EmailJS.

| Collection | Dashboard payload | Reader details |
| --- | --- | --- |
| positions | title, company, description, location, start and end | Writes use Firestore timestamps or null. Shared reads format dates as month and year, fill missing end with Present, and normalize description strings to arrays. |
| projects | Adds write title, stack, description and status. Edits write only changed fields. | The dashboard displays stack strings and arrays from the canonical field or legacy aliases. Stack text writes use the canonical field. Public cards read title, description, demoLink, githubLink and supported technology values from stack, techStack or technologies. |
| skills | name, category | Dashboard also reads legacy skill. Home uses [its own constants](../../src/features/home/constants/skills.jsx). |

[CRUD](../../src/features/dashboard/hooks/useDashboardCrud.js) uses addDoc, updateDoc and deleteDoc. [Dashboard utilities](../../src/features/dashboard/utils/dashboardUtils.js) validate and construct payloads. These shapes come from code. Deployed schema and constraints are **unknown**. See [dashboard](../features/ADMIN_DASHBOARD.md) and [known issues](../development/KNOWN_ISSUES.md).
