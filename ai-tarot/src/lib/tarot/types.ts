export type TarotArcana = "major" | "minor";

export type TarotOrientation = "upright" | "reversed";

export type TarotPosition = "situation" | "challenge" | "guidance";

export type TarotCard = {
  id: string; // stable slug, e.g. "the-fool"
  name: string;
  arcana: TarotArcana;
  keywords: string[];
  meaningUpright: string;
  meaningReversed: string;
  imagery: string;
  shadow: string;
  guidance: string;
  vibeTags: string[];
};

export type DrawnCard = {
  id: string;
  name: string;
  orientation: TarotOrientation;
  position: TarotPosition;
  meaningShort: string;
  meaningUpright: string;
  meaningReversed: string;
};

export type TarotSpread = {
  type: "situationChallengeGuidance";
  cards: [DrawnCard, DrawnCard, DrawnCard];
};

