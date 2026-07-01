import type { AiRequestLog } from "@/lib/types";

export const requestSeries = [
  { day: "Mon", requests: 1840, spend: 42 },
  { day: "Tue", requests: 2310, spend: 57 },
  { day: "Wed", requests: 2980, spend: 66 },
  { day: "Thu", requests: 3640, spend: 74 },
  { day: "Fri", requests: 4320, spend: 91 },
  { day: "Sat", requests: 2160, spend: 35 },
  { day: "Sun", requests: 2480, spend: 39 }
];

export const spendByModel = [
  { model: "gpt-4o", spend: 236 },
  { model: "gpt-4o-mini", spend: 61 },
  { model: "cached", spend: 8 }
];

export const usageByModel = [
  { model: "gpt-4o-mini", requests: 13920 },
  { model: "gpt-4o", requests: 4480 },
  { model: "cache", requests: 3890 }
];

export const demoRequests: AiRequestLog[] = [
  {
    id: "req_01",
    user_email: "platform@northstar.dev",
    task_type: "architecture",
    model: "gpt-4o",
    prompt: "Design an event-driven ingestion pipeline",
    prompt_tokens: 1120,
    completion_tokens: 820,
    total_tokens: 1940,
    estimated_cost: 0.0179,
    cache_hit: false,
    latency_ms: 1240,
    created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString()
  },
  {
    id: "req_02",
    user_email: "ai-apps@atlas.co",
    task_type: "summary",
    model: "gpt-4o-mini",
    prompt: "Summarize a support conversation",
    prompt_tokens: 640,
    completion_tokens: 220,
    total_tokens: 860,
    estimated_cost: 0.00023,
    cache_hit: true,
    latency_ms: 82,
    created_at: new Date(Date.now() - 1000 * 60 * 33).toISOString()
  },
  {
    id: "req_03",
    user_email: "eng@forgeops.io",
    task_type: "debugging",
    model: "gpt-4o-mini",
    prompt: "Diagnose a failing webhook retry job",
    prompt_tokens: 880,
    completion_tokens: 510,
    total_tokens: 1390,
    estimated_cost: 0.00044,
    cache_hit: false,
    latency_ms: 640,
    created_at: new Date(Date.now() - 1000 * 60 * 51).toISOString()
  }
];
