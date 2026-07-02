create extension if not exists "pgcrypto";

create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  company text not null,
  role text,
  suggestions text,
  created_at timestamptz not null default now()
);

create table if not exists public.ai_requests (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  task_type text not null,
  model text not null,
  prompt text not null,
  prompt_tokens integer not null,
  completion_tokens integer not null,
  total_tokens integer not null,
  estimated_cost numeric(12, 6) not null,
  cache_hit boolean not null default false,
  latency_ms integer not null,
  created_at timestamptz not null default now()
);

create index if not exists ai_requests_created_at_idx on public.ai_requests (created_at desc);
create index if not exists ai_requests_model_idx on public.ai_requests (model);
create index if not exists ai_requests_task_type_idx on public.ai_requests (task_type);
