// src/app/hladanie/page.tsx

export const dynamic = "force-dynamic";

import { Container } from "@mui/material";
import SearchView from "@/sections/SearchView";
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export const metadata = { title: "Hľadanie | ZoškaSnap" };

export default async function SearchPage() {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,   // may be null
      image: true,  // provider image
      profile: {
        select: {
          avatarUrl: true,  // your custom profile pic
        },
      },
    },
  });

  // Normalize fields and pull avatarUrl out of profile
  const formattedUsers = users.map(user => ({
    id: user.id,
    name: user.name ?? "Unknown User",
    image: user.image ?? "",
    avatarUrl: user.profile?.avatarUrl ?? null,
  }));

  return (
    <Container>
      <SearchView users={formattedUsers} />
    </Container>
  );
}
