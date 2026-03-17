import { motion } from "framer-motion";

export function LoadingRitual(props: { label: string }) {
  return (
    <div className="flex items-center justify-center">
      <div className="rounded-full border border-[color:rgba(226,197,124,0.16)] bg-[color:rgba(10,11,18,0.40)] px-5 py-3 shadow-[0_0_60px_rgba(226,197,124,0.06)]">
        <div className="flex items-center gap-3">
          <motion.div
            className="h-2.5 w-2.5 rounded-full bg-[color:rgba(226,197,124,0.85)]"
            animate={{ opacity: [0.35, 1, 0.35], scale: [0.92, 1.06, 0.92] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="text-sm text-[color:rgb(var(--fg1))]">
            {props.label}
          </div>
          <motion.div
            className="flex gap-1"
            aria-hidden="true"
            initial="idle"
            animate="pulse"
            variants={{
              pulse: { transition: { staggerChildren: 0.18, repeat: Infinity } },
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="inline-block h-1.5 w-1.5 rounded-full bg-[color:rgba(198,192,228,0.7)]"
                variants={{
                  pulse: { opacity: [0.2, 0.85, 0.2], y: [0, -2, 0] },
                }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

