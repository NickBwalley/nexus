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
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  company: z.string().trim().min(2).max(140),
  role: z.string().trim().min(2).max(120),
  teamSize: z.string().trim().min(1).max(60),
  provider: z.string().trim().min(1).max(120),
  challenge: z.string().trim().min(8).max(1000)
});
