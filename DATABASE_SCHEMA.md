# Database Schema

The application uses **PostgreSQL** as the primary relational database, managed via **Prisma ORM**.

## Entity Relationship Diagram

The following diagram represents the relationships between the core models: `User`, `Profile`, `Thread`, `Follow`, and `Like`.

```mermaid
erDiagram
    User ||--o| Profile : "has"
    User ||--o{ Thread : "creates"
    User ||--o{ Like : "likes"
    
    Profile ||--o{ Thread : "displays"
    Profile ||--o{ Follow : "followed by (follower)"
    Profile ||--o{ Follow : "follows (following)"
    
    Thread ||--o{ Like : "receives"
    Thread ||--o{ Thread : "replies to"

    User {
        String id PK
        String email
        String password
        Boolean socialConnection
        UserRole role
        DateTime createdAt
        DateTime updatedAt
    }

    Profile {
        String id PK
        String fullName
        String username
        String bio
        String cover
        String image
        String userId FK
    }

    Thread {
        String id PK
        String text
        String image
        String profileId FK
        String threadId FK "Parent Thread"
        DateTime createdAt
        DateTime updatedAt
    }

    Follow {
        String id PK
        String followerId FK
        String followingId FK
    }

    Like {
        String id PK
        String userId FK
        String threadId FK
    }
```

## Models Description

### User
Represents the authentication account.
- **id**: Unique identifier (UUID).
- **email**: Unique email address.
- **password**: Hashed password.
- **role**: `ADMIN` or `USER`.

### Profile
Public-facing profile information.
- **userId**: One-to-one relation with User.
- **username**: Unique handle.
- **fullName**: Display name.
- **bio**, **image**, **cover**: Profile customization.

### Thread
A post or a reply.
- **text**: Content of the post.
- **image**: Optional attachment.
- **threadId**: If present, this is a reply to another thread (self-referential relation).
- **profileId**: The author.

### Follow
Represents the social graph.
- **followerId**: Who is following.
- **followingId**: Who is being followed.

### Like
Represents a user liking a thread.
- **userId**: Who liked.
- **threadId**: What was liked.
