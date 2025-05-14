import { createTheme } from '@mui/material/styles';

// Define the light theme palette
const lightPalette = {
  primary: {
    main: '#f50057', // pink
  },
  secondary: {
    main: '#dc004e', // pink
  },
  background: {
    default: '#fafafa', // light background
    paper: '#ffffff', // paper background
  },
  text: {
    primary: '#000000', // black text
    secondary: '#555555', // gray text
  },
};

// Define the dark theme palette (slightly lighter dark colors)
const darkPalette = {
  primary: {
    main: '#ff4081', // light pink
  },
  secondary: {
    main: '#f50057', // pink
  },
  background: {
    default: '#1a1a1a', // slightly lighter than #121212
    paper: '#2c2c2c', // lighter paper background
  },
  text: {
    primary: '#e0e0e0', // light white text (instead of pure white)
    secondary: '#a0a0a0', // lighter gray text
  },
};

// Create the theme
export const lightTheme = createTheme({
  palette: {
    mode: 'light', // Set the mode to 'light'
    ...lightPalette, // Add light palette colors
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif', // Set global font family
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'transparent', // Make text transparent to show the gradient
          textDecoration: 'none', // No underline by default
          fontStyle: 'italic', // Cursive style for links
          background: 'linear-gradient(to right, #f50057, #ff80ab)', // Gradient text color
          WebkitBackgroundClip: 'text', // Clip the background to the text
          '&:hover': {
            textDecoration: 'underline', // Underline on hover
            color: 'transparent', // Keep text transparent
            background: 'linear-gradient(to right, #f50057, #ff80ab)', // Hover gradient
            WebkitBackgroundClip: 'text', // Clip the background to the text
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(to right, #f50057, #ff80ab)', // Gradient from primary to a lighter pink
          color: '#fff', // Button text color
          '&:hover': {
            background: 'linear-gradient(to right, #ff4081, #f50057)', // Hover gradient
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set the mode to 'dark'
    ...darkPalette, // Add dark palette colors
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif', // Set global font family
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          color: 'transparent', // Make text transparent to show the gradient
          textDecoration: 'none', // No underline by default
          fontStyle: 'italic', // Cursive style for links
          background: 'linear-gradient(to right, #ff4081, #f50057)', // Gradient text color
          WebkitBackgroundClip: 'text', // Clip the background to the text
          '&:hover': {
            textDecoration: 'underline', // Underline on hover
            color: 'transparent', // Keep text transparent
            background: 'linear-gradient(to right, #ff4081, #f50057)', // Hover gradient
            WebkitBackgroundClip: 'text', // Clip the background to the text
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Apply only if it’s NOT a GitHub button
          '&:not(.github-button)': {
            background: 'linear-gradient(to right, #f50057, #ff80ab)',
            color: '#fff',
            '&:hover': {
              background: 'linear-gradient(to right, #ff4081, #f50057)',
            },
          },
        },
      },
    },
  },
});
