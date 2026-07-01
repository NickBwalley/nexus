import type { TaskType } from "@/lib/types";

const highReasoningTasks: TaskType[] = ["planning", "architecture", "reasoning"];

export function selectModel(taskType: TaskType) {
  return highReasoningTasks.includes(taskType) ? "gpt-4o" : "gpt-4o-mini";
}

export function estimateTokens(text: string) {
  return Math.max(1, Math.ceil(text.trim().length / 4));
}

export function estimateCost(model: string, promptTokens: number, completionTokens: number) {
  const prices =
    model === "gpt-4o"
      ? { input: 0.000005, output: 0.000015 }
      : { input: 0.00000015, output: 0.0000006 };

  return promptTokens * prices.input + completionTokens * prices.output;
}

export function buildSystemPrompt(taskType: TaskType) {
  return [
    "You are Nexus, an AI spend visibility product demonstration.",
    "Return a concise, practical answer for an engineering team.",
    `Task type: ${taskType}.`
  ].join(" ");
}
