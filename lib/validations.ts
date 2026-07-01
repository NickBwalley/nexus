import { z } from "zod";

export const gatewaySchema = z.object({
  prompt: z.string().trim().min(6).max(8000),
  taskType: z.enum([
    "planning",
    "architecture",
    "reasoning",
    "coding",
    "debugging",
    "refactoring",
    "summary",
    "documentation",
    "extraction",
    "classification"
  ]),
  userEmail: z.string().email().default("demo@agentible.ai")
});

export const waitlistSchema = z.object({
  email: z.string().trim().email().max(160),
  company: z.string().trim().min(2).max(140),
  role: z.string().trim().max(120).optional().or(z.literal(""))
});
