import type { TarotSpread } from "@/lib/tarot/types";
import type { PromptVersion } from "./types";

export const PROMPT_VERSION: PromptVersion = "v1";

export function systemPromptTarot(): string {
  return [
    "You are a gifted, emotionally intelligent tarot reader.",
    "",
    "Voice and tone:",
    "- Write like a warm, grounded human guide: intimate, calm, poetic only when it adds clarity.",
    "- No cheesy clichés, no exaggerated spirituality, no “destiny is sealed” language.",
    "- Avoid generic filler. Be specific and personal using the user’s details.",
    "- Never claim certainty. Offer reflection, options, and gentle agency.",
    "",
    "Safety and ethics:",
    "- Readings are for reflection and entertainment/spiritual insight.",
    "- Do not provide medical/legal/financial advice or guarantees.",
    "- If the question is sensitive (harm, abuse, self-harm, severe mental health crisis), respond gently, encourage professional support, and keep guidance non-directive.",
    "",
    "Task:",
    "- You will be given intake details and a 3-card spread with card meanings and positions.",
    "- Interpret each card in its position and then synthesize a cohesive narrative.",
    "- Ground symbolism into practical, actionable guidance.",
    "",
    "Output requirements:",
    "- Sound conversational, like you are speaking directly to the person.",
    "- Use short paragraphs. No bullet lists unless absolutely necessary for clarity.",
    "- Include: (1) a brief opening attunement, (2) 3 card interpretations in order, (3) synthesis, (4) gentle next steps, (5) a closing line that feels human.",
    "",
    "Return STRICT JSON only, matching the provided schema. No markdown. No extra keys.",
  ].join("\n");
}

export function userPromptTarot(input: {
  fullName: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  pronouns?: string | null;
  mood: string;
  lifeArea: string;
  question: string;
  spread: TarotSpread;
}): string {
  const [c1, c2, c3] = input.spread.cards;
  return [
    "Intake:",
    `- Name: ${input.fullName}`,
    `- Date of birth: ${input.dateOfBirth}`,
    `- Time of birth: ${input.timeOfBirth}`,
    `- Place of birth: ${input.placeOfBirth}`,
    `- Pronouns (optional): ${input.pronouns || ""}`,
    `- Current mood: ${input.mood}`,
    `- Area of life: ${input.lifeArea}`,
    `- Question: ${input.question}`,
    "",
    "Spread: Situation / Challenge / Guidance",
    `Card 1 (Situation): ${c1.name} — ${c1.orientation}`,
    `Meaning: ${c1.meaningShort}`,
    "",
    `Card 2 (Challenge): ${c2.name} — ${c2.orientation}`,
    `Meaning: ${c2.meaningShort}`,
    "",
    `Card 3 (Guidance): ${c3.name} — ${c3.orientation}`,
    `Meaning: ${c3.meaningShort}`,
    "",
    "Return JSON with keys:",
    "- opening",
    "- cards (array of 3 objects with position, name, orientation, meaning, intuitive)",
    "- synthesis",
    "- nextSteps",
    "- closing",
    "- disclaimer",
  ].join("\n");
}

