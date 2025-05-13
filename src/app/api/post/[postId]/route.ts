// /app/api/post/[postId]/route.ts

import { NextRequest } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export async function DELETE(req: NextRequest, { params }: { params: { postId: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  const { postId } = params;

  try {
    const post = await prisma.post.findUnique({ where: { id: postId } });

    if (!post || post.userId !== session.user.id) {
      return new Response(JSON.stringify({ message: "Forbidden" }), { status: 403 });
    }

    await prisma.post.delete({ where: { id: postId } });

    return new Response(JSON.stringify({ message: "Post deleted successfully" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
