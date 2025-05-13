"use client";

import * as React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Typography,
  ListItemText,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useTheme } from "../components/ThemeProvider";

export default function Navbar() {
  const [value, setValue] = React.useState("/");
  const router = useRouter();
  const { data: session, status } = useSession();
  const { toggleTheme, isDarkMode } = useTheme();

  const [avatarUrl, setAvatarUrl] = React.useState<string | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    if (status !== "authenticated") return;
    (async () => {
      try {
        const res = await fetch("/api/profile", { method: "GET" });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const { profile } = await res.json();
        setAvatarUrl(profile.avatarUrl);
      } catch {
        setAvatarUrl(null);
      }
    })();
  }, [status]);

  const handleNavigation = (_: any, newValue: string) => {
    if (newValue === "#") {
      const anchor = document.getElementById("account-menu-anchor");
      if (anchor) {
        setAnchorEl(anchor);
      }
      return;
    }

    setValue(newValue);
    router.push(newValue);
  };

  const handleAccountMenuClose = () => {
    setAnchorEl(null);
  };

  const nonAuthPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "O nás", value: "/o-nas", icon: <InfoOutlinedIcon /> },
    {
      label: "Účet",
      value: "#",
      icon: (
        <Box
          id="account-menu-anchor"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <AccountCircleIcon sx={{ fontSize: 26 }} />
        </Box>
      ),
    },
  ];

  const authPaths = [
    { label: "Domov", value: "/", icon: <HomeIcon /> },
    { label: "Hľadať", value: "/hladat", icon: <SearchIcon /> },
    { label: "Pridať", value: "/pridat", icon: <AddCircleIcon /> },
    {
      label: "",
      value: "#",
      icon: (
        <Box
          id="account-menu-anchor"
          sx={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
        >
          <Avatar
            alt="Avatar"
            src={avatarUrl || session?.user?.image || ""}
          >
            {session?.user?.name?.split(" ").map((n) => n[0]).join("") || "U"}
          </Avatar>
        </Box>
      ),
    },
  ];

  const navigationPaths = status === "authenticated" ? authPaths : nonAuthPaths;

  return (
    <Box sx={{ width: "100%", position: "fixed", bottom: 0 }}>
      <BottomNavigation showLabels value={value} onChange={handleNavigation}>
        {navigationPaths.map((path) => (
          <BottomNavigationAction
            key={path.label || path.value}
            label={path.label}
            value={path.value}
            icon={path.icon}
          />
        ))}
      </BottomNavigation>

      <IconButton
        onClick={toggleTheme}
        sx={{ position: "absolute", top: 10, right: 10 }}
      >
        {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      {/* Account Menu for both auth and non-auth users */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleAccountMenuClose}
      >
        {status === "authenticated" ? (
          <>
            <MenuItem onClick={() => { router.push(`/profil/${session?.user?.id}`); handleAccountMenuClose(); }}>
              View Profile
            </MenuItem>
            <MenuItem onClick={() => { router.push("/auth/odhlasenie"); handleAccountMenuClose(); }}>
              <ListItemIcon><LogoutIcon /></ListItemIcon>
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => { router.push("/auth/prihlasenie"); handleAccountMenuClose(); }}>
              <ListItemIcon><LoginIcon /></ListItemIcon>
              Prihlásenie
            </MenuItem>
            <MenuItem onClick={() => { router.push("/auth/registracia"); handleAccountMenuClose(); }}>
              <ListItemIcon><AppRegistrationIcon /></ListItemIcon>
              Registrácia
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
}
