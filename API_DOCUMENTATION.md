# API Documentation

The Circle Backend exposes a RESTful API. This document provides an overview of the available resources.

## 📖 Swagger UI

For interactive documentation, including the ability to test endpoints directly, please start the server and visit:

**[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**
*(Note: Port depends on your environment configuration)*

## Base URL

All API endpoints are prefixed with:
`/api/v1`

## Resources

### 1. Authentication (`/auth`)
*   **POST /login**: Authenticate user and receive a JWT.
*   **POST /register**: Create a new user account.
*   **GET /check**: Verify current token validity.

### 2. Users (`/users`)
*   **GET /**: Search users.
*   **GET /:id**: Get user details.
*   **PATCH /current**: Update current user profile.

### 3. Threads (`/threads`)
*   **GET /**: specific thread.
*   **POST /**: Create a new thread.
*   **GET /**: Get a single thread by ID.
*   **DELETE /:id**: Delete a thread (owner only).

### 4. Interactions
*   **POST /likes**: Like a thread.
*   **DELETE /likes/:threadId**: Unlike a thread.
*   **POST /follows**: Follow a user.
*   **DELETE /follows/:userId**: Unfollow a user.

## Error Handling

Standard HTTP status codes are used:

- `200 OK`: Success.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Validation error or invalid input.
- `401 Unauthorized`: Missing or invalid authentication token.
- `403 Forbidden`: Authenticated but not authorized for this action.
- `404 Not Found`: Resource does not exist.
- `500 Internal Server Error`: Server-side processing error.

## Authentication

Identify yourself by including the JWT in the request header:

```
Authorization: Bearer <your_jwt_token>
```
