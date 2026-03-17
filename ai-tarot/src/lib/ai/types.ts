import type { TarotOrientation, TarotPosition } from "@/lib/tarot/types";

export type AiCardSection = {
  position: TarotPosition;
  name: string;
  orientation: TarotOrientation;
  meaning: string;
  intuitive: string;
};

export type AiReading = {
  opening: string;
  cards: [AiCardSection, AiCardSection, AiCardSection];
  synthesis: string;
  nextSteps: string;
  closing: string;
  disclaimer: string;
};

export type PromptVersion = "v1";

