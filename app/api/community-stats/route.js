import { NextResponse } from "next/server";
import { db } from "@/lib/prisma"; // Replace with your actual database connection

export async function GET() {
  try {
    const discussionsLength = await db.question.count();
    // const mentorsLength = await db.mentor.count();

    return NextResponse.json({
      discussionsLength,
    //   mentorsLength,
    });
  } catch (error) {
    return NextResponse.error({
      status: 500,
      message: error.message,
    });
  }
}
