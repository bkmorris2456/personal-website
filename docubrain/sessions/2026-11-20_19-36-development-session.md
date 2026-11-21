---
title: Project Tech Stack edit fix
created: 2026-11-20T19:37:59-05:00
last_updated: 2026-11-20T19:37:59-05:00
status: active
---

# Project Tech Stack edit fix

- **Timing.** Started around 19:36 local on November 20, 2026. Completed 2026-11-20T19:37:59-05:00.
- **Implemented.** Project edit initialization selects the first string or array from `stack`, `techStack` and `technologies`. Arrays display their string entries joined with commas. An explicit empty string or array remains blank. Edits send only changed project fields, preserving original field types and aliases on unrelated saves. No-op edits skip the write. Adds retain the existing string payload.
- **Verified.** The full suite passed 24 tests, including 15 new regressions using mocked Firestore and real dashboard hooks. ESLint passed. The Vite build passed in a temporary copy of the working tree with the existing chunk-size warning. No live Firestore, migration, commit or push.
- **Remaining.** Legacy non-string values can still reach title, description, status and position or skill trims. Live rules and document shapes remain unknown. Follow up with schema-backed coverage before broadening normalization.
