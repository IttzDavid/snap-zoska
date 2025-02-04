import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import { Post } from "@prisma/client";

interface PostsViewProps {
  posts: (Post & { user: { name: string | null; image: string | null } })[];
}

export default function PostsView({ posts }: PostsViewProps) {
  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Príspevky
      </Typography>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} sx={{ mb: 3 }}>
            <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
              <Avatar
                alt={post.user.name || "User"}
                src={post.user.image || ""}
                sx={{ mr: 2 }}
              />
              <Typography variant="subtitle1">{post.user.name}</Typography>
            </Box>

            {/* Box wrapper to maintain aspect ratio */}
            <Box sx={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
              <CardMedia
                component="img"
                image={post.imageUrl}
                alt={post.caption || "Post image"}
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // Ensures the whole image is visible
                }}
              />
            </Box>

            <CardContent>
              <Typography variant="body1" sx={{ mb: 1 }}>
                {post.caption || "Bez popisu"}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ fontSize: "0.8rem" }}
              >
                Publikované: {new Date(post.createdAt).toLocaleString("sk-SK")}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1">Žiadne príspevky na zobrazenie.</Typography>
      )}
    </Container>
  );
}
