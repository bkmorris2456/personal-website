---
title: Admin dashboard
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-21T08:48:19-05:00
status: active
---

# Admin dashboard

**Verified by source.** [Dashboard](../../src/features/dashboard/Dashboard.jsx) shows counts for positions, completed projects and skills, with separate table cards, client-side pagination (five by default), and a read-only View All dialog. Completed project counts use a case-insensitive Complete status. [DashboardTables](../../src/features/dashboard/components/DashboardTables.jsx) binds each entity's add, edit and delete actions.

[Modal state](../../src/features/dashboard/hooks/useDashboardModal.js) initializes add defaults, normalizes legacy edit values or selects a record for delete confirmation. [Config](../../src/features/dashboard/config/dashboardConfig.js) supplies status and category choices. [Utilities](../../src/features/dashboard/utils/dashboardUtils.js) validate required title/company/name and date ordering, then trim values and convert optional dates to timestamps or null. [CRUD](../../src/features/dashboard/hooks/useDashboardCrud.js) disables submit while writing, refreshes reads and closes on success. Write failures log and show an inline dialog alert, and successful operations show an inline confirmation. [Data loading](../../src/features/dashboard/hooks/useDashboardData.js) clears all lists if any collection read fails, logs details and displays an error. During refresh the loading state replaces the tables.

The lazy dashboard mounts after the [route guard](AUTHENTICATION.md) verifies the Firebase admin claim. The dashboard has no upload or link fields. Its write contract diverges from public project and skill presentation, and formatted position dates lose day precision before editing. See [known issues](../development/KNOWN_ISSUES.md), [data shapes](../architecture/DATA_FLOW.md), and [Firebase ADR](../decisions/ADR-0002-direct-firebase.md). Dashboard integration tests cover create, edit, delete and view-all with mocked Firestore. The [refinement section](../development/URSUS_BRAND_REDESIGN.md#refinement-pass-1) records both-theme browser checks. Live writes were not performed.
