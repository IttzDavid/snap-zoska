"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Box,
} from "@mui/material";

export default function AddPost() {
  const { data: session } = useSession();
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (session?.user?.email) {
        try {
          const res = await fetch(`/api/user?email=${session.user.email}`);
          if (!res.ok) throw new Error("Failed to fetch user");

          const userData = await res.json();
          setUserId(userData.id); // Store the user ID
        } catch (err) {
          console.error("Error fetching user:", err);
          setError("Failed to fetch user data.");
        }
      }
    };

    fetchUser();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID not found. Please log in again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const postData = { imageUrl, caption, userId };
      console.log("Data to send:", postData); // Debugging

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!response.ok) throw new Error("Failed to create post");

      router.push("/");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Add a New Post
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Image URL"
            variant="outlined"
            fullWidth
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
          />
          <TextField
            label="Caption (optional)"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Add Post"}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
