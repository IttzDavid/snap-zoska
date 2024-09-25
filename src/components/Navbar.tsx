// src/components/Navbar.tsx

"use client"

import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

const Navbar: React.FC = () => {
    const [value, setValue] = React.useState(0); // Initialize state for selected tab

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue); // Update the state when tab changes
    };

    return (
        <BottomNavigation
            value={value} // Controlled component
            onChange={handleChange} // Event handler for tab change
            showLabels
            style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} // Fixed at bottom
        >
            <BottomNavigationAction 
                label="Home" 
                icon={<HomeIcon />} 
                component={Link} 
                href="/" // Adjust path as needed
            />
            <BottomNavigationAction 
                label="Search" 
                icon={<SearchIcon />} 
                component={Link} 
                href="/hladanie" 
            />
            <BottomNavigationAction 
                label="Add" 
                icon={<AddIcon />} 
                component={Link} 
                href="/pridat" 
            />
            <BottomNavigationAction 
                label="Notifications" 
                icon={<NotificationsIcon />} 
                component={Link} 
                href="/notifikacie" 
            />
            <BottomNavigationAction 
                label="Profile" 
                icon={<AccountCircleIcon />} 
                component={Link} 
                href="/profil" 
            />
        </BottomNavigation>
    );
};

export default Navbar;
