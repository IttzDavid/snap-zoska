// src/app/components/SearchView.tsx
"use client";

import { Box, TextField, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import { useState, useEffect } from "react";

interface SearchUser {
  id: string;
  name: string;
  image: string | null;      // provider image
  avatarUrl?: string | null; // custom profile picture
}

export default function SearchView({ users }: { users: SearchUser[] }) {
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<SearchUser[]>(users);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, users]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
        pb: 10,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4, mt: 4 }}>
        Vyhľadávanie
      </Typography>

      <Box
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <TextField
          variant="outlined"
          label="Hľadaj používateľov"
          fullWidth
          size="small"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          sx={{
            bgcolor: "background.paper",
            boxShadow: 2,
            borderRadius: 1,
          }}
        />
      </Box>

      <Box sx={{ marginTop: 4, width: "100%" }}>
        {filteredUsers.length > 0 ? (
          <Grid container spacing={2}>
            {filteredUsers.map((user) => {
              // Determine which image to show
              const src = user.avatarUrl || user.image || undefined;
              const initials = user.name
                .split(" ")
                .map((part) => part[0])
                .join("");

              return (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <Card sx={{ boxShadow: 2, borderRadius: 2, p: 2 }}>
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Avatar
                        alt={user.name}
                        src={src}
                        sx={{ width: 80, height: 80, mb: 2 }}
                      >
                        {!src && initials}
                      </Avatar>
                      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        {user.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Typography variant="body1" color="textSecondary" textAlign="center">
            Zatiaľ neexistujú žiadne výsledky. Skúste niečo iné.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
