---
title: Dependabot security remediation
created: 2026-11-20T14:28:28-05:00
last_updated: 2026-11-20T14:28:28-05:00
status: active
---

# Dependabot security remediation

- **Start:** 2026-11-20, approximately 14:14 America/Detroit; exact initial timestamp was not captured.
- **Completion:** 2026-11-20T14:28:28-05:00
- **Objective:** Resolve all actionable alerts while preserving functionality; do not push.

**Verified.** Read live GitHub alerts: 56 across 14 packages. Grouped by dependency/path and specific advisory root cause in the [ledger](../development/DEPENDABOT_REMEDIATION.md). Applied prioritized batches with tests, compiler, lint and production builds after each. All 56 original advisory ranges are absent locally and npm audit reports zero vulnerabilities; an additional nanoid vulnerability was also fixed. Clean npm ci and repeated checks pass.

Changed package.json/package-lock.json for compatible security updates, one scoped Firestore gRPC override, and Vitest/jsdom/ESLint/TypeScript tooling. Replaced the obsolete CRA test with five actual routing tests and added four Firestore contract tests. Added ESLint, Vitest and compiler configs. No runtime application code changed. Updated memory, current state, dependency/workflow/debt/changelog/reference records and this indexed session. Existing untracked alert/code-quality export files were preserved. The generated tracked bundle report was restored after validation.

**Decisions and breaking changes:** Firestore's ~1.9.0 constraint requires a gRPC 1.x override; latest upstream remains constrained. websocket-driver 0.8 disables draft75/76 by default; standardized browser WebSockets remain applicable. Vite updates optional WASM tooling, including @emnapi beta versions; only native macOS is verified. Full rationale and upstream links are in the ledger. No forced audit fixes, dismissals, suppression, commits, publication or pushes occurred.

**Validation limits:** Nine tests mock page/Auth components and remote services. Compiler noEmit/allowJs checking is not strict JavaScript type coverage. No live Auth, Firestore write, EmailJS delivery, Node gRPC RPC or alternate platform WASM verification. Existing font/chunk warnings, EmailJS deprecation and npm install-script policy warnings remain.

**Next steps:** User reviews local changes and approves any push. After approved integration, verify GitHub rescans and closes alerts. Remove gRPC override once upstream accepts a secure version. No known npm vulnerabilities remain as of this session.
