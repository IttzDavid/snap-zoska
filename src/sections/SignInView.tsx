"use client"; // Client-side only component

import {
  Button,
  Container,
  Typography,
  Link,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub"; // GitHub icon

export default function SignInView() {
  const router = useRouter();

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
        Nemáte účet?{" "}
        <Link
          component="button"
          onClick={() => router.push("/auth/registracia")}
          sx={{ cursor: "pointer" }}
        >
          <span>Registrujte sa</span>
        </Link>
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
        Prihlásiť sa účtom GitHub
      </Button>
    </Container>
  );
}
