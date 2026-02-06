# Frontend (React + Vite)

Single Page Application that displays monitored nodes in a responsive table.

The UI polls the backend REST API to reflect simulated real-time changes.

## Tech

- React + Vite
- TypeScript
- TailwindCSS
- shadcn/ui components
- lucide-react icons

## Folder Structure

```
frontend/
├── src/
│   ├── components/ - Reusable UI components
│   │   ├── nodes/ - NodesTable and related components
│   │   │
│   │   └── ui/ - shadcn/ui components
│   │
│   ├── hooks/ - Custom React hooks
│   │   └── useNodes.ts
│   │
│   ├── lib/ - Utility functions (e.g. cn for classnames)
│   │
│   ├── App.tsx - Main app component
│   ├── index.css - Global styles (Tailwind imports)
│   └── main.tsx - React entry point
│
├── .gitignore
├── components.json
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md

```

## Running (Local)

From repository root:

```bash
npm run dev:frontend
```

#### Frontend starts at:

http://localhost:5173

### API Proxy

During local development Vite proxies API requests:

GET http://localhost:5173/api/nodes → http://localhost:3000/api/nodes

This is configured in `vite.config.ts`.

### Behavior:

- Fetches node list from backend
- Polls the API on an interval to update the UI automatically

- Visual indicators:
   - offline rows highlighted
   - CPU usage >= 80% shows a warning icon

- Filter:
   - "Show online nodes only"
