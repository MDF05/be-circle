# Environment Variables

The application requires the following environment variables to run. Copy `.env.example` to `.env` for local development.

## Core Configuration

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | The port the server listens on | `3000` |
| `NODE_ENV` | Environment mode | `development`, `production` |

## Database (Prisma)

| Variable | Description |
| :--- | :--- |
| `DATABASE_URL` | PostgreSQL connection string |
| | `postgresql://user:password@localhost:5432/circle?schema=public` |

## Authentication

| Variable | Description |
| :--- | :--- |
| `JWT_SECRET` | Secret key for signing JSON Web Tokens |
| | `your-super-secret-key-change-this` |

## Services

### Cloudinary (Image Upload)
| Variable | Description |
| :--- | :--- |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name |
| `CLOUDINARY_API_KEY` | Cloudinary API Key |
| `CLOUDINARY_API_SECRET` | Cloudinary API Secret |

### Redis (Caching)
| Variable | Description |
| :--- | :--- |
| `REDIS_HOST` | Hostname of the Redis server |
| `REDIS_PORT` | Port of the Redis server (default 6379) |
| `REDIS_PASSWORD` | Password (if applicable) |

## Example `.env` File

```dotenv
PORT=3000
NODE_ENV=development

DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"

JWT_SECRET="secret123"

CLOUDINARY_CLOUD_NAME="dxyz123"
CLOUDINARY_API_KEY="1234567890"
CLOUDINARY_API_SECRET="abcdefg-123456"

REDIS_HOST="127.0.0.1"
REDIS_PORT=6379
REDIS_PASSWORD=""
```
