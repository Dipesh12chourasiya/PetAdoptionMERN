
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper, // Added Paper for card-like effect
  CircularProgress, // Added for loading indicator
  Snackbar, // Added for non-intrusive messages
  Alert, // Added for Snackbar content
} from "@mui/material";
import {
  PersonOutlined, // Icon for Name
  EmailOutlined, // Icon for Email
  LockOutlined, // Icon for Password
  AppRegistrationOutlined, // Icon for Register button
} from "@mui/icons-material"; // Material UI Icons
import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Commented out for standalone execution
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // For consistent baseline styling
import { useNavigate } from "react-router-dom";

// Define a custom Material UI theme for a light blue and white look
const theme = createTheme({
  palette: {
    primary: {
      main: '#2196F3', // Light Blue
    },
    secondary: {
      main: '#03A9F4', // A slightly different blue accent
    },
    background: {
      default: '#F5F8FA', // Very light blue/grey background
      paper: '#ffffff', // Pure white paper background
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif', // Using Inter for a modern feel
    h5: {
      fontWeight: 600,
      color: '#333',
    },
    body2: {
      color: '#666',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // More rounded buttons
          textTransform: 'none', // Keep original casing
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)', // Subtle shadow
          '&:hover': {
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.12)', // Enhanced shadow on hover
          },
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #2196F3 30%, #42A5F5 90%)', // Gradient for primary button
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Rounded text fields
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // More rounded paper/card
          boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.08)', // Deeper shadow for the card
        },
      },
    },
  },
});

const Register = () => {
     const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State for Snackbar type ('success' or 'error')

  // const navigate = useNavigate(); // Commented out: Uncomment this line in your actual project if using React Router

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true); // Start loading
    setSnackbarOpen(false); // Close any existing snackbar

    try {
      await axios.post("http://localhost:4001/api/auth/register", form);
      setSnackbarMessage("Registration successful! Please login.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      // If you are using React Router in your actual project, uncomment the line below:
      // navigate("/login");
      navigate("/login");
      console.log("Registration successful!");
    } catch (err) {
      setSnackbarMessage(err.response?.data?.message || "Registration failed.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Applies baseline CSS for consistent styling */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: theme.palette.background.default, // Use theme background color
          padding: { xs: 2, sm: 3, md: 4 }, // Responsive padding
        }}
      >
        <Paper
          elevation={6} // Higher elevation for a more prominent card
          sx={{
            padding: { xs: 3, sm: 4, md: 5 }, // Responsive padding inside the card
            width: '100%',
            maxWidth: 400, // Max width for the form container
            display: 'flex',
            flexDirection: 'column',
            gap: 3, // Spacing between elements
            textAlign: 'center',
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom sx={{ color: theme.palette.primary.main }}>
            Register for Pet Adoption
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Create your account to find a loving pet.
          </Typography>

          <TextField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            variant="outlined" // Modern outlined variant
            disabled={loading} // Disable during loading
            InputProps={{
              startAdornment: (
                <PersonOutlined sx={{ color: 'action.active', mr: 1 }} />
              ),
            }}
          />
          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            variant="outlined" // Modern outlined variant
            type="email"
            disabled={loading} // Disable during loading
            InputProps={{
              startAdornment: (
                <EmailOutlined sx={{ color: 'action.active', mr: 1 }} />
              ),
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            variant="outlined" // Modern outlined variant
            disabled={loading} // Disable during loading
            InputProps={{
              startAdornment: (
                <LockOutlined sx={{ color: 'action.active', mr: 1 }} />
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            size="large" // Larger button
            onClick={handleRegister}
            disabled={loading} // Disable button when loading
            endIcon={!loading ? <AppRegistrationOutlined /> : null} // Icon for register, hidden when loading
            sx={{ mt: 2 }} // Margin top
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Register"}
          </Button>
        </Paper>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default Register;