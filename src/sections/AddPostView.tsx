"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  CardActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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
    const fileList = e.target.files;
    if (!fileList) return;
  
    const newFiles = Array.from(fileList);
    setImages((prev) => [...prev, ...newFiles]);
  };
  
  

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, i) => i !== indexToRemove));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "background.default",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 4,
          borderRadius: 3,
          boxShadow: 4,
          backgroundColor: "background.paper",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          textAlign="center"
          mb={3}
          color="primary.main"
        >
          Create a New Post
        </Typography>

        {/* Upload Images Button */}
        <Box>
          <label htmlFor="images">
            <Button
              variant="outlined"
              component="span"
              fullWidth
              sx={{
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
              }}
            >
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
              sx={{ mt: 1, color: "text.secondary" }}
            >
              {images.length} image(s) selected
            </Typography>
          )}
        </Box>

        {/* Image Previews */}
        {images.length > 0 && (
          <Grid container spacing={2} mt={2}>
            {images.map((image, index) => (
              <Grid item xs={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(image)}
                    alt={`Image ${index + 1}`}
                    sx={{ height: 120, objectFit: "cover" }}
                  />
                  <CardActions sx={{ justifyContent: "flex-end", p: 0.5 }}>
                    <IconButton
                      size="small"
                      onClick={() => removeImage(index)}
                    >
                      <DeleteIcon fontSize="small" color="error" />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Caption Field */}
        <TextField
          label="Caption"
          placeholder="Write something about your post..."
          multiline
          rows={4}
          fullWidth
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          sx={{ mt: 3 }}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            mt: 3,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 600,
          }}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Post"}
        </Button>

        {/* Error Message */}
        {error && (
          <Typography
            variant="body2"
            color="error"
            textAlign="center"
            mt={2}
          >
            {error}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
