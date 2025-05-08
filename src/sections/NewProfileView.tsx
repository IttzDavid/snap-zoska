// src/components/NewProfileForm.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getSession } from "next-auth/react";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function NewProfileForm() {
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const session = await getSession();
      if (!session?.user?.id) {
        setError("You must be logged in to create a profile.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("bio", bio);
      formData.append("location", location);
      formData.append("userId", session.user.id);
      formData.append("image", session.user.image || ""); // Optional image field

      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        router.push(`/profil/${session.user.id}`); // Redirect to the profile page
      } else {
        setError(data.message || "Failed to create profile.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while creating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}>
      <Typography
        variant="h4"
        gutterBottom>
        Create Profile
      </Typography>
      {error && (
        <Typography
          color="error"
          variant="body2"
          gutterBottom>
          {error}
        </Typography>
      )}
      <TextField
        label="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}>
        {loading ? "Creating..." : "Create Profile"}
      </Button>
    </Box>
  );
}