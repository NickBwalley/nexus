# Agentible Nexus MVP

Agentible Nexus is an AI control plane for engineering teams. The MVP demonstrates an intelligent AI gateway, model routing, prompt caching, spend visibility, a demo playground, dashboard analytics, and waitlist collection.

## Stack

- Next.js 15, TypeScript, App Router
- Tailwind CSS with shadcn-style reusable components
- Next.js API routes
- OpenAI SDK
- Supabase for waitlist and request logs
- Upstash Redis for prompt caching
- Recharts and Lucide icons

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

The app runs in demo mode without credentials. Add environment variables to enable persistence, caching, and live OpenAI completions.

## Environment

Copy `.env.example` to `.env.local` and fill in:

```bash
OPENAI_API_KEY=
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Database

Run `supabase/schema.sql` in your Supabase SQL editor. It creates:

- `waitlist`
- `ai_requests`

The waitlist API upserts by email so duplicate submissions are handled gracefully.

## API

### `POST /api/gateway`

Input:

```json
{
  "prompt": "Design a cost-aware AI gateway",
  "taskType": "architecture",
  "userEmail": "demo@agentible.ai"
}
```

Routing:

- `planning`, `architecture`, `reasoning` route to `gpt-4o`
- `coding`, `debugging`, `refactoring`, `summary`, `documentation`, `extraction`, `classification` route to `gpt-4o-mini`

The route checks Upstash Redis first, calls OpenAI on a miss, stores the response for 24 hours, and logs metadata to Supabase.

### `POST /api/waitlist`

Accepts name, email, company, role, team size, current provider, and biggest AI cost challenge.

### `GET /api/dashboard`

Returns dashboard totals, chart data, and recent requests. It uses Supabase data when available and realistic demo data otherwise.

## Deploying to Vercel

1. Push the project to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables above.
4. Deploy.

No code changes are required for Vercel deployment.
