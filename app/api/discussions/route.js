import { NextResponse } from "next/server";
import { db } from "@/lib/prisma"; // Replace with your actual database connection

export async function GET() {
  try {
    const discussions = await db.question.findMany({
      include: {
        user: true,
        category: true,
        answers: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(discussions);
  } catch (error) {
    return NextResponse.error({ message: error.message });
  }
}
