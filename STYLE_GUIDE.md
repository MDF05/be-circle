# Style Guide

This project follows strict coding standards to ensure maintainability and consistency.

## Language Standards

- **Language**: TypeScript (strict mode recommended).
- **Target**: ES2020 or higher.

## Code Formatting

We use **Prettier** for code formatting.

- **Indentation**: 2 spaces.
- **Quotes**: Double quotes (`"`) preferred.
- **Semicolons**: Always used.

## Naming Conventions

### Variables & Functions
*   Use `camelCase`.
*   Functions should be verbs (e.g., `createUser`, `getThread`).
*   Booleans should be prefixed (e.g., `isActive`, `hasPermission`).

### files
*   Use `camelCase` or `kebab-case` consistently.
*   Classes/Components (if any) should be `PascalCase`.

### Database
*   Prisma models use `PascalCase` (e.g., `User`, `Thread`).
*   Database table mapping is usually lowercase (e.g., `@@map("user")`).

## Architecture Patterns

### Controller-Service Pattern
*   **Controllers**: Handle HTTP headers, status codes, and input parsing. **Do not** put business logic here.
*   **Services**: Handle business logic, database calls, and external API calls.
*   **Utils**: Pure functions and helpers.

### Error Handling
*   Use `try/catch` blocks in Controllers.
*   Pass errors to the global error handling middleware using `next(err)`.
*   Do not fail silently.

## Linting
(If configured) Run linting before committing:

```bash
npm run lint
```
