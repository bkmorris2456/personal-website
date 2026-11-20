---
title: Known issues
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:51:12-05:00
status: active
---

# Known issues

All entries are open and verified by source inspection or local build output. Deployment behavior remains unknown. Severity reflects the affected workflow.

| Issue | Severity | Trigger and observed code behavior | Proposed fix |
| --- | --- | --- | --- |
| Dashboard guard unwired | High | The [dashboard route](../../src/App.jsx) renders directly and does not apply the existing guard. Firebase permissions remain a separate control. | Apply the existing guard and verify deployed rules through an authorized environment. |
| Position edits lose date precision | High | [Readers](../../src/firebase/firestoreService.js) format timestamps as month/year. The [edit form helpers](../../src/features/dashboard/utils/dashboardUtils.js) reconstruct input dates from those strings and may submit a different day even if the operator only changes another field. | Preserve raw timestamps through the edit path and format at display boundaries. |
| Skills edits do not update the public list | Medium | [Home](../../src/features/home/Home.jsx) uses bundled skills while dashboard CRUD edits the Firestore collection. | Decide on one authoritative source and document the mapping. |
| Project creation leaves public card fields unset | Medium | The [write payload](../../src/features/dashboard/utils/dashboardUtils.js) excludes the links and image key consumed by [public cards](../../src/features/home/components/projects/ProjectTabs.jsx). | Define the shared project schema and expose validated inputs where needed. |
| Read errors resemble empty content | Medium | [Dashboard loading](../../src/features/dashboard/hooks/useDashboardData.js) clears all lists on any rejection. Public experience and project sections have no failure handling. | Give read failures an explicit state and isolate collection failures. |
| Pending dashboard dialog can close | Medium | [Dashboard](../../src/features/dashboard/Dashboard.jsx) passes a constant false to the modal state hook. Submit is disabled during writes but cancel or dismiss can clear form state while the request continues. | Share the actual pending state with the dialog's close handler. |
| Satoshi font URLs unresolved in the build | Medium | [Font declarations](../../src/assets/fonts/fonts.css) use paths relative to the wrong directory. The local Vite build leaves three URLs unresolved. Browser fallback was not tested. | Point the declarations at the sibling satoshi directory and verify built font requests. |
