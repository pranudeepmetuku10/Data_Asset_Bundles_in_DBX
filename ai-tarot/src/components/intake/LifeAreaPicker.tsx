import { lifeAreas } from "@/lib/validation/intake";

const LABELS: Record<(typeof lifeAreas)[number], string> = {
  love: "Love",
  career: "Career",
  money: "Money",
  healing: "Healing",
  relationships: "Relationships",
  future: "Future",
  spiritualPath: "Spiritual path",
  family: "Family",
  creativity: "Creativity",
};

export function LifeAreaPicker(props: {
  value: (typeof lifeAreas)[number];
  onChange: (v: (typeof lifeAreas)[number]) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {lifeAreas.map((area) => {
        const active = props.value === area;
        return (
          <button
            key={area}
            type="button"
            onClick={() => props.onChange(area)}
            className={[
              "h-11 rounded-xl border px-3 text-left text-sm transition",
              active
                ? "border-[color:rgba(226,197,124,0.35)] bg-[color:rgba(226,197,124,0.14)] text-[color:rgb(var(--fg0))] shadow-[0_0_30px_rgba(226,197,124,0.10)]"
                : "border-[color:rgba(226,197,124,0.10)] bg-[color:rgba(10,11,18,0.40)] text-[color:rgb(var(--fg1))] hover:border-[color:rgba(226,197,124,0.22)] hover:bg-[color:rgba(10,11,18,0.52)]",
            ].join(" ")}
          >
            {LABELS[area]}
          </button>
        );
      })}
    </div>
  );
}

