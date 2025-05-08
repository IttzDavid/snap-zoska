// src/components/post/Timestamp.tsx

import { Typography } from "@mui/material";

export default function Timestamp({ date }: { date: Date }) {
  const formattedDate = (() => {
    const diff = Date.now() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
  })();

  return (
    <Typography
      variant="body2"
      color="text.secondary"
      sx={{ fontSize: "0.875rem", marginTop: "4px" }}>
      {formattedDate}
    </Typography>
  );
}