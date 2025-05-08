"use client"

import { Box, TextField, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import { useState, useEffect } from "react";

export default function SearchView({ users }: { users: { id: string; name: string; image: string }[] }) {
  const [query, setQuery] = useState("");
  const [filteredUsers, setUsers] = useState<{ id: string; name: string; image: string }[]>(users);

  useEffect(() => {
    setUsers(
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
        height: "auto",
        maxWidth: "100%",
        pb: 10, // Adds padding at the bottom to prevent content from being hidden
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
          label="Hľadaj príspevky alebo používateľov"
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

      {/* Displaying filtered users in a grid */}
      <Box sx={{ marginTop: 4, width: "100%" }}>
        {filteredUsers.length > 0 ? (
          <Grid container spacing={2}>
            {filteredUsers.map((user) => (
              <Grid item xs={12} sm={6} md={4} key={user.id}>
                <Card sx={{ boxShadow: 2, borderRadius: 2, padding: 2 }}>
                  {/* Card Content with Profile Picture */}
                  <CardContent sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <Avatar
                      alt={user.name}
                      src={user.image || "/default-profile.jpg"} // Fallback if no image
                      sx={{ width: 80, height: 80, mb: 2 }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {user.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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