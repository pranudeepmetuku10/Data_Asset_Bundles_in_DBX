import { NextResponse } from "next/server";

import { intakeSchema } from "@/lib/validation/intake";
import { drawSpreadSCG } from "@/lib/tarot/draw";
import { getAdminDb } from "@/lib/firebase/admin";

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = intakeSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input." },
      { status: 400 },
    );
  }

  const spread = drawSpreadSCG({ reversedProbability: 0.3 });
  const now = new Date();

  const docRef = await getAdminDb().collection("readings").add({
    ownerUid: null,
    guestId: null,
    createdAt: now,
    updatedAt: now,
    intake: parsed.data,
    spread,
    ai: null,
  });

  return NextResponse.json({ readingId: docRef.id, spread });
}

