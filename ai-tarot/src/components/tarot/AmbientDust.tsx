import { motion, useReducedMotion } from "framer-motion";

export function AmbientDust() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const specs = [
    { left: "8%", top: "18%", d: 10, s: 0.6, o: 0.32 },
    { left: "22%", top: "62%", d: 13, s: 0.45, o: 0.22 },
    { left: "48%", top: "26%", d: 12, s: 0.7, o: 0.26 },
    { left: "70%", top: "54%", d: 15, s: 0.55, o: 0.20 },
    { left: "84%", top: "22%", d: 11, s: 0.5, o: 0.24 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {specs.map((p, i) => (
        <motion.div
          key={i}
          className="absolute h-1.5 w-1.5 rounded-full"
          style={{
            left: p.left,
            top: p.top,
            background:
              "radial-gradient(circle, rgba(226,197,124,0.55), rgba(226,197,124,0.00) 70%)",
            opacity: p.o,
            filter: "blur(0.2px)",
          }}
          animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
          transition={{
            duration: p.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
    </div>
  );
}

