// src/components/CommentSection.tsx
"use client";

import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Paper,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
    avatarUrl?: string | null; // custom profile pic
  };
  replies: Comment[];
}

export default function CommentSection({
  postId,
  userId,
}: {
  postId: string;
  userId: string;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`/api/comments/${postId}`)
      .then((res) => res.json())
      .then((data: Comment[]) => setComments(data));
  }, [postId]);

  const handleSubmit = async () => {
    await fetch(`/api/comments/${postId}`, {
      method: "POST",
      body: JSON.stringify({ content: newComment, userId }),
      headers: { "Content-Type": "application/json" },
    });

    setNewComment("");
    const updated = await fetch(`/api/comments/${postId}`);
    setComments(await updated.json());
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Chceš tento komentár vymazať?")) return;
    const res = await fetch(`/api/comment/${id}`, { method: "DELETE" });
    if (res.ok) {
      setComments((prev) =>
        prev
          .filter((c) => c.id !== id)
          .map((c) => ({
            ...c,
            replies: c.replies.filter((r) => r.id !== id),
          }))
      );
    } else {
      alert("Nepodarilo sa vymazať komentár.");
    }
  };

  const renderAvatar = (user: Comment["user"]) => {
    const src = user.avatarUrl || user.image || undefined;
    const initials = (user.name ?? "")
      .split(" ")
      .map((w) => w[0])
      .join("");
    return (
      <Avatar src={src} sx={{ width: 24, height: 24, mr: 1 }}>
        {!src && initials}
      </Avatar>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: 400 }}>
      {/* Scrollable comment list */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
        {comments.length === 0 ? (
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{ mt: 2 }}
          >
            No comments posted.
          </Typography>
        ) : (
          comments.map((comment) => (
            <Paper key={comment.id} sx={{ p: 1, mb: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                {renderAvatar(comment.user)}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="subtitle2">
                    {comment.user.name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(comment.createdAt).toLocaleString()}
                  </Typography>
                </Box>
                {comment.user.id === userId && (
                  <IconButton size="small" onClick={() => handleDelete(comment.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
              <Typography variant="body2">{comment.content}</Typography>

              {comment.replies.map((reply) => (
                <Box key={reply.id} sx={{ pl: 4, mt: 1 }}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {renderAvatar(reply.user)}
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body2">
                        <strong>{reply.user.name}</strong>: {reply.content}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(reply.createdAt).toLocaleString()}
                      </Typography>
                    </Box>
                    {reply.user.id === userId && (
                      <IconButton size="small" onClick={() => handleDelete(reply.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              ))}
            </Paper>
          ))
        )}
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* New comment input */}
      <Box sx={{ mt: "auto" }}>
        <TextField
          label="Add a comment"
          multiline
          rows={2}
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ mt: 1 }}
          disabled={!newComment.trim()}
          fullWidth
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}
