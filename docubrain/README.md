---
title: DocuBrain
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:27:18-05:00
status: active
---

# DocuBrain

DocuBrain preserves repository knowledge, decisions, and development history across Codex sessions. The root [AGENTS.md](../AGENTS.md) establishes the maintenance workflow.

1. Start with [Memory](MEMORY.md), [Current state](CURRENT_STATE.md), and the latest relevant [session](sessions/SESSION_INDEX.md).
2. Use the [project overview](PROJECT_OVERVIEW.md), [architecture](architecture/SYSTEM_ARCHITECTURE.md), [feature index](features/FEATURE_INDEX.md), [decision index](decisions/DECISION_INDEX.md), and [references](references/REFERENCE_INDEX.md) to find relevant evidence. Verify potentially stale information against source and executed tests.
3. After substantive work, update affected records and add a session with its objective, timestamps, changed files, decisions, problems, validation results, and next steps. Update memory and current state when important context changes. Skip empty session records and keep updates proportional.

[Changelog](development/CHANGELOG.md) records significant application changes. [Known issues](development/KNOWN_ISSUES.md) tracks confirmed defects. [Technical debt](development/TECHNICAL_DEBT.md) tracks structural risks and improvements.

Use descriptive uppercase snake case for topic documents, sequential `ADR-NNNN-topic.md` names for decisions, and `YYYY-MM-DD_HH-MM-development-session.md` using actual local start time for sessions. Add seconds if needed for same-minute uniqueness. Index new documents. Begin each DocuBrain Markdown file with YAML containing title, created, last_updated, and status. Preserve created and refresh last_updated on substantive edits. Use ISO 8601 with the actual offset, record event timestamps where verified, and label unknown historical times. Identify superseded decisions and link to their successors.

Use relative Markdown links to source and related docs. Label source or execution evidence **Verified**, deductions **Inferred**, missing evidence **Unknown**, and agreed future work **Planned**. Label suggested fixes as proposals. Keep credentials and sensitive configuration values out of documentation.
