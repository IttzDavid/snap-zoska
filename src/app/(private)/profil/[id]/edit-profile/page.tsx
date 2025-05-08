// src/app/(private)/profil/[id]/edit-profile/page.tsx

import EditProfileForm from "@/sections/EditProfileView";
import { Typography, Box, Container } from "@mui/material";

export const metadata = {
  title: "Edit Profile | ZoškaSnap",
};

export default function EditProfilePage() {
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
          Edit Profile
        </Typography>
      </Box>
      <EditProfileForm />
    </Container>
  );
}