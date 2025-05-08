// src/components/post/LikeButton.tsx

"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import { getSession } from "next-auth/react";

import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { LikeButtonProps } from "@/types/like-button-props";

export default function LikeButton({
  postId,
  isLiked,
  initialLikes,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    try {
      const session = await getSession();
      if (!session?.user?.id) {
        redirect("/auth/registracia");
      } else {
        if (liked) {
          setLikes((prev) => prev - 1);
          setLiked(false);
          await fetch("/api/likes", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              postId: postId,
              userId: session.user.id,
            }),
          });
        } else {
          setLikes((prev) => prev + 1);
          setLiked(true);
          await fetch("/api/likes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              postId: postId,
              userId: session.user.id,
            }),
          });
        }
      }
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  };

  return (
    <>
      <IconButton
        onClick={handleLike}
        color="primary">
        {liked ? <Favorite sx={{ color: "red" }} /> : <FavoriteBorderIcon />}
      </IconButton>
      {likes > 0 && (
        <Typography
          variant="body2"
          component="span">
          {likes}
        </Typography>
      )}
    </>
  );
}