// src/app/(private)/profil/[id]/edit-profile/page.tsx

import NewProfileForm from "@/sections/NewProfileView";
import { Typography, Box, Container } from "@mui/material";

export const metadata = {
  title: "New Profile | ZoškaSnap",
};

export default function NewProfilePage() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        mb: 8,
        padding: 2,
      }}>
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
        }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}>
          Create New Profile
        </Typography>
      </Box>
      <NewProfileForm />
    </Container>
  );
}