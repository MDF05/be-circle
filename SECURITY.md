# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take security vulnerabilities seriously.

1.  **Do not create a public GitHub issue.**
2.  Please email the maintainer or valid security contact (e.g., security@example.com - placeholder).
3.  Provide full details of the vulnerability and steps to reproduce.

We will acknowledge receipt of your vulnerability report within 48 hours and strive to send you regular updates about our progress.

## Authentication and Authorization

*   This backend uses **JWT (JSON Web Tokens)** for authentication.
*   Secrets are stored in environment variables and should **never** be committed to the repository.
*   Password hashing is performed using **Bcrypt**.

## Depency Management

We use `npm` to manage dependencies. Please ensure `npm audit` is run regularly to identify known vulnerabilities in the dependency tree.
