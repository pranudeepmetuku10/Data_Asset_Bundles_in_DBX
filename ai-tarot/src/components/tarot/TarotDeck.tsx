import { motion, useReducedMotion } from "framer-motion";

import { TarotCard } from "./TarotCard";
import { AmbientDust } from "./AmbientDust";

export function TarotDeck(props: {
  onDraw: () => void;
  disabled?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="relative">
      <div className="absolute inset-0 -z-10 rounded-[32px] bg-[radial-gradient(circle_at_50%_40%,rgba(226,197,124,0.16),transparent_62%)] blur-2xl" />
      <div className="relative overflow-hidden rounded-[32px] border border-[color:rgba(226,197,124,0.14)] bg-[color:rgba(10,11,18,0.38)] p-6 shadow-[0_20px_90px_rgba(0,0,0,0.55)]">
        <AmbientDust />
        <div className="flex items-center justify-between gap-6">
          <div>
            <div className="text-xs tracking-wide text-[color:rgb(var(--muted))]">
              The deck
            </div>
            <div className="mt-1 text-sm text-[color:rgb(var(--fg1))]">
              When you’re ready, draw three cards.
            </div>
          </div>
          <button
            type="button"
            disabled={props.disabled}
            onClick={props.onDraw}
            className={[
              "inline-flex h-10 items-center justify-center rounded-full border px-5 text-xs font-medium tracking-wide transition focus:outline-none focus:ring-2",
              props.disabled
                ? "cursor-not-allowed border-[color:rgba(226,197,124,0.10)] bg-[color:rgba(10,11,18,0.35)] text-[color:rgba(198,192,228,0.55)]"
                : "border-[color:rgba(226,197,124,0.35)] bg-[color:rgba(226,197,124,0.14)] text-[color:rgb(var(--fg0))] hover:bg-[color:rgba(226,197,124,0.20)] focus:ring-[color:rgba(226,197,124,0.22)]",
            ].join(" ")}
          >
            Draw
          </button>
        </div>

        <div className="mt-7 flex items-center justify-center">
          <motion.div
            animate={
              reduce
                ? undefined
                : { y: [0, -8, 0], rotate: [-0.6, 0.6, -0.6] }
            }
            transition={
              reduce
                ? undefined
                : { duration: 7.5, repeat: Infinity, ease: "easeInOut" }
            }
            className="relative w-[min(240px,70vw)]"
          >
            <div className="absolute -inset-8 rounded-[36px] bg-[radial-gradient(circle_at_50%_50%,rgba(154,114,255,0.10),transparent_62%)] blur-2xl" />
            <div className="relative grid place-items-center">
              {/* faux stack */}
              <div className="absolute left-2 top-2 w-full opacity-60">
                <TarotCard revealed={false} className="rotate-[-1.2deg]" />
              </div>
              <div className="absolute left-1 top-1 w-full opacity-75">
                <TarotCard revealed={false} className="rotate-[0.8deg]" />
              </div>
              <TarotCard revealed={false} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

