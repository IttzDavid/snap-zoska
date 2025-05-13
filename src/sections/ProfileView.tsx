// src/app/profil/page.tsx
"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Box, Typography, Avatar, CircularProgress } from "@mui/material";

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  image: string | null;       // provider image
  avatarUrl: string | null;   // your custom profile pic
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
        const res = await fetch("/api/profile", { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        // adjust if your API returns `{ profile: {...} }`
        setUserProfile(data.profile ?? data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <CircularProgress />;
  if (error)  return <Typography color="error">{error}</Typography>;

  if (!userProfile) {
    return <Typography>No profile data</Typography>;
  }

  // pick src in priority: avatarUrl → provider image → empty
  const src = userProfile.avatarUrl || "";

  // get initials fallback
  const initials = (userProfile.name ?? userProfile.email.split("@")[0])
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Avatar
        alt={userProfile.name || "User"}
        src={src}
        sx={{ width: 100, height: 100, mb: 2, mx: "auto" }}
      >
        {initials}
      </Avatar>

      <Typography variant="h5">
        {userProfile.name || "No name"}
      </Typography>
      <Typography variant="body1">{userProfile.email}</Typography>
      <Typography variant="body2" color="textSecondary">
        Member since {userProfile.createdAt.toLocaleDateString()}
      </Typography>
    </Box>
  );
};

export default ProfileView;
