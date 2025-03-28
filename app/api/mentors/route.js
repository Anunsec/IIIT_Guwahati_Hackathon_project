import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const mentors = await db.mentor.findMany({
      include: { reviews: true },
    });
    return NextResponse.json(mentors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch mentors" }, { status: 500 });
  }
}
