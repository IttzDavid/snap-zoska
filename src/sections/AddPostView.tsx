// src/components/NewPostForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getSession } from "next-auth/react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Input,
  Grid,
  Card,
  CardMedia,
} from "@mui/material";

export default function NewPostForm() {
  const [caption, setCaption] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (images.length === 0) {
      setError("Please upload at least one image.");
      setLoading(false);
      return;
    }

    try {
      const session = await getSession();
      if (!session?.user?.id) {
        setError("You must be logged in to create a post.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("caption", caption);
      formData.append("userId", session.user.id);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await fetch("/api/posts", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setCaption("");
        setImages([]);
        router.push("/prispevok");
      } else {
        setError(data.message || "Failed to create post.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 500,
        margin: "0 auto",
        padding: 3,
        borderRadius: 2,
        boxShadow: 3,
        border: "2px solid #e0e0e0",
        backgroundColor: "background.paper",
      }}>
      {/* Nahrávanie obrázkov */}
      <Box>
        <label htmlFor="images">
          <Button
            variant="outlined"
            component="span"
            fullWidth
            sx={{
              padding: "10px",
              backgroundColor: "white",
              color: "black",
              borderRadius: 2,
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}>
            Upload Images
          </Button>
        </label>
        <Input
          type="file"
          id="images"
          inputProps={{ multiple: true }}
          onChange={handleImageChange}
          sx={{ display: "none" }}
        />
        {images.length > 0 && (
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ marginTop: 1 }}>
            {images.length} image(s) selected.
          </Typography>
        )}
      </Box>

      {/* Zobrazenie náhľadov obrázkov */}
      {images.length > 0 && (
        <Grid
          container
          spacing={2}
          sx={{ marginTop: 2 }}>
          {images.map((image, index) => (
            <Grid
              item
              xs={4}
              key={index}>
              <Card>
                <CardMedia
                  component="img"
                  image={URL.createObjectURL(image)}
                  alt={`Image ${index + 1}`}
                  sx={{ width: "100%", height: 120, objectFit: "cover" }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Caption */}
      <TextField
        label="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Write your caption here..."
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        sx={{ borderRadius: 2 }}
      />

      {/* Submit button */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{
          padding: "12px",
          borderRadius: 2,
          marginTop: 2,
          fontWeight: 600,
        }}
        disabled={loading}>
        {loading ? "Submitting..." : "Create Post"}
      </Button>

      {/* Error message */}
      {error && (
        <Typography
          variant="body2"
          color="error"
          sx={{ textAlign: "center", marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}