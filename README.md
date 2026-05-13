# Oldschool Agency Ops API

## Overview

Production-ready Express.js backend using TypeScript, Prisma, MySQL, JWT, Zod, and OpenAPI.

## Quick Start

```powershell
pnpm install
docker compose up -d
pnpm prisma:deploy
pnpm dev
```

## URLs

- API: `http://localhost:3000`
- API v1: `http://localhost:3000/api/v1`
- Health: `http://localhost:3000/health`
- Swagger: `http://localhost:3000/api/docs`
- Adminer: `http://localhost:8080`

## Architecture

The codebase uses feature-based modular architecture. Each module owns routes, controllers, services, repositories, validations, schemas, docs, utils, and tests.

See the central documentation index at [`../docs/README.md`](../docs/README.md).
