// import React, { useState } from "react";
// import axios from "axios";
// import { TextField, Button, Typography, Container } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:4001/api/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);
//       alert("Login successful");
//       navigate("/"); // redirect to home
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <Container maxWidth="xs">
//       <Typography variant="h5" gutterBottom>Login</Typography>
//       <TextField fullWidth margin="normal" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//       <TextField fullWidth margin="normal" label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//       <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
//     </Container>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios"; // Keep this in your actual project
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { EmailOutlined, LockOutlined, LoginOutlined } from "@mui/icons-material"; // Material UI Icons
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

const Login = () => {
    
    const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'

  // const navigate = useNavigate(); // Commented out: Uncomment this line in your actual project if using React Router

  const handleLogin = async () => {
    setLoading(true);
    setSnackbarOpen(false); // Close any existing snackbar

    try {
      const res = await axios.post("http://localhost:4001/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      // If you are using React Router in your actual project, uncomment the line below:
      navigate("/"); // redirect to home
      console.log("Login successful! Would navigate to / if React Router was active.");
    } catch (err) {
      setSnackbarMessage(err.response?.data?.message || "Login failed. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
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
            Pet Adoption Login
          </Typography>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            Welcome back! Please sign in to your account.
          </Typography>

          <TextField
            fullWidth
            label="Email"
            variant="outlined" // Modern outlined variant
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <EmailOutlined sx={{ color: 'action.active', mr: 1 }} />
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            variant="outlined" // Modern outlined variant
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            InputProps={{
              startAdornment: (
                <LockOutlined sx={{ color: 'action.active', mr: 1 }} />
              ),
            }}
          />

          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large" // Larger button
            onClick={handleLogin}
            disabled={loading}
            endIcon={!loading ? <LoginOutlined /> : null} // Icon for login, hidden when loading
            sx={{ mt: 2 }} // Margin top
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
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

export default Login;
