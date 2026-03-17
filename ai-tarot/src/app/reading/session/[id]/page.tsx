"use client";

import { use, useEffect, useMemo, useState } from "react";

import { LoadingRitual } from "@/components/tarot/LoadingRitual";
import { TarotStage } from "@/components/tarot/TarotStage";
import type { TarotSpread } from "@/lib/tarot/types";
import type { AiReading } from "@/lib/ai/types";

type ReadingDoc = {
  readingId: string;
  intake: {
    fullName: string;
    mood: string;
    lifeArea: string;
    question: string;
  };
  spread: TarotSpread;
  ai: { sections?: AiReading } | null;
};

const ritual = [
  "Shuffling the deck…",
  "Drawing your cards…",
  "Reading your energy…",
  "Interpreting the message…",
] as const;

export default function SessionPage(props: { params: Promise<{ id: string }> }) {
  const { id: readingId } = use(props.params);
  const [reading, setReading] = useState<ReadingDoc | null>(null);
  const [step, setStep] = useState(0);
  const [ai, setAi] = useState<AiReading | null>(null);
  const [aiBusy, setAiBusy] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const label = useMemo(() => ritual[Math.min(step, ritual.length - 1)]!, [step]);

  useEffect(() => {
    let alive = true;
    setReading(null);
    setStep(0);
    setAi(null);
    setAiBusy(false);
    setAiError(null);

    const t1 = window.setTimeout(() => alive && setStep(1), 700);
    const t2 = window.setTimeout(() => alive && setStep(2), 1400);
    const t3 = window.setTimeout(() => alive && setStep(3), 2200);

    fetch(`/api/reading/${encodeURIComponent(readingId)}`)
      .then(async (r) => {
        if (!r.ok) throw new Error(await r.text());
        return (await r.json()) as ReadingDoc;
      })
      .then((doc) => {
        if (!alive) return;
        setReading(doc);
        setAi((doc.ai?.sections as AiReading | undefined) ?? null);
      })
      .catch(() => {
        if (!alive) return;
        setAiError("Couldn’t load this reading. Double-check the link and try again.");
        setReading(null);
      });

    return () => {
      alive = false;
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [readingId]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <header className="flex items-start justify-between gap-6">
          <div>
            <div className="text-sm tracking-wide text-[color:rgb(var(--fg1))]">
              AI Tarot
            </div>
            <div className="mt-1 text-xs text-[color:rgb(var(--muted))]">
              Situation · Challenge · Guidance
            </div>
          </div>
          <div className="text-right text-xs leading-5 text-[color:rgb(var(--muted))]">
            Readings are for reflection and entertainment/spiritual insight.
          </div>
        </header>

        {!reading ? (
          <div className="mt-16">
            {aiError ? (
              <div className="mx-auto max-w-xl rounded-[var(--radius-lg)] border border-[color:rgba(226,197,124,0.16)] bg-[color:rgba(10,11,18,0.45)] p-6 text-sm leading-6 text-[color:rgba(226,197,124,0.92)] shadow-[var(--shadow)]">
                {aiError}
              </div>
            ) : (
              <LoadingRitual label={label} />
            )}
          </div>
        ) : (
          <main className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <section className="lg:col-span-7">
              <div className="rounded-[var(--radius-lg)] border border-[color:rgb(var(--border))] bg-[color:rgba(14,14,24,0.55)] p-6 shadow-[var(--shadow)] sm:p-8">
                <div className="text-xs tracking-wide text-[color:rgb(var(--muted))]">
                  Your question
                </div>
                <div className="mt-2 text-pretty text-lg leading-8 text-[color:rgb(var(--fg0))]">
                  {reading.intake.question}
                </div>
                <div className="mt-4 text-sm text-[color:rgb(var(--fg1))]">
                  <span className="text-[color:rgb(var(--muted))]">Mood:</span>{" "}
                  {reading.intake.mood}
                </div>
              </div>

              <div className="mt-8">
                <TarotStage
                  spread={reading.spread}
                  onAllRevealed={async () => {
                    if (ai || aiBusy) return;
                    setAiError(null);
                    setAiBusy(true);
                    try {
                      const r = await fetch("/api/reading/generate", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify({ readingId: reading.readingId }),
                      });
                      if (!r.ok) throw new Error(await r.text());
                      const j = (await r.json()) as { ai: AiReading };
                      setAi(j.ai);
                    } catch (e) {
                      setAiError(
                        e instanceof Error
                          ? e.message
                          : "Couldn’t generate the reading. Please try again.",
                      );
                    } finally {
                      setAiBusy(false);
                    }
                  }}
                />
              </div>

              <div className="mt-8 rounded-[var(--radius-lg)] border border-[color:rgb(var(--border))] bg-[color:rgba(14,14,24,0.55)] p-6 shadow-[var(--shadow)] sm:p-8">
                <div className="text-xs tracking-wide text-[color:rgb(var(--muted))]">
                  Your reading
                </div>

                {aiBusy ? (
                  <div className="mt-6">
                    <LoadingRitual label="Interpreting the message…" />
                  </div>
                ) : ai ? (
                  <div className="mt-5 space-y-6">
                    <p className="text-pretty text-base leading-7 text-[color:rgb(var(--fg0))]">
                      {ai.opening}
                    </p>
                    <div className="space-y-5">
                      {ai.cards.map((c, idx) => (
                        <div
                          key={`${c.position}-${idx}`}
                          className="rounded-xl border border-[color:rgba(226,197,124,0.10)] bg-[color:rgba(10,11,18,0.45)] px-4 py-4"
                        >
                          <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <div className="text-sm font-medium text-[color:rgb(var(--fg0))]">
                              {c.name}
                            </div>
                            <div className="text-[10px] uppercase tracking-[0.14em] text-[color:rgba(198,192,228,0.70)]">
                              {c.position} · {c.orientation}
                            </div>
                          </div>
                          <p className="mt-2 text-sm leading-6 text-[color:rgb(var(--fg1))]">
                            {c.meaning}
                          </p>
                          <p className="mt-2 text-sm leading-6 text-[color:rgba(242,240,255,0.88)]">
                            {c.intuitive}
                          </p>
                        </div>
                      ))}
                    </div>
                    <p className="text-pretty text-base leading-7 text-[color:rgb(var(--fg0))]">
                      {ai.synthesis}
                    </p>
                    <p className="text-pretty text-base leading-7 text-[color:rgba(242,240,255,0.92)]">
                      {ai.nextSteps}
                    </p>
                    <p className="text-pretty text-base leading-7 text-[color:rgb(var(--fg0))]">
                      {ai.closing}
                    </p>
                    <div className="text-xs leading-5 text-[color:rgb(var(--muted))]">
                      {ai.disclaimer}
                    </div>
                  </div>
                ) : aiError ? (
                  <div className="mt-4 text-sm leading-6 text-[color:rgba(226,197,124,0.92)]">
                    {aiError}
                  </div>
                ) : (
                  <div className="mt-3 text-sm leading-6 text-[color:rgb(var(--fg1))]">
                    Reveal all three cards to generate your personalized reading.
                  </div>
                )}
              </div>
            </section>

            <section className="lg:col-span-5">
              <div className="rounded-[var(--radius-lg)] border border-[color:rgb(var(--border))] bg-[color:rgba(14,14,24,0.55)] p-6 shadow-[var(--shadow)] sm:p-8">
                <div className="text-xs tracking-wide text-[color:rgb(var(--muted))]">
                  Your cards (preview)
                </div>
                <div className="mt-4 space-y-4">
                  {reading.spread.cards.map((c, idx) => (
                    <div
                      key={`${c.id}-detail-${idx}`}
                      className="rounded-xl border border-[color:rgba(226,197,124,0.10)] bg-[color:rgba(10,11,18,0.45)] px-4 py-3"
                    >
                      <div className="flex items-baseline justify-between gap-3">
                        <div className="text-sm font-medium text-[color:rgb(var(--fg0))]">
                          {c.name}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.14em] text-[color:rgba(198,192,228,0.70)]">
                          {c.position}
                        </div>
                      </div>
                      <div className="mt-1 text-xs text-[color:rgba(198,192,228,0.70)]">
                        {c.orientation}
                      </div>
                      <div className="mt-2 text-sm leading-6 text-[color:rgb(var(--fg1))]">
                        {c.meaningShort}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-xs leading-5 text-[color:rgb(var(--muted))]">
                  Next we’ll reveal each card one by one with a flip + glow, then
                  generate the final reading.
                </div>
              </div>
            </section>
          </main>
        )}
      </div>
    </div>
  );
}

