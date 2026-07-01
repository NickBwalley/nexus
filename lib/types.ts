export type TaskType =
  | "planning"
  | "architecture"
  | "reasoning"
  | "coding"
  | "debugging"
  | "refactoring"
  | "summary"
  | "documentation"
  | "extraction"
  | "classification";

export type GatewayResult = {
  response: string;
  model: string;
  cacheHit: boolean;
  estimatedCost: number;
  latencyMs: number;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
};

export type AiRequestLog = {
  id: string;
  user_email: string;
  task_type: TaskType;
  model: string;
  prompt: string;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  estimated_cost: number;
  cache_hit: boolean;
  latency_ms: number;
  created_at: string;
};
