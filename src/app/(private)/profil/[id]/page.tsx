// src/app/(private)/profil/[id]/page.tsx

import Link from "next/link";
import {
  Avatar,
  Container,
  Paper,
  Stack,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  Button,
} from "@mui/material";

import { prisma } from "@/app/api/auth/[...nextauth]/prisma";
import { Post } from "@/types/post";

export default async function ProfileDetails({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const user = await prisma.user.findFirst({
    where: { id },
    include: { profile: true },
  });

  // Show custom avatar if set, otherwise provider image, otherwise default
  const avatarSrc =
    user?.profile?.avatarUrl ||
    user?.image ||
    "/default-avatar.png";

  const posts: Post[] = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    where: { userId: id },
    include: {
      user: true,
      images: true,
      likes: true,
      comments: {
        include: { user: true },
      },
    },
  });

  if (!user?.profile) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
          >
            You don’t have a profile yet.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href={`/profil/${id}/create-profile`}
          >
            Create Profile
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          height: "100%",
          borderRadius: 3,
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={3} alignItems="center">
            <Avatar
              src={avatarSrc}
              alt={user?.name || "User"}
              sx={{ width: 80, height: 80 }}
            />
            <Stack>
              <Typography variant="h5" fontWeight={600}>
                {user?.name || "Unnamed User"}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email || "No email provided"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.profile?.bio || "No bio available"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.profile?.location || "No location provided"}
              </Typography>
            </Stack>
          </Stack>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            href={`/profil/${id}/edit-profile`}
          >
            Edit Profile
          </Button>
        </Stack>
        <Box mt={4}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Posts
          </Typography>
          <Grid container spacing={1} mt={2}>
            {posts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <Card>
                  {post.images.length > 0 && (
                    <CardMedia
                      component="img"
                      sx={{
                        width: "100%",
                        aspectRatio: "1 / 1",
                        objectFit: "cover",
                      }}
                      image={post.images[0].imageUrl}
                      alt="Post image"
                    />
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
