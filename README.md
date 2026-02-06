# Nodes Monitor (Express + React + TypeScript)

A minimal monitoring dashboard that displays a list of simulated worker nodes.

The backend exposes a REST API.

The frontend periodically polls the API to reflect simulated real-time changes.

## Features

- Simulated monitoring of 50 worker nodes
- Real-time data updates via polling
- REST API with shared DTO types
- Responsive table-based UI
- Visual status and CPU usage indicators
- Dockerized production setup

## Tech Stack

- **Backend:** Node.js, Express, TypeScript
- **Frontend:** React + Vite, TypeScript, TailwindCSS, shadcn/ui
- **Monorepo:** npm workspaces
- **Docker:** docker-compose (optional)

## Monorepo Structure

```
nodes-monitor/ - Monorepo root
├── docker/ - Docker-related files
│ ├── backend.Dockerfile
│ ├── frontend.Dockerfile
│ └── nginx.conf
│
├── packages/
│ ├── backend/ - Express REST API (TypeScript)
│ ├── frontend/ - React SPA (Vite + TS)
│ └── shared/ - Shared DTO types used by backend & frontend
│
├── .dockerignore
├── .gitignore
├── docker-compose.yml
├── eslint.config.mjs
├── package-lock.json
├── package.json
└── README.md
```

## Getting Started (Local Development)

#### Clone the repository:

```bash
git clone https://github.com/YaroslavUdych/nodes-monitor.git
```

#### Navigate to the project directory:

```bash
cd nodes-monitor
```

#### Install dependencies:

```bash
npm install
```

#### Start the development servers:

this command starts both frontend and backend concurrently

```bash
npm run dev
```

- **Frontend (Vite dev server):** http://localhost:5173
- **Backend (Express API):** http://localhost:3000

Frontend proxies API requests:

- `GET http://localhost:5173/api/nodes` → proxied to `http://localhost:3000/api/nodes`

#### To see the list of available commands, check the `scripts` section in the root `package.json`.

## Running with Docker

The application consists of two services:

### Backend (API)

- Runs inside a Docker container on port **3000**
- Exposed to the host on port **3000**

API URL:
http://localhost:3000

Example endpoint:
http://localhost:3000/api/nodes

### Frontend (React + Nginx)

- Production build served by **nginx**
- Container listens on port **80**
- Exposed to host on port **5173**

Frontend URL:
http://localhost:5173

### Start application (build images if needed)

```bash
docker-compose up --build
```

or

```bash
npm run docker:up:build
```

### Start application (without rebuilding images)

```bash
docker-compose up
```

or

```bash
npm run docker:up
```

### Stop containers

```bash
docker-compose down
```

or

```bash
npm run docker:down
```

#### To see the list of available commands, check the `scripts` section in the root `package.json`.

## API Documentation

please read the API documentation in the backend package: [API Documentation](./packages/backend/README.md)

## Client Documentation

please read the Client documentation in the frontend package: [Client Documentation](./packages/frontend/README.md)
