
// src/app/profil/page.tsx


import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box } from "@mui/material"; // For layout
import ProfileView from "@/sections/ProfileView"; // Import ProfileView

export const metadata = { title: 'Zoznam profilov | David IG' };

export default function ProfilList() {
  return (
    <Container>
      {/* Title for the page */}
      <Typography variant="h4" gutterBottom>
        Zoznam profilov
      </Typography>

      {/* Profile View Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: 4,
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: '8px',
          boxShadow: 2,
        }}
      >
        <ProfileView /> {/* Render the ProfileView Component */}
      </Box>
    </Container>
  );
}
