// src/components/PostCard.tsx

"use client";

import { useSession } from "next-auth/react";

import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { Post } from "@/types/post";
import Caption from "./Caption";
import Carousel from "./Carousel";
import LikeButton from "./LikeButton";
import Timestamp from "./Timestamp";

export default function PostCard({ post }: { post: Post }) {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 2,
        boxShadow: 3,
        "&:hover": {
          boxShadow: 6,
        },
        maxWidth: 500,
        margin: "25px auto",
      }}>
      <Box sx={{ display: "flex", alignItems: "center", p: 2 }}>
        <Avatar
          alt={post.user.name || "User"}
          src={post.user.image || ""}
          sx={{ mr: 2, width: 40, height: 40 }}
        />
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold" }}>
          {post.user.name}
        </Typography>
      </Box>

      {/* Zobrazenie obrázku príspevku */}
      <Carousel images={post.images} />

      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Box>
            <LikeButton
              postId={post.id}
              isLiked={post.likes.some((like) => like.userId === userId)}
              initialLikes={post.likes.length}
            />
            <IconButton>
              <ChatBubbleOutlineIcon />
            </IconButton>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Box>
          <IconButton>
            <BookmarkBorderIcon />
          </IconButton>
        </Box>

        <Caption
          username={post.user.name || "Unknown user"}
          caption={post.caption || "Bez popisu"}
        />
        <Timestamp date={post.createdAt} />
      </CardContent>
    </Card>
  );
}