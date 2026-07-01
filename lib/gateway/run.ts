import OpenAI from "openai";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import type { GatewayResult } from "@/lib/types";
import { createCacheKey, getCachedGatewayResult, setCachedGatewayResult } from "./cache";
import { buildSystemPrompt, estimateCost, estimateTokens, selectModel } from "./routing";
import type { z } from "zod";
import type { gatewaySchema } from "@/lib/validations";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

export async function runGateway(input: z.infer<typeof gatewaySchema>): Promise<GatewayResult> {
  const started = performance.now();
  const model = selectModel(input.taskType);
  const cacheKey = createCacheKey(model, input.taskType, input.prompt);
  const cached = await getCachedGatewayResult(cacheKey);

  if (cached) {
    const result = {
      ...cached,
      cacheHit: true,
      latencyMs: Math.round(performance.now() - started)
    };
    await logRequest(input, result);
    return result;
  }

  let response = "";
  let promptTokens = estimateTokens(input.prompt);
  let completionTokens = 0;

  if (openai) {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: buildSystemPrompt(input.taskType) },
        { role: "user", content: input.prompt }
      ],
      temperature: 0.3
    });

    response = completion.choices[0]?.message.content ?? "No response returned.";
    promptTokens = completion.usage?.prompt_tokens ?? promptTokens;
    completionTokens = completion.usage?.completion_tokens ?? estimateTokens(response);
  } else {
    response = createDemoResponse(input.prompt, input.taskType, model);
    completionTokens = estimateTokens(response);
  }

  const result: GatewayResult = {
    response,
    model,
    cacheHit: false,
    estimatedCost: estimateCost(model, promptTokens, completionTokens),
    latencyMs: Math.round(performance.now() - started),
    promptTokens,
    completionTokens,
    totalTokens: promptTokens + completionTokens
  };

  await setCachedGatewayResult(cacheKey, result);
  await logRequest(input, result);
  return result;
}

async function logRequest(input: z.infer<typeof gatewaySchema>, result: GatewayResult) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return;

  await supabase.from("ai_requests").insert({
    user_email: input.userEmail,
    task_type: input.taskType,
    model: result.model,
    prompt: input.prompt,
    prompt_tokens: result.promptTokens,
    completion_tokens: result.completionTokens,
    total_tokens: result.totalTokens,
    estimated_cost: result.estimatedCost,
    cache_hit: result.cacheHit,
    latency_ms: result.latencyMs
  });
}

function createDemoResponse(prompt: string, taskType: string, model: string) {
  return [
    `Nexus routed this ${taskType} request to ${model}.`,
    "Recommended execution plan:",
    "1. Normalize the incoming request and attach team-level metadata.",
    "2. Check policy, cache eligibility, and historical model performance.",
    "3. Route high-complexity work to premium reasoning capacity and routine work to a lower-cost model.",
    "4. Log tokens, latency, cache status, and estimated cost for dashboard visibility.",
    "",
    `Prompt received: "${prompt.slice(0, 180)}${prompt.length > 180 ? "..." : ""}"`
  ].join("\n");
}
