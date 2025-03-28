import { NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function GET() {
    // Get all the category from database and return it
    const categories = await db.category.findMany();
    return NextResponse.json(categories);
    // return NextResponse.json({ message: "Hello, Next.js API!" });
}