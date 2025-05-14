"use client";

import { signOut } from "next-auth/react";
import { Button, Container, Typography, Box } from "@mui/material";

export default function SignOutView() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start", // Align to the top of the screen
        alignItems: "center", // Center horizontally
        height: "100vh", // Full viewport height
        p: 2, // Padding around the container
      }}
    >
      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 3,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Naozaj sa chcete odhlásiť?
        </Typography>
        <Button variant="contained" onClick={() => signOut()}>
          Odhlásiť sa
        </Button>
      </Container>
    </Box>
  );
}
