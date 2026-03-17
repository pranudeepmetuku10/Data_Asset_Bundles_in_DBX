import { NextResponse } from "next/server";

import { getAdminDb } from "@/lib/firebase/admin";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  if (!id) return NextResponse.json({ error: "Missing id." }, { status: 400 });

  const doc = await getAdminDb().collection("readings").doc(id).get();
  if (!doc.exists)
    return NextResponse.json({ error: "Not found." }, { status: 404 });

  return NextResponse.json({ readingId: doc.id, ...doc.data() });
}

