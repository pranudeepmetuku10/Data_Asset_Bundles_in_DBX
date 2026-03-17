export function isSensitiveQuestion(question: string): boolean {
  const q = question.toLowerCase();
  const patterns = [
    "suicide",
    "kill myself",
    "end my life",
    "self harm",
    "self-harm",
    "hurt myself",
    "abuse",
    "sexual assault",
    "rape",
    "domestic violence",
    "die",
  ];
  return patterns.some((p) => q.includes(p));
}

export function safeSensitiveReading(): {
  opening: string;
  synthesis: string;
  nextSteps: string;
  closing: string;
  disclaimer: string;
} {
  return {
    opening:
      "Before we go anywhere mystical, I want to meet you as a person. If your question is touching on harm, abuse, or feeling unsafe, you deserve real, human support and protection—not a prediction.",
    synthesis:
      "A tarot reading can be a mirror for emotions, but it can’t replace care, safety planning, or professional guidance. You don’t have to hold this alone, and you don’t have to be “ready” to ask for help.",
    nextSteps:
      "If you feel in immediate danger or at risk of harming yourself, please contact your local emergency number right now. If you can, reach out to someone you trust and tell them plainly what’s going on. If you’d like, you can also reframe your question here into something gentle and grounding—for example: “What do I need to feel safe and supported this week?”",
    closing:
      "You’re not a burden for needing support. You’re human—and you’re worth being held carefully.",
    disclaimer:
      "This experience is for reflection and entertainment/spiritual insight. It is not medical or mental-health advice. If you’re feeling unsafe or in crisis, please seek immediate help from local emergency services or a qualified professional.",
  };
}

