// src/app/(private)/prispevok/page.tsx
import NextLink from "next/link";
import { Link as MuiLink, Container, Typography, Box } from "@mui/material";

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { Post } from "@/types/post";
import PostCard from "@/sections/post/PostCard";

export const metadata = { title: "Feed | Echo" };

export default async function FeedPage() {
  // Fetch posts, including each user’s profile.avatarUrl
  const rawPosts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        include: {
          profile: {
            select: { avatarUrl: true },
          },
        },
      },
      images: true,
      likes: true,
      comments: {
        include: { user: true },
      },
    },
  });

  // Map so PostCard sees the custom avatar first (in user.image)
  const posts: Post[] = rawPosts.map((p) => ({
    ...p,
    user: {
      ...p.user,
      image: p.user.profile?.avatarUrl || p.user.image,
    },
  }));

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          textAlign: "center",
          color: "primary.main",
        }}
      >
        Príspevky
      </Typography>

      {posts.length > 0 ? (
        posts.map((post) => {
          if (!post.user.name) {
            return null;
          }
          return (
            <PostCard
              key={post.id}
              post={post}
              commentCount={post.comments.length}
            />
          );
        })
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 2,
              fontWeight: "bold",
              textAlign: "center",
              color: "text.secondary",
            }}
          >
            Žiadne príspevky na zobrazenie.
          </Typography>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "text.primary" }}
          >
            Buďte prvý, kto zdieľa príspevok!{" "}
            <MuiLink component={NextLink} href="/new-post">
              Create a new post
            </MuiLink>
          </Typography>
        </Box>
      )}
    </Container>
  );
}
