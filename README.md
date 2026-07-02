# Nexus MVP

Nexus helps companies understand and control AI spending. It gives engineering and IT teams a single place to track AI usage, monitor costs, and gain visibility across providers such as OpenAI, Anthropic, Gemini, Cursor, GitHub Copilot, and more.

Nexus is powered by [Agentible](https://agentible.dev).

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
RESEND_API_KEY=
RESEND_FROM_EMAIL="Agentible Nexus <onboarding@resend.dev>"
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

## Database

Run `supabase/schema.sql` in your Supabase SQL editor. It creates:

- `waitlist`
- `ai_requests`

The waitlist API upserts by email so duplicate submissions are handled gracefully.

For an existing database, run `supabase/waitlist-profile-fields-migration.sql` to add the new waitlist fields.

## API

### `POST /api/waitlist`

Accepts:

```json
{
  "name": "Founder Name",
  "email": "founder@company.com",
  "company": "Company",
  "role": "CTO",
  "suggestions": "I would like spend alerts by team."
}
```

`role` and `suggestions` are optional. Set `RESEND_API_KEY` to send confirmation emails to new signups and owner notifications to `nickbiiybwalley@gmail.com`.

### `POST /api/gateway`

The gateway API remains available for product experiments and future demo work.

Input:

```json
{
  "prompt": "Design a cost-aware AI gateway",
  "taskType": "architecture",
  "userEmail": "demo@agentible.ai"
}
```

### `GET /api/dashboard`

Returns dashboard totals, chart data, and recent requests. It uses Supabase data when available and realistic demo data otherwise.

## Deploying to Vercel

1. Push the project to GitHub.
2. Import the repo in Vercel.
3. Add the environment variables above.
4. Deploy.

No code changes are required for Vercel deployment.
