# Backend (Express API)

TypeScript Express REST API that serves simulated monitoring data.

## Tech

- Node.js + Express
- TypeScript
- In-memory store (no database)

## Folder Structure

```
backend/
├── src/
│   ├── controllers/ - HTTP handlers
│   │
│   ├── data/ - In-memory data store
│   │
│   ├── routes/ - Express routes
│   │
│   ├── services/ - Business logic
│   │
│   ├── utils/ - Random helpers (clamp, randomInt etc.)
│   │
│   ├── app.ts - Express app setup
│   └── index.ts - Server entry point
│
├── package.json
├── tsconfig.json
└── README.md
```

## Running (Local)

From repository root:

```bash
npm run dev:backend
```

### Backend starts at:

http://localhost:3000

if another port is not specified in the `.env` file.

## API Endpoints

- `GET /api/nodes` - Returns a list of simulated nodes `NodeDto[]`.

### Behavior:

- 50 nodes are stored in memory.

- On every request, node values are mutated:
   - status changes occasionally

   - cpuUsage changes randomly (0–100)

   - memoryUsage changes randomly (GB range)

   - timestamp updated to current time

- Responses include header:
   - Cache-Control: no-store

### NodeDto

```typescript
export interface NodeDto {
	id: string // Unique identifier
	name: string // Node name
	status: 'online' | 'offline' | 'maintenance' // Current status
	cpuUsage: number // CPU usage percentage (0-100)
	memoryUsage: number // Memory usage in GB
	timestamp: string // ISO timestamp of the last update
}
```

### Example Response

```json
[
	{
		"id": "node-01",
		"name": "Worker Node 01",
		"status": "online",
		"cpuUsage": 45,
		"memoryUsage": 12.5,
		"timestamp": "2024-01-01T12:00:00Z"
	},
	{
		"id": "node-02",
		"name": "Worker Node 02",
		"status": "offline",
		"cpuUsage": 0,
		"memoryUsage": 0,
		"timestamp": "2024-01-01T12:00:00Z"
	}
]
```

### Error Handling

If an unexpected error occurs, the API responds with:

- **500 Internal Server Error**
- JSON response:
   ```json
   { "message": "Internal server error" }
   ```
