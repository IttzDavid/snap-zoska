// src/app/(home)/page.tsx

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { Container, Typography } from "@mui/material";
import HomeView from "@/sections/HomeView";


export const metadata = { title: "Domov | ZoškaSnap" };

export default async function HomePage() {
  // Fetch session on the server
  const session = await getServerSession(authOptions);

  if (session) {
    // Redirect authenticated users to the feed page
    redirect("/prispevok");
  }

  // Show the unauthenticated home view for non-authenticated users
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        p: 3,
        bgcolor: "background.default",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
        Vitajte na ZoškaSnap!
      </Typography>
      <Typography variant="h5" sx={{ mb: 3, color: "text.secondary" }}>
        Pre začatie používania našej aplikácie, prosím, vytvorte si účet.
      </Typography>
      <HomeView />
    </Container>
  );
}
