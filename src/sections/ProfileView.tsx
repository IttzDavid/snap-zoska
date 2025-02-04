// src/app/profil/page.tsx
"use client";

import { useEffect, useState } from "react";
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileView = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }
        const data = await res.json();
        setUserProfile(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box sx={{ textAlign: "center" }}>
      {userProfile && (
        <>
          <Avatar
            alt={userProfile.name || "User"}
            src={userProfile.image || ""}
            sx={{ width: 100, height: 100, marginBottom: 2 }}
          />
          <Typography variant="h5">{userProfile.name || "No name"}</Typography>
          <Typography variant="body1">{userProfile.email}</Typography>
          <Typography variant="body2" color="textSecondary">
            Member since {userProfile.createdAt.toLocaleDateString()}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default ProfileView;
