---
title: ADR-0002 Direct Firebase integration
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:27:18-05:00
status: active
---

# ADR-0002 Direct Firebase integration

**Status:** In use. **Historical evidence timestamp:** 2026-03-31T20:37:07-04:00 (Git author time for commit 31036c7, positions migration). Exact decision timestamp is unknown.

**Context and problem.** Portfolio positions moved from a JSON representation to Firestore. The dashboard also needs persistent editable content and an administrative identity.

**Decision and implementation.** Browser modules use Firebase directly. [Shared readers](../../src/firebase/firestoreService.js) serve public and dashboard consumers. [Dashboard writes](../../src/features/dashboard/hooks/useDashboardCrud.js) target the same collections. [Auth context](../../src/context/AuthContext.jsx) resolves the Firebase admin claim.

**Alternatives and rationale.** JSON was the prior positions source. Other alternatives and original rationale are unknown.

**Consequences.** Content and identity are service-backed. Firestore rules control access, and shared read transformations affect both public rendering and admin editing. See [data flow](../architecture/DATA_FLOW.md) and [authentication](../features/AUTHENTICATION.md).
