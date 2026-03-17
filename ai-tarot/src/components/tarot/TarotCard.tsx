import { motion } from "framer-motion";

export function TarotCard(props: {
  title?: string;
  subtitle?: string;
  revealed: boolean;
  glow?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={[
        "relative aspect-[3/5] w-full rounded-2xl",
        "border border-[color:rgba(226,197,124,0.14)]",
        "shadow-[0_30px_90px_rgba(0,0,0,0.55)]",
        props.className ?? "",
      ].join(" ")}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      animate={{ rotateY: props.revealed ? 180 : 0 }}
      transition={{ type: "spring", stiffness: 130, damping: 18, mass: 0.8 }}
    >
      {/* Back */}
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl"
        style={{ backfaceVisibility: "hidden" }}
      >
        <div className="absolute inset-0 [background:radial-gradient(circle_at_30%_25%,rgba(226,197,124,0.16),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(154,114,255,0.16),transparent_55%),linear-gradient(180deg,rgba(10,11,18,0.65),rgba(24,20,40,0.70))]" />
        <div className="absolute inset-0 opacity-80 [background:linear-gradient(135deg,transparent,rgba(226,197,124,0.10),transparent)] animate-[shimmer_4.2s_ease-in-out_infinite]" />
        <div className="absolute inset-0 opacity-70 [mask-image:radial-gradient(circle_at_50%_40%,black,transparent_68%)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(226,197,124,0.25),transparent_60%)]" />
        </div>
        <div className="absolute inset-x-4 bottom-4 rounded-xl border border-[color:rgba(226,197,124,0.16)] bg-[color:rgba(10,11,18,0.40)] px-3 py-2">
          <div className="text-[10px] uppercase tracking-[0.22em] text-[color:rgba(198,192,228,0.70)]">
            AI Tarot
          </div>
          <div className="mt-0.5 text-xs text-[color:rgba(242,240,255,0.92)]">
            Drawn for you
          </div>
        </div>
      </div>

      {/* Face */}
      <div
        className="absolute inset-0 overflow-hidden rounded-2xl"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <div className="absolute inset-0 [background:radial-gradient(circle_at_35%_25%,rgba(226,197,124,0.18),transparent_55%),radial-gradient(circle_at_85%_75%,rgba(66,103,255,0.14),transparent_58%),linear-gradient(180deg,rgba(14,14,24,0.70),rgba(10,11,18,0.75))]" />
        {props.glow ? (
          <div className="absolute -inset-8 bg-[radial-gradient(circle_at_50%_40%,rgba(226,197,124,0.22),transparent_65%)] blur-2xl" />
        ) : null}
        <div className="relative flex h-full flex-col justify-between p-4">
          <div className="rounded-xl border border-[color:rgba(226,197,124,0.14)] bg-[color:rgba(10,11,18,0.40)] px-3 py-2">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[color:rgba(198,192,228,0.72)]">
              {props.subtitle ?? "Card"}
            </div>
            <div className="mt-1 text-sm font-medium text-[color:rgba(242,240,255,0.94)]">
              {props.title ?? "—"}
            </div>
          </div>
          <div className="text-[10px] uppercase tracking-[0.24em] text-[color:rgba(198,192,228,0.68)]">
            Situation · Challenge · Guidance
          </div>
        </div>
      </div>
    </motion.div>
  );
}

