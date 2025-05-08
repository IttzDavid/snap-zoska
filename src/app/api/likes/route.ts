// src/app/api/likes/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export async function POST(req: NextRequest) {
  try {
    const { postId, userId } = await req.json();

    if (!postId || !userId) {
      return NextResponse.json(
        { message: "Post ID and User ID are required." },
        { status: 400 }
      );
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (existingLike) {
      return NextResponse.json(
        { message: "You have already liked this post." },
        { status: 400 }
      );
    }

    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });

    return NextResponse.json({ message: "Like added." });
  } catch (error) {
    console.error("Error adding like:", error);
    return NextResponse.json(
      { message: "An error occurred while adding the like." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { postId, userId } = await req.json();

    if (!postId || !userId) {
      return NextResponse.json(
        { message: "Post ID and User ID are required." },
        { status: 400 }
      );
    }

    const existingLike = await prisma.like.findFirst({
      where: {
        postId,
        userId,
      },
    });

    if (!existingLike) {
      return NextResponse.json(
        { message: "You have not liked this post." },
        { status: 400 }
      );
    }

    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });

    return NextResponse.json({ message: "Like removed." });
  } catch (error) {
    console.error("Error removing like:", error);
    return NextResponse.json(
      { message: "An error occurred while removing the like." },
      { status: 500 }
    );
  }
}