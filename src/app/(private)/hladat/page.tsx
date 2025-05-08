// src/app/hladanie/page.tsx

import { Container } from "@mui/material";
import SearchView from "@/sections/SearchView"
import { prisma } from "@/app/api/auth/[...nextauth]/prisma";

export const metadata = { title: "Hľadanie | ZoškaSnap" };

export default async function SearchPage() {
  const users = await prisma.user.findMany({
      select: {
          id: true,
          name: true,  // name can be null
          image: true, // include image if needed
      },
  });

  // Ensure 'name' is always a string (replace null with an empty string)
  const formattedUsers = users.map(user => ({
      id: user.id,
      name: user.name ?? "Unknown User", // Replace null with default text
      image: user.image ?? "", // Ensure image is a string
  }));

  return (
      <Container>
        <SearchView users={formattedUsers} />
      </Container>
  );
}