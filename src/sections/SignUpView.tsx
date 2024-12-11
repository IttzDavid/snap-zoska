"use client"; // Client-side only component

import React, { useState } from "react";
import { Button, Container, Typography, Checkbox, FormControlLabel, Link } from "@mui/material";
import { signIn } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function SignUpView() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleSignUp = (provider: string) => {
    if (!isChecked) {
      alert("Pre pokračovanie musíte súhlasiť s podmienkami používania a GDPR.");
      return;
    }
    signIn(provider);
  };

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
        Registrácia
      </Typography>

      {/* Sign-in link */}
      <Typography variant="body1" sx={{ mb: 4 }}>
        Už máte účet?{" "}
        <Link href="/auth/prihlasenie">
          Prihláste sa
        </Link>
      </Typography>

      {/* Terms and GDPR Checkbox */}
      <FormControlLabel
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label={
          <Typography variant="body2">
            Súhlasím s{" "}
            <Link href="/gdpr">
              GDPR
            </Link>{" "}
            a{" "}
            <Link href="/podmienky">
              podmienkami používania
            </Link>.
          </Typography>
        }
        sx={{ mb: 3 }}
      />

      {/* Google Sign Up */}
      <Button
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        onClick={() => handleSignUp("google")}
        sx={{ mb: 1 }}
      >
        Registrovať sa účtom Google
      </Button>

      {/* GitHub Sign Up */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<GitHubIcon />}
        onClick={() => handleSignUp("github")}
        sx={{
          mb: 1,
          bgcolor: "#333",
          color: "white",
          "&:hover": {
            bgcolor: "#444",
          },
        }}
      >
        Prihlásiť sa účtom GitHub
      </Button>
    </Container>
  );
}
