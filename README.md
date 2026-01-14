# Circle Backend Documentation

Welcome to the **Circle Backend** repository documentation. This monolithic application serves as the core API for the Circle social platform, built with Node.js, Express, and TypeScript.

## 📋 Table of Contents

This README serves as the central hub for all documentation. Please refer to the specific documents below for detailed information.

### 📚 Core Documentation

- **[Architecture](ARCHITECTURE.md)**: System design, request flow, and technology choices.
- **[API Documentation](API_DOCUMENTATION.md)**: Endpoints, request/response formats, and Swagger UI.
- **[Database Schema](DATABASE_SCHEMA.md)**: Entity-Relationship diagrams and Prisma models.
- **[Deployment](DEPLOYMENT.md)**: Build, deployment, and configuration guides.
- **[Environment Variables](ENVIRONMENT.md)**: Configuration reference for `.env` files.
- **[Testing](TESTING.md)**: Testing strategy and execution instructions. (Development)

### 🤝 contribution & Standards

- **[Style Guide](STYLE_GUIDE.md)**: Code style, naming conventions, and linting rules.
- **[Contributing](CONTRIBUTING.md)**: Workflow for submitting pull requests and reporting issues.
- **[Security](SECURITY.md)**: Security policy and vulnerability reporting.
- **[Code of Conduct](CODE_OF_CONDUCT.md)**: Community standards and expectations.

### 📢 Project Information

- **[Changelog](CHANGELOG.md)**: History of changes and releases.
- **[Roadmap](ROADMAP.md)**: Future plans and upcoming features.
- **[Disclaimer](DISCLAIMER.md)**: Liability and warranty information.
- **[License](LICENSE)**: Legal usage terms.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js**: v18+ (Recommended)
- **PostgreSQL**: v14+
- **Redis**: v6+ (Optional for local dev, required for prod caching)
- **npm** or **yarn**

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/MDF05/circle-backend.git
    cd circle-backend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    Copy `.env.example` to `.env` and fill in the required values.
    ```bash
    cp .env.example .env
    ```
    See [ENVIRONMENT.md](ENVIRONMENT.md) for details.

4.  **Database Migration**
    Run Prisma migrations to set up your database.
    ```bash
    npm run migrate:dev
    ```

### Running the Server

- **Development Mode** (with hot reload)
  ```bash
  npm run dev
  ```
  Server usually starts at `http://localhost:3000`.

- **Production Build**
  ```bash
  npm run build
  npm run prod
  ```

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Caching**: Redis
- **File Storage**: Cloudinary (via `cloudinary` SDK)
- **Validation**: Zod
- **Documentation**: Swagger UI Express

## 🔐 API Access

The API is protected using JWT (JSON Web Tokens). Most endpoints require a valid Bearer token in the `Authorization` header.

```http
Authorization: Bearer <your_token>
```

See [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for endpoint details.

## �️ Security

We take security seriously. Please review our [Security Policy](SECURITY.md) for reporting vulnerabilities.

## � License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

## 👤 Maintainer

Maintained by the Circle Development Team.
