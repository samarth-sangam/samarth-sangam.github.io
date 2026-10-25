# Security Policy

## Supported Versions

This is a continuously deployed static site, so only the latest commit on `main`, which is what's live at https://samarth-sangam.github.io, receives security fixes.

| Version                 | Supported          |
| ----------------------- | ------------------ |
| `main` (live site)      | :white_check_mark: |
| Older commits and forks | :x:                |

## Reporting a Vulnerability

Please **do not open a public issue** for security problems.

Report privately through [GitHub private vulnerability reporting](https://github.com/samarth-sangam/samarth-sangam.github.io/security/advisories/new). Include:

- what is affected (a page, a dependency or the CI workflow)
- steps to reproduce or a proof of concept
- the impact you expect

What to expect:

- **Acknowledgement** within 7 days.
- **Status updates** at least every 14 days until the report is resolved.
- **If accepted**: a fix is deployed to the live site, and you are credited in the advisory unless you prefer not to be.
- **If declined**: you get an explanation, for example that the issue is out of scope or not exploitable on a static site.

In scope: this repository's source, its build and deploy workflow, and the published site. Vulnerabilities in third-party services (GitHub, Medium) should be reported to those vendors.
