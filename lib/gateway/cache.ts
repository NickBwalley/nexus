import crypto from "node:crypto";
import { Redis } from "@upstash/redis";
import type { GatewayResult, TaskType } from "@/lib/types";

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN
      })
    : null;

export function createCacheKey(model: string, taskType: TaskType, prompt: string) {
  const digest = crypto
    .createHash("sha256")
    .update(`${model}:${taskType}:${prompt.trim().toLowerCase()}`)
    .digest("hex");

  return `nexus:v1:${digest}`;
}

export async function getCachedGatewayResult(key: string) {
  if (!redis) return null;
  return redis.get<GatewayResult>(key);
}

export async function setCachedGatewayResult(key: string, value: GatewayResult) {
  if (!redis) return;
  await redis.set(key, value, { ex: 60 * 60 * 24 });
}
