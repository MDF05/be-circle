# Testing Guide

## Current Status

> [!NOTE]
> Automated tests are not currently implemented for this repository (`package.json` test script echoes an error).

This document outlines the recommended approach for testing the Circle Backend and instructions for future implementation.

## Recommended Testing Strategy

### 1. Unit Testing
*   **Tools**: Jest or Vitest.
*   **Scope**: Test individual Service methods and utility functions in isolation. Mock Prisma and Redis dependencies.

### 2. Integration Testing
*   **Tools**: Supertest with Jest.
*   **Scope**: Test API endpoints (`/api/v1/...`). Send real HTTP requests to a test instance of the app connected to a test database.

## How to Run Tests (Future)

Once tests are implemented, usage will be:

```bash
npm test
```

## Manual Testing (Current)

Until automated tests are added, please use **Swagger UI** or **Postman** for manual verification.

1.  Start the server: `npm run dev`
2.  Open [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
3.  Authenticate via the `/auth/login` endpoint.
4.  Copy the token.
5.  Use the "Authorize" button in Swagger to set the Bearer token.
6.  Execute requests against other endpoints.
