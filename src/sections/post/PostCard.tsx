"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  Avatar,
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DeleteIcon from "@mui/icons-material/Delete"; // NEW

import { Post } from "@/types/post";
import Caption from "./Caption";
import Carousel from "./Carousel";
import LikeButton from "./LikeButton";
import Timestamp from "./Timestamp";
import CommentSection from "./CommentSection";
import { useRouter } from "next/navigation"; // NEW

export default function PostCard({
  post,
  commentCount,
}: {
  post: Post;
  commentCount: number;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // NEW
  const router = useRouter(); // NEW

  const customAvatar = (post.user as any).avatarUrl as string | null;
  const providerAvatar = post.user.image;
  const avatarSrc = customAvatar || providerAvatar || undefined;
  const initials =
    post.user.name
      ?.split(" ")
      .map((part) => part[0])
      .join("") ?? "";

  // 🔥 DELETE POST HANDLER
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/post/${post}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDeleteDialogOpen(false);
        router.refresh(); // Refresh the page or re-fetch posts
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Card
        sx={{
          mb: 4,
          borderRadius: 2,
          boxShadow: 3,
          "&:hover": { boxShadow: 6 },
          maxWidth: 500,
          margin: "25px auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", p: 2, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              alt={post.user.name || "User"}
              src={avatarSrc}
              sx={{ mr: 2, width: 40, height: 40 }}
            >
              {!avatarSrc && initials}
            </Avatar>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {post.user.name}
            </Typography>
          </Box>

          {/* 🗑️ DELETE BUTTON for Post Author */}
          {userId === post.userId && (
            <IconButton onClick={() => setDeleteDialogOpen(true)}>
              <DeleteIcon color="error" />
            </IconButton>
          )}
        </Box>

        <Carousel images={post.images} />

        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Box>
              <LikeButton
                postId={post.id}
                isLiked={post.likes.some((like) => like.userId === userId)}
                initialLikes={post.likes.length}
              />
              <IconButton onClick={() => setOpen(true)}>
                <ChatBubbleOutlineIcon />
              </IconButton>
              <Typography variant="body2" component="span">
                {commentCount}
              </Typography>
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

      {/* 💬 Comments Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Komentáre</DialogTitle>
        <DialogContent>
          {session?.user?.id && (
            <CommentSection postId={post.id} userId={session.user.id} />
          )}
        </DialogContent>
      </Dialog>

      {/* 🗑️ Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
