---
title: Project stack save investigation
created: 2026-11-20T18:37:10-05:00
last_updated: 2026-11-20T18:37:10-05:00
status: active
---

# Project stack save investigation

- **Timing.** November 20, 2026, around 18:36 local. Completed 2026-11-20T18:37:10-05:00.
- **Objective.** Trace the existing-project save error and propose a compatible fix.
- **Verified.** A local in-memory harness ran the project utility functions without Firebase. Arrays (including empty arrays) and a map survive edit initialization and fail at payload construction. String and missing-stack cases produce string payloads. The code dates to `8468df6` (April 19, 2026) and moved into dashboard utilities in `bef411a`.
- **Unknown.** The failing document's exact field and shape were not inspected. No application source or Firestore data changed.
- **Proposed.** Normalize stack values for the text field at edit time and omit an unchanged stack from the Firestore update. Preserve existing string writes for create and intentional edits. Add fixture and mocked submit coverage for arrays, aliases, ordinary strings and missing values.
