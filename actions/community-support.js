"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Create a Question
export async function createQuestion(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
    
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
    
        if (!user) {
            throw new Error("User not found");
        }
    
        const question = await db.question.create({
            data: {
                title: data.title,
                description: data.description,
                categoryId: data.categoryId, // Link to category
                tags: data.tags,
                userId: user.id,
            },
        });
    
        // await revalidatePath("/community-support");
    
        return question;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getDiscussions() {
    try {
        const questions = await db.question.findMany({
            include: {
                user: true,
                category: true,
            },
            orderBy: { createdAt: "desc" },
        });
    
        return questions;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createAnswer(data) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
    
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
    
        if (!user) {
            throw new Error("User not found");
        }
    
        const answer = await db.answer.create({
            data: {
                content: data.content,
                questionId: data.questionId,
                userId: user.id,
            },
        });
    
        await revalidatePath(`/community-support/discussion/${data.questionId}`);
    
        return answer;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function upvoteAnswer(answesId) {
    try {
        const { userId } = await auth();
        if (!userId) throw new Error("Unauthorized");
    
        const user = await db.user.findUnique({
            where: { clerkUserId: userId },
        });
    
        if (!user) {
            throw new Error("User not found");
        }
    
        const answer = await db.answer.update({
            where: { id: answesId },
            data: {
                upvotes: {
                    increment: 1,
                },
            },
        });
    
        return answer;
    } catch (error) {
        throw new Error(error.message);
    }
}