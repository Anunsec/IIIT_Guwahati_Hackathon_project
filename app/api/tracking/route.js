import { db } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    let user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    let tracking = await db.courseTracking.findMany({
        where: { userId: user.id },
    });

    // If no tracking data exists, create a new entry
    if (tracking.length === 0) {
        tracking = await db.courseTracking.create({
            data: {
                userId: user.id,
                progress: 0, // Default progress
            },
        });
        return NextResponse.json([tracking]); // Wrap in an array to maintain consistency
    }

    return NextResponse.json(tracking);
}

export async function PATCH(request) {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
    });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const body = await request.json();
    const tracking = await db.courseTracking.updateMany({
        where: {
            userId: user.id,
        },
        data: {
            progress: body.progress,
        },
    });

    return NextResponse.json(tracking);
}