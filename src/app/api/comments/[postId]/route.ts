// /api/comments/[postId]/route.ts
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } }
) {
  const comments = await prisma.comment.findMany({
    where: { postId: params.postId, parentId: null },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          profile: {
            select: {
              avatarUrl: true,
            },
          },
        },
      },
      replies: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              profile: {
                select: {
                  avatarUrl: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Flatten avatarUrl from profile to top-level user object
  const formatUser = (user: any) => ({
    ...user,
    avatarUrl: user.profile?.avatarUrl ?? null,
  });

  const formatted = comments.map((comment) => ({
    ...comment,
    user: formatUser(comment.user),
    replies: comment.replies.map((reply) => ({
      ...reply,
      user: formatUser(reply.user),
    })),
  }));

  return NextResponse.json(formatted);
}

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
