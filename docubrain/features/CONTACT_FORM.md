---
title: Contact form
created: 2026-11-19T23:27:18-05:00
last_updated: 2026-11-19T23:27:18-05:00
status: active
---

# Contact form

**Verified by source.** [ContactForm](../../src/features/home/components/contact/ContactForm.jsx) submits required name, email and message fields through EmailJS sendForm using the form ref and bundled client configuration. Success logs the provider result and clears the fields. Rejection logs the provider error and alerts the user. Email is a required text input without email-specific validation. There is no pending state, duplicate-submit guard or visible success message.

The form is a direct external service call from the [public homepage](../../src/features/home/Home.jsx). See [system architecture](../architecture/SYSTEM_ARCHITECTURE.md) for the service boundary. No EmailJS-specific ADR or dedicated test was found. Provider settings and live delivery were not verified.
