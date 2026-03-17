import "server-only";

import { z } from "zod";
import type { AiReading } from "./types";

const readingSchema: z.ZodType<AiReading> = z.object({
  opening: z.string().min(1),
  cards: z
    .array(
      z.object({
        position: z.enum(["situation", "challenge", "guidance"]),
        name: z.string().min(1),
        orientation: z.enum(["upright", "reversed"]),
        meaning: z.string().min(1),
        intuitive: z.string().min(1),
      }),
    )
    .length(3) as unknown as z.ZodType<AiReading["cards"]>,
  synthesis: z.string().min(1),
  nextSteps: z.string().min(1),
  closing: z.string().min(1),
  disclaimer: z.string().min(1),
});

function requireEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

export async function generateTarotReading(params: {
  system: string;
  user: string;
}): Promise<{ model: string; reading: AiReading; raw: string }> {
  const apiKey = requireEnv("OPENAI_API_KEY");
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  const resp = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.9,
      messages: [
        { role: "system", content: params.system },
        { role: "user", content: params.user },
      ],
      response_format: { type: "json_object" },
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => "");
    throw new Error(txt || `OpenAI error (${resp.status})`);
  }

  const json = (await resp.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  const raw = json.choices?.[0]?.message?.content ?? "";
  const parsedJson = JSON.parse(raw);
  const reading = readingSchema.parse(parsedJson);

  return { model, reading, raw };
}

