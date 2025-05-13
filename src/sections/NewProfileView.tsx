// src/components/NewProfileForm.tsx

"use client";

import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";

export default function NewProfileForm() {
  const [bio, setBio] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setAvatarPreview("");
    }
  };

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
      formData.append("userId", session.user.id);
      formData.append("bio", bio);
      formData.append("location", location);
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      const response = await fetch("/api/profile", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        router.push(`/profil/${session.user.id}`);
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
      encType="multipart/form-data"
      sx={{ maxWidth: 600, margin: "0 auto", padding: 2 }}
    >
      <Typography variant="h4" gutterBottom>
        Create Profile
      </Typography>
      {error && (
        <Typography color="error" variant="body2" gutterBottom>
          {error}
        </Typography>
      )}

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Avatar src={avatarPreview} sx={{ width: 64, height: 64 }} />
        <Button variant="outlined" component="label">
          Upload Avatar
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
          />
        </Button>
      </Box>

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
        disabled={loading}
        sx={{ marginTop: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Create Profile"}
      </Button>
    </Box>
  );
}
