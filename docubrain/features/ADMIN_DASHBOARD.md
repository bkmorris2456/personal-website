---
title: Admin dashboard
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:27:18-05:00
status: active
---

# Admin dashboard

**Verified by source.** [Dashboard](../../src/features/dashboard/Dashboard.jsx) shows counts for positions, completed projects and skills, with separate table cards, client-side pagination (five by default), and a read-only View All dialog. Completed project counts use a case-insensitive Complete status. [DashboardTables](../../src/features/dashboard/components/DashboardTables.jsx) binds each entity's add, edit and delete actions.

[Modal state](../../src/features/dashboard/hooks/useDashboardModal.js) initializes add defaults, normalizes legacy edit values or selects a record for delete confirmation. [Config](../../src/features/dashboard/config/dashboardConfig.js) supplies status and category choices. [Utilities](../../src/features/dashboard/utils/dashboardUtils.js) validate required title/company/name and date ordering, then trim values and convert optional dates to timestamps or null. [CRUD](../../src/features/dashboard/hooks/useDashboardCrud.js) disables submit while writing, refreshes reads and closes on success. Write failures log and alert. [Data loading](../../src/features/dashboard/hooks/useDashboardData.js) clears all lists if any collection read fails and only logs details. During refresh the loading state replaces the tables.

The dashboard has no upload or link fields. Its write contract diverges from public project and skill presentation, and formatted position dates lose day precision before editing. See [known issues](../development/KNOWN_ISSUES.md), [data shapes](../architecture/DATA_FLOW.md), and [Firebase ADR](../decisions/ADR-0002-direct-firebase.md). No dedicated dashboard test was found. Live writes were not performed.
