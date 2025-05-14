// ✅ NEW FILE: app/(private)/profil/[id]/post/[postId]/page.tsx
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { notFound } from "next/navigation";
import PostCard from "@/sections/post/PostCard";
import { Box, Container, Button } from "@mui/material";
import Link from "next/link";

export default async function SinglePostPage({
  params,
}: {
  params: { id: string; postId: string };
}) {
  const post = await prisma.post.findUnique({
    where: { id: params.postId },
    include: {
      user: true,
      images: true,
      likes: true,
      comments: { include: { user: true } },
    },
  });

  if (!post) return notFound();

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <PostCard post={post} commentCount={post.comments.length}/>
      <Box textAlign="center" mt={3}>
        <Button
          variant="outlined"
          component={Link}
          href={`/profil/${params.id}`}
        >
          Back to Profile
        </Button>
      </Box>
    </Container>
  );
}