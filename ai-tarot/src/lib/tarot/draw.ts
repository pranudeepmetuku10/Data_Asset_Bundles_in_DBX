import type { TarotOrientation, TarotPosition, TarotSpread } from "./types";
import { MAJOR_ARCANA } from "./deck";

function randomInt(maxExclusive: number): number {
  return Math.floor(Math.random() * maxExclusive);
}

function sampleUniqueIndices(count: number, maxExclusive: number): number[] {
  const set = new Set<number>();
  while (set.size < count) set.add(randomInt(maxExclusive));
  return [...set];
}

export function pickOrientation(reversedProbability = 0.3): TarotOrientation {
  return Math.random() < reversedProbability ? "reversed" : "upright";
}

export function drawSpreadSCG(params?: {
  reversedProbability?: number;
}): TarotSpread {
  const positions: TarotPosition[] = ["situation", "challenge", "guidance"];
  const indices = sampleUniqueIndices(3, MAJOR_ARCANA.length);

  const cards = positions.map((position, i) => {
    const base = MAJOR_ARCANA[indices[i]]!;
    const orientation = pickOrientation(params?.reversedProbability ?? 0.3);
    const meaningShort =
      orientation === "upright" ? base.meaningUpright : base.meaningReversed;

    return {
      id: base.id,
      name: base.name,
      orientation,
      position,
      meaningShort,
      meaningUpright: base.meaningUpright,
      meaningReversed: base.meaningReversed,
    };
  }) as TarotSpread["cards"];

  return { type: "situationChallengeGuidance", cards };
}

