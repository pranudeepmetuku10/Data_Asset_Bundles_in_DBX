import { z } from "zod";

export const lifeAreas = [
  "love",
  "career",
  "money",
  "healing",
  "relationships",
  "future",
  "spiritualPath",
  "family",
  "creativity",
] as const;

export const intakeSchema = z.object({
  fullName: z.string().min(2).max(80),
  dateOfBirth: z.string().min(4).max(32),
  timeOfBirth: z.string().min(1).max(16),
  placeOfBirth: z.string().min(2).max(120),
  pronouns: z.string().max(32).optional().or(z.literal("")),
  mood: z.string().min(2).max(140),
  lifeArea: z.enum(lifeAreas),
  question: z.string().min(8).max(520),
});

export type IntakeInput = z.infer<typeof intakeSchema>;

