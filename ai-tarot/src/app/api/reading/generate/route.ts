import { NextResponse } from "next/server";

import { getAdminDb } from "@/lib/firebase/admin";
import { generateTarotReading } from "@/lib/ai/client";
import { PROMPT_VERSION, systemPromptTarot, userPromptTarot } from "@/lib/ai/prompts";
import type { TarotSpread } from "@/lib/tarot/types";
import { isSensitiveQuestion, safeSensitiveReading } from "@/lib/ai/safety";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as null | { readingId?: string };
  const readingId = body?.readingId;
  if (!readingId) {
    return NextResponse.json({ error: "Missing readingId." }, { status: 400 });
  }

  const ref = getAdminDb().collection("readings").doc(readingId);
  const snap = await ref.get();
  if (!snap.exists) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const data = snap.data() as any;
  const intake = data.intake as {
    fullName: string;
    dateOfBirth: string;
    timeOfBirth: string;
    placeOfBirth: string;
    pronouns?: string;
    mood: string;
    lifeArea: string;
    question: string;
  };
  const spread = data.spread as TarotSpread;

  const existing = data.ai?.sections;
  if (existing) {
    return NextResponse.json({ readingId, ai: existing });
  }

  if (isSensitiveQuestion(intake.question)) {
    const safe = safeSensitiveReading();
    const fallback = {
      opening: safe.opening,
      cards: spread.cards.map((c) => ({
        position: c.position,
        name: c.name,
        orientation: c.orientation,
        meaning: c.meaningShort,
        intuitive:
          "For now, let this be a soft mirror—no pressure to interpret, only to breathe and seek support.",
      })) as any,
      synthesis: safe.synthesis,
      nextSteps: safe.nextSteps,
      closing: safe.closing,
      disclaimer: safe.disclaimer,
    };

    const now = new Date();
    await ref.set(
      {
        updatedAt: now,
        ai: {
          model: "safety-fallback",
          promptVersion: PROMPT_VERSION,
          sections: fallback,
        },
      },
      { merge: true },
    );
    return NextResponse.json({ readingId, ai: fallback });
  }

  const system = systemPromptTarot();
  const user = userPromptTarot({ ...intake, spread });

  const { model, reading } = await generateTarotReading({ system, user });

  const now = new Date();
  await ref.set(
    {
      updatedAt: now,
      ai: {
        model,
        promptVersion: PROMPT_VERSION,
        sections: reading,
      },
    },
    { merge: true },
  );

  return NextResponse.json({ readingId, ai: reading });
}

