---
title: Authentication
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:27:18-05:00
status: active
---

# Authentication

**Verified by source.** [Login](../../src/features/login/Login.jsx) opens Firebase Google sign-in and disables its button during loading or sign-in. [AuthContext](../../src/context/AuthContext.jsx) observes auth changes, refreshes the ID token, and accepts only the boolean admin claim. Signed-out state clears the user and admin flag. Claim lookup failures log an error and resolve as non-admin. The login page redirects admins to the dashboard, signs out non-admins and displays an error, and reports popup failures.

[ProtectedRoute](../../src/features/login/ProtectedRoute.jsx) can wait for auth and redirect unauthenticated or non-admin users, but [App](../../src/App.jsx) currently leaves it unwired. No logout control is rendered in the dashboard. The [Firebase ADR](../decisions/ADR-0002-direct-firebase.md) covers the managed service boundary. No dedicated auth test was found. Live sign-in, claim provisioning and Firestore authorization were not verified.
