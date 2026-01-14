# Deployment Guide

This document outlines the steps to build and deploy the **Circle Backend**.

## Prerequisites

- **Environment**: Node.js v16+, npm/yarn.
- **Database**: Access to a PostgreSQL instance (e.g., Supabase, Neon, RDS).
- **Cache**: Access to a Redis instance (e.g., Upstash, Redis Cloud).
- **Storage**: Cloudinary account.

## Build Process

The application is written in TypeScript and must be compiled to JavaScript before production use.

1.  **Install Production Dependencies**
    ```bash
    npm ci --only=production
    ```

2.  **Generate Prisma Client**
    ```bash
    npx prisma generate
    ```

3.  **Compile TypeScript**
    ```bash
    npm run build
    ```
    This creates a `dist/` folder containing the compiled JavaScript.

4.  **Database Migration**
    Apply pending migrations to the production database.
    ```bash
    npm run migrate:prod
    ```

## Starting the Application

Use the compiled entry point:

```bash
npm run prod
```

This runs `node dist/app.js`.

## Deploying to Vercel

The project includes a `vercel.json` file, suggesting Vercel support.

1.  Install Vercel CLI: `npm i -g vercel`
2.  Login: `vercel login`
3.  Deploy: `vercel`

Ensure you add all Environment Variables in the Vercel dashboard.

## Services Configuration

### Process Management (PM2)
For VPS deployments (DigitalOcean, EC2), use generic process managers like PM2.

```bash
npm install -g pm2
pm2 start dist/app.js --name "circle-backend"
```
