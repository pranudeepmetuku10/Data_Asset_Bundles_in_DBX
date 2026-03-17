"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import type { TarotSpread } from "@/lib/tarot/types";
import { TarotDeck } from "./TarotDeck";
import { TarotCard } from "./TarotCard";

type StagePhase =
  | "idle"
  | "drawing"
  | "drawn"
  | "reveal1"
  | "reveal2"
  | "reveal3"
  | "done";

const POS_LABEL: Record<
  TarotSpread["cards"][number]["position"],
  string
> = {
  situation: "Situation",
  challenge: "Challenge",
  guidance: "Guidance",
};

export function TarotStage(props: {
  spread: TarotSpread;
  onAllRevealed?: () => void;
}) {
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<StagePhase>("idle");

  const revealIndex = useMemo(() => {
    if (phase === "reveal1") return 0;
    if (phase === "reveal2") return 1;
    if (phase === "reveal3") return 2;
    if (phase === "done") return 2;
    return -1;
  }, [phase]);

  useEffect(() => {
    if (phase !== "drawing") return;
    const t = window.setTimeout(() => setPhase("drawn"), reduce ? 300 : 900);
    return () => window.clearTimeout(t);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase !== "drawn") return;
    const t = window.setTimeout(() => setPhase("reveal1"), reduce ? 200 : 700);
    return () => window.clearTimeout(t);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase !== "reveal1") return;
    const t = window.setTimeout(() => setPhase("reveal2"), reduce ? 250 : 1300);
    return () => window.clearTimeout(t);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase !== "reveal2") return;
    const t = window.setTimeout(() => setPhase("reveal3"), reduce ? 250 : 1400);
    return () => window.clearTimeout(t);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase !== "reveal3") return;
    const t = window.setTimeout(() => setPhase("done"), reduce ? 200 : 1300);
    return () => window.clearTimeout(t);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase !== "done") return;
    props.onAllRevealed?.();
  }, [phase, props]);

  return (
    <div className="relative rounded-[var(--radius-lg)] border border-[color:rgba(226,197,124,0.12)] bg-[color:rgba(10,11,18,0.45)] p-6 shadow-[var(--shadow)] sm:p-8">
      <div className="flex items-start justify-between gap-6">
        <div>
          <div className="text-xs tracking-wide text-[color:rgb(var(--muted))]">
            Tarot stage
          </div>
          <div className="mt-2 text-sm leading-6 text-[color:rgb(var(--fg1))]">
            {phase === "idle"
              ? "Settle in. When you’re ready, draw."
              : phase === "drawing"
                ? "Drawing your cards…"
                : phase === "done"
                  ? "All three cards are revealed."
                  : "Revealing the message…"}
          </div>
        </div>
        <div className="text-right text-xs leading-5 text-[color:rgb(var(--muted))]">
          Slow reveals. A little suspense.\n
        </div>
      </div>

      <div className="mt-6">
        <AnimatePresence initial={false} mode="wait">
          {phase === "idle" ? (
            <motion.div
              key="deck"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
            >
              <TarotDeck onDraw={() => setPhase("drawing")} />
            </motion.div>
          ) : (
            <motion.div
              key="spread"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className="mt-2 grid grid-cols-3 gap-3 sm:gap-5">
                {props.spread.cards.map((c, idx) => {
                  const shouldReveal =
                    revealIndex >= 0 ? idx <= revealIndex : false;

                  const drawOffset =
                    phase === "drawing" || phase === "drawn"
                      ? { y: -18, opacity: 0.9 }
                      : undefined;

                  return (
                    <motion.div
                      key={`${c.id}-${idx}`}
                      initial={{ opacity: 0, y: 18, rotate: -2 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        rotate: 0,
                        ...(drawOffset ?? {}),
                      }}
                      transition={{
                        duration: 0.7,
                        delay:
                          phase === "drawing" || phase === "drawn"
                            ? idx * 0.12
                            : 0,
                        ease: "easeOut",
                      }}
                      className="relative"
                    >
                      <TarotCard
                        revealed={shouldReveal || phase === "done"}
                        glow={idx === revealIndex}
                        title={c.name}
                        subtitle={`${POS_LABEL[c.position]} · ${c.orientation}`}
                      />

                      <motion.div
                        className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-[color:rgba(198,192,228,0.70)]"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity:
                            idx === revealIndex || phase === "done"
                              ? 1
                              : 0.35,
                        }}
                        transition={{ duration: 0.35 }}
                      >
                        {POS_LABEL[c.position]}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-6 text-xs leading-5 text-[color:rgb(var(--muted))]">
                {phase === "reveal1"
                  ? "First, we meet the truth of the situation."
                  : phase === "reveal2"
                    ? "Now, what complicates it—without blaming you."
                    : phase === "reveal3"
                      ? "Finally, the guidance: the gentlest next step."
                      : phase === "done"
                        ? "Let that settle. Then we’ll weave the full reading."
                        : "Hold on…"}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

