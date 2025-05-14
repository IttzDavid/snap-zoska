// src/sections/HomeView.tsx

"use client";

import { useRouter } from "next/navigation";
import { Container, Typography, Button } from "@mui/material";

export default function SignUpRedirectView() {
  const router = useRouter();

  const handleRedirect = () => {
    // Redirect to the login or registration page
    router.push("/auth/registracia");
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
        Zaregistrujte sa alebo prihláste sa pre prístup k funkciám.
      </Typography>
      <Button
        onClick={handleRedirect}
        variant="contained"
        sx={{
          backgroundColor: "#f50057",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "16px",
          "&:hover": {
            backgroundColor: "#dc004e",
          },
        }}
      >
        Zaregistrovať sa
      </Button>
    </Container>
  );
}
