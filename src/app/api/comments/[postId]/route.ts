// GET comments for a post
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const comments = await prisma.comment.findMany({
    where: { postId: params.postId, parentId: null },
    include: {
      user: true,
      replies: {
        include: {
          user: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(comments);
}

// POST a new comment
export async function POST(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const body = await req.json();
  const { content, userId, parentId } = body;

  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      postId: params.postId,
      parentId,
    },
  });

  return NextResponse.json(comment);
}
