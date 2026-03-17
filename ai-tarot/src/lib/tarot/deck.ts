import type { TarotCard } from "./types";

export const MAJOR_ARCANA: TarotCard[] = [
  {
    id: "the-fool",
    name: "The Fool",
    arcana: "major",
    keywords: ["beginnings", "trust", "leap", "innocence"],
    meaningUpright:
      "A new chapter is calling. Curiosity, openness, and willingness to begin before you feel fully ready.",
    meaningReversed:
      "Hesitation, avoidance, or a leap that’s missing a grounding detail. Fear of looking foolish may be running the show.",
    imagery:
      "A traveler at the cliff’s edge—light, unburdened, guided by instinct more than certainty.",
    shadow:
      "Confusing freedom with fleeing. Letting anxiety dress up as “intuition.”",
    guidance:
      "Start small, but start. Choose one brave step that doesn’t require a perfect plan.",
    vibeTags: ["bright", "fresh", "unwritten"],
  },
  {
    id: "the-magician",
    name: "The Magician",
    arcana: "major",
    keywords: ["agency", "skill", "focus", "manifest"],
    meaningUpright:
      "You have more influence than you think. Attention, skill, and intention can shape the outcome.",
    meaningReversed:
      "Scattered energy or self-doubt. Tools are available, but confidence or integrity is out of alignment.",
    imagery:
      "One hand to the sky, one to the earth—turning idea into form through presence and precision.",
    shadow:
      "Trying to control what needs to be collaborated with. Performing competence instead of building it.",
    guidance:
      "Name the one thing you can do today that moves the needle. Focus beats force.",
    vibeTags: ["electric", "clear", "directed"],
  },
  {
    id: "the-high-priestess",
    name: "The High Priestess",
    arcana: "major",
    keywords: ["inner-knowing", "quiet", "mystery", "intuition"],
    meaningUpright:
      "There’s truth beneath the noise. Stillness and subtle cues will guide you better than urgent opinions.",
    meaningReversed:
      "Second-guessing your knowing or staying silent when your truth needs a voice. Information may be withheld—by you or others.",
    imagery:
      "A calm guardian of the threshold—inviting you inward, toward the part of you that already understands.",
    shadow:
      "Mistaking anxiety for intuition. Waiting for certainty that will never fully arrive.",
    guidance:
      "Reduce input. Ask: what do I know when I stop trying to convince myself?",
    vibeTags: ["lunar", "quiet", "deep"],
  },
  {
    id: "the-empress",
    name: "The Empress",
    arcana: "major",
    keywords: ["nourish", "love", "abundance", "body"],
    meaningUpright:
      "Growth through care. What you tend with patience becomes fertile—especially relationships and creativity.",
    meaningReversed:
      "Overgiving, depletion, or withholding care from yourself. A nurturing need is going unmet.",
    imagery:
      "Soft power—life made visible through tenderness, beauty, and embodied presence.",
    shadow:
      "Earning love through caretaking. Neglecting your own replenishment.",
    guidance:
      "Feed the root: sleep, food, touch, beauty, and time. Let the body lead the healing.",
    vibeTags: ["lush", "warm", "sensual"],
  },
  {
    id: "the-emperor",
    name: "The Emperor",
    arcana: "major",
    keywords: ["structure", "boundaries", "authority", "stability"],
    meaningUpright:
      "Clarity, standards, and boundaries create safety. A steady plan is better than a perfect one.",
    meaningReversed:
      "Rigidity, control, or resistance to responsibility. A boundary is either too tight or too porous.",
    imagery:
      "A throne built from discipline—power that protects when it’s grounded and fair.",
    shadow:
      "Using control to soothe fear. Confusing dominance with stability.",
    guidance:
      "Pick one boundary you can honor without resentment—and hold it with calm consistency.",
    vibeTags: ["anchored", "firm", "protective"],
  },
  {
    id: "the-hierophant",
    name: "The Hierophant",
    arcana: "major",
    keywords: ["tradition", "teacher", "ritual", "values"],
    meaningUpright:
      "A trusted framework helps right now—mentorship, ritual, or a steady practice that keeps you aligned.",
    meaningReversed:
      "Question inherited rules. You may be outgrowing a belief system or pleasing authority over your own values.",
    imagery:
      "A keeper of wisdom—offering structure, community, and meaning through shared language.",
    shadow:
      "Outsourcing your truth. Staying in a role that no longer fits.",
    guidance:
      "Ask: what do I truly believe—separate from what I was taught to want?",
    vibeTags: ["ritual", "steady", "ancient"],
  },
  {
    id: "the-lovers",
    name: "The Lovers",
    arcana: "major",
    keywords: ["choice", "union", "values", "alignment"],
    meaningUpright:
      "A meaningful choice wants to be made from values, not fear. Connection deepens through honesty.",
    meaningReversed:
      "Misalignment, mixed signals, or choosing from scarcity. A compromise may be costing your self-respect.",
    imagery:
      "Two paths meeting at the heart—devotion that begins with choosing yourself clearly.",
    shadow:
      "Confusing intensity for intimacy. Avoiding the conversation that would clarify everything.",
    guidance:
      "Name your non-negotiables gently. Let the truth simplify what’s been complicated.",
    vibeTags: ["heart", "tender", "clear"],
  },
  {
    id: "the-chariot",
    name: "The Chariot",
    arcana: "major",
    keywords: ["momentum", "will", "direction", "self-mastery"],
    meaningUpright:
      "Forward motion is available. When you choose a direction, your energy organizes around it.",
    meaningReversed:
      "Push-pull, burnout, or trying to force timing. The reins need a steadier grip—or a pause.",
    imagery:
      "Two forces harnessed into one direction—movement driven by focus, not frenzy.",
    shadow:
      "Proving yourself through speed. Mistaking urgency for destiny.",
    guidance:
      "Define one clear goal for the next two weeks. Let everything else become optional.",
    vibeTags: ["driven", "bright", "fast"],
  },
  {
    id: "strength",
    name: "Strength",
    arcana: "major",
    keywords: ["courage", "gentleness", "patience", "inner-power"],
    meaningUpright:
      "Real strength is tender. You can meet fear without letting it steer. Compassion is your leverage.",
    meaningReversed:
      "Self-criticism, doubt, or emotional reactivity. You may be bracing when you actually need softness.",
    imagery:
      "A calm hand on a wild heart—power that doesn’t need to raise its voice.",
    shadow:
      "Trying to outmuscle your feelings. Calling sensitivity “weakness.”",
    guidance:
      "Speak to yourself like someone you love. One brave, gentle act changes the whole tone.",
    vibeTags: ["soft", "steady", "brave"],
  },
  {
    id: "the-hermit",
    name: "The Hermit",
    arcana: "major",
    keywords: ["solitude", "truth", "inner-guidance", "pause"],
    meaningUpright:
      "A quiet interval reveals what noise can’t. Wisdom comes from listening closely to yourself.",
    meaningReversed:
      "Isolation, avoidance, or fear of being seen. The pause may be protecting you—or keeping you stuck.",
    imagery:
      "A lantern in the dark—choosing clarity over performance, one honest step at a time.",
    shadow:
      "Confusing hiding with healing. Waiting until you feel “fixed” to re-enter life.",
    guidance:
      "Take a small, private inventory: what’s true, what’s not, what’s next.",
    vibeTags: ["quiet", "wise", "minimal"],
  },
  {
    id: "wheel-of-fortune",
    name: "Wheel of Fortune",
    arcana: "major",
    keywords: ["cycles", "change", "timing", "turning-point"],
    meaningUpright:
      "A shift is in motion. Timing, chance, and momentum are rearranging the landscape—stay adaptable.",
    meaningReversed:
      "Resisting a cycle or trying to control what’s naturally changing. Old patterns may be repeating for closure.",
    imagery:
      "A wheel turning—reminding you that what rises also settles, and change is a kind of mercy.",
    shadow:
      "Interpreting uncertainty as a threat. Forgetting you’ve navigated shifts before.",
    guidance:
      "Work with the season you’re in. Ask: what is this moment asking me to release?",
    vibeTags: ["turning", "fated", "dynamic"],
  },
  {
    id: "justice",
    name: "Justice",
    arcana: "major",
    keywords: ["truth", "balance", "integrity", "consequence"],
    meaningUpright:
      "Clarity arrives through honesty. What you choose now shapes what’s fair and sustainable later.",
    meaningReversed:
      "Avoiding accountability or living in a fog of half-truths. Something needs naming directly.",
    imagery:
      "A steady gaze and an even scale—truth without cruelty, responsibility without shame.",
    shadow:
      "Punishing yourself instead of learning. Confusing blame with clarity.",
    guidance:
      "Choose the cleanest next step. Tell the truth in a way you can stand behind tomorrow.",
    vibeTags: ["clear", "clean", "direct"],
  },
  {
    id: "the-hanged-man",
    name: "The Hanged Man",
    arcana: "major",
    keywords: ["surrender", "perspective", "pause", "reframe"],
    meaningUpright:
      "A pause isn’t failure—it’s a perspective shift. Let the answer arrive sideways, not through force.",
    meaningReversed:
      "Stagnation, martyrdom, or refusing the lesson of the pause. You may be clinging to an old view.",
    imagery:
      "Upside-down clarity—seeing what you couldn’t see when you were rushing.",
    shadow:
      "Sacrificing yourself to avoid making a decision. Calling stuckness “patience.”",
    guidance:
      "Ask: what if I stopped trying to win—and started trying to understand?",
    vibeTags: ["still", "strange", "wise"],
  },
  {
    id: "death",
    name: "Death",
    arcana: "major",
    keywords: ["ending", "release", "renewal", "truth"],
    meaningUpright:
      "A chapter is ending so another can begin. This is transformation—cleaner, lighter, more honest.",
    meaningReversed:
      "Holding on past the expiration date. Fear of loss may be delaying relief.",
    imagery:
      "The necessary closing—grief and grace intertwined, making room for what’s next.",
    shadow:
      "Dragging the old story forward. Calling endings “failures.”",
    guidance:
      "Name what’s done, even if it’s tender. Let the ending be clean.",
    vibeTags: ["final", "liberating", "truthful"],
  },
  {
    id: "temperance",
    name: "Temperance",
    arcana: "major",
    keywords: ["integration", "balance", "healing", "patience"],
    meaningUpright:
      "Healing through harmony. Small adjustments, consistent care, and thoughtful blending bring relief.",
    meaningReversed:
      "Extremes, impatience, or pushing too hard. The system needs gentleness and time.",
    imagery:
      "Alchemy in slow motion—two elements becoming one through attention and restraint.",
    shadow:
      "All-or-nothing thinking. Trying to speed-run a process that’s meant to unfold.",
    guidance:
      "Choose the middle way. A sustainable pace is its own kind of magic.",
    vibeTags: ["calm", "smooth", "healing"],
  },
  {
    id: "the-devil",
    name: "The Devil",
    arcana: "major",
    keywords: ["attachment", "desire", "shadow", "pattern"],
    meaningUpright:
      "A pattern has its hand on you—attachment, craving, or a story that promises safety but costs you freedom.",
    meaningReversed:
      "Release is possible. You’re seeing the chain for what it is, and choice is returning.",
    imagery:
      "A mirror that doesn’t flatter—revealing what you’re bargaining away for comfort.",
    shadow:
      "Mistaking intensity for truth. Confusing coping with identity.",
    guidance:
      "Ask: what am I afraid will happen if I stop? Then soften toward that fear without obeying it.",
    vibeTags: ["charged", "raw", "honest"],
  },
  {
    id: "the-tower",
    name: "The Tower",
    arcana: "major",
    keywords: ["revelation", "shake-up", "truth", "reset"],
    meaningUpright:
      "A truth breaks through. What isn’t stable can’t be protected forever—this clears space for something real.",
    meaningReversed:
      "Avoiding an overdue change or bracing for impact. The shake-up may be smaller if you face the truth willingly.",
    imagery:
      "Lightning on the skyline—sudden clarity that frees you from a false structure.",
    shadow:
      "Catastrophizing. Confusing disruption with doom.",
    guidance:
      "Let what’s false fall. Keep what’s true close—your values, your people, your next step.",
    vibeTags: ["electric", "sharp", "reset"],
  },
  {
    id: "the-star",
    name: "The Star",
    arcana: "major",
    keywords: ["hope", "renewal", "trust", "gentle-future"],
    meaningUpright:
      "A soft, real hope returns. Healing is happening—even if it’s quiet. Keep going.",
    meaningReversed:
      "Discouragement or numbness. Hope may feel far, but it’s still there—just needing care and proof.",
    imagery:
      "Light after storm—steady and honest, not loud. A future you can breathe in.",
    shadow:
      "Needing certainty before you allow yourself to feel better.",
    guidance:
      "Choose one small act that signals trust: hydrate, reach out, make the plan, take the walk.",
    vibeTags: ["gentle", "open", "clean"],
  },
  {
    id: "the-moon",
    name: "The Moon",
    arcana: "major",
    keywords: ["uncertainty", "dreams", "intuition", "fog"],
    meaningUpright:
      "Not everything is clear yet. Let the mystery breathe. Dreams, body signals, and subtle patterns matter now.",
    meaningReversed:
      "Fog lifting or denial cracking. You may be ready to see what you’ve been avoiding.",
    imagery:
      "A path lit by moonlight—beautiful, unclear, and asking for slow steps.",
    shadow:
      "Assuming the worst in the absence of facts. Reading fear as prophecy.",
    guidance:
      "Move gently and verify. Ask one clarifying question instead of writing a whole story.",
    vibeTags: ["lunar", "mysterious", "soft"],
  },
  {
    id: "the-sun",
    name: "The Sun",
    arcana: "major",
    keywords: ["clarity", "joy", "truth", "life-force"],
    meaningUpright:
      "Clarity and warmth. Something becomes simpler, lighter, more honest. Let yourself receive what’s good.",
    meaningReversed:
      "Dimmed joy, overexposure, or needing rest. Light is available, but your nervous system may be tired.",
    imagery:
      "Open sky and clear sight—truth that comforts, not just exposes.",
    shadow:
      "Chasing happiness instead of letting it arrive. Performing “fine.”",
    guidance:
      "Choose what restores your life-force. Say yes to the simple, clean pleasure.",
    vibeTags: ["bright", "clear", "warm"],
  },
  {
    id: "judgement",
    name: "Judgement",
    arcana: "major",
    keywords: ["awakening", "calling", "reckoning", "release"],
    meaningUpright:
      "A reckoning that frees you. You’re being asked to answer a quieter, truer call—without shame.",
    meaningReversed:
      "Self-judgment or fear of being seen. The call is there, but you may be postponing your own permission.",
    imagery:
      "A rising—hearing your name and remembering who you are beneath the roles.",
    shadow:
      "Confusing growth with punishment. Waiting for external approval.",
    guidance:
      "Forgive the older version of you. Choose the next chapter on purpose.",
    vibeTags: ["clear", "rising", "true"],
  },
  {
    id: "the-world",
    name: "The World",
    arcana: "major",
    keywords: ["completion", "integration", "wholeness", "arrival"],
    meaningUpright:
      "A cycle completes. You’ve grown. Integration is the gift—letting yourself feel the “arrival.”",
    meaningReversed:
      "Almost-there energy or fear of finishing. A loose end wants closure so you can move on cleanly.",
    imagery:
      "A wreath of completion—wholeness that comes from experience, not perfection.",
    shadow:
      "Downplaying your progress. Staying in limbo to avoid the next level of visibility.",
    guidance:
      "Close the loop. Celebrate one thing you did right, then set the next horizon gently.",
    vibeTags: ["complete", "wide", "integrated"],
  },
];

