---
title: Technical debt
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-21T08:48:19-05:00
status: active
---

# Technical debt

- **Medium.** Automated suites cover routing, authentication transitions, dashboard CRUD, and Firestore contracts with mocked external services. Live provider integration and deployed Firestore rules still need verification. JavaScript compiler validation uses allowJs with checkJs disabled.
- **High.** Data contracts are implicit and spread across public rendering, shared readers and dashboard writes. Define canonical fields and preserve compatibility with legacy aliases. See [data flow](../architecture/DATA_FLOW.md) and [known issues](KNOWN_ISSUES.md).
- **Medium.** The [manifest](../../package.json) retains legacy proxy and unused server dependencies. Animation imports rely on a transitive package. Audit dependencies and tool configuration before removing entries.
- **Medium.** There is no checked-in provider configuration runbook for rule verification, claim provisioning or EmailJS template maintenance. Capture authorized procedures when available without recording sensitive values.
- **Low.** [Vite config](../../vite.config.mjs) regenerates a tracked bundle report when building in place. Clarify whether the report is a maintained artifact and where local output belongs.
