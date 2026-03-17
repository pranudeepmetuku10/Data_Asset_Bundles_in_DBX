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
  const apiKey = requireEnv("GEMINI_API_KEY");
  const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const resp = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: params.system }] },
      contents: [{ role: "user", parts: [{ text: params.user }] }],
      generationConfig: {
        temperature: 0.9,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!resp.ok) {
    const txt = await resp.text().catch(() => "");
    throw new Error(txt || `Gemini error (${resp.status})`);
  }

  const json = (await resp.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const raw = json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  const parsedJson = JSON.parse(raw);
  const reading = readingSchema.parse(parsedJson);

  return { model, reading, raw };
}

