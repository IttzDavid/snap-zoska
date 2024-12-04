"use client";

import {
  Button,
  Container,
  Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub"; // GitHub icon

export default function SignInView() {
  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        p: 3,
        bgcolor: "background.paper",
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      {/* Logo / Title */}
      <Typography variant="h5" sx={{ mb: 3 }}>
        Prihlásenie
      </Typography>

      <Typography variant="body1" sx={{ mb: 6 }}>
        Nemáte účet? <a href="/auth/registracia">Registrujte sa</a>
      </Typography>

      {/* Google Sign In */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => signIn("google")}
        sx={{ mb: 1 }}
      >
        Prihlásiť sa účtom Google
      </Button>

      {/* GitHub Sign In - Iconic button */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<GitHubIcon />} // GitHub icon
        onClick={() => {
          // Placeholder function, replace with GitHub sign-in logic tomorrow
          console.log("GitHub sign-in (dummy) clicked");
        }}
        sx={{
          mb: 1,
          bgcolor: "#333", // Dark background similar to GitHub's color
          color: "white", // White text color
          '&:hover': {
            bgcolor: "#444", // Darker shade for hover effect
          },
        }}
      >
        GitHub
      </Button>
    </Container>
  );
}
