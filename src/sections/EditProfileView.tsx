"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getSession } from "next-auth/react";
import { Button, TextField, Box, Typography } from "@mui/material";

export default function EditProfileForm() {
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
        setError("You must be logged in to edit your profile.");
        setLoading(false);
        return;
      }

      const formData = {
        bio,
        location,
        userId: session.user.id,
      };

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Ensure Content-Type is set to application/json
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        router.push(`/profil/${session.user.id}`); // Redirect to the profile page
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while updating the profile.");
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
        Edit Profile
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
      />
      <TextField
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={loading}
        sx={{ marginTop: 2 }}>
        {loading ? "Updating..." : "Update Profile"}
      </Button>
    </Box>
  );
}