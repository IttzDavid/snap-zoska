// src/components/post/Caption.tsx

import { Typography } from "@mui/material";

export default function Caption({
  username,
  caption,
}: {
  username: string;
  caption: string;
}) {
  return (
    <Typography
      component="span"
      sx={{
        color: "text.primary",
      }}>
      <Typography
        component="strong"
        sx={{ fontWeight: "bold", marginRight: "0.3rem" }}>
        {username}
      </Typography>
      {caption}
    </Typography>
  );
}