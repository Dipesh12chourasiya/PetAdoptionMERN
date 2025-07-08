import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Router from "./router";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllCategories } from "./redux/actions/categories";
import SnackBarComponent from "./components/SnackbarComponent";
import CreatePet from "./components/CreatePet";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";

const sections = [{ title: "All Pets", url: "/" }];

const theme = createTheme({
  typography: {
    fontFamily: `"Trebuchet MS", "Helvetica", "Arial", sans-serif`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

// Helper component to access useLocation outside Router
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const allCategories = useSelector(
    (state) => state.categories.allCategories
  );

  // Pages that should NOT show Header/Footer
  const noLayoutRoutes = ["/login", "/register"];

  const showLayout = !noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {showLayout && (
        <Container maxWidth="lg">
          <Header
            title="Pet Adoption Center"
            sections={[
              ...sections,
              ...allCategories.map((category) => ({
                title: category.name,
                url: `/${category?._id}`,
              })),
            ]}
          />
        </Container>
      )}
      <main>
        <SnackBarComponent />
        {children}
      </main>
      {showLayout && (
        <Footer
          title="Pet Adoption Center (Indore)"
          description="Every Pet Deserves a Good Home."
        />
      )}
    </>
  );
};

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchAllCategories({ dispatch });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <LayoutWrapper>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/createPet" element={<CreatePet />} />
            {/* This renders your custom app routes like home, details, etc. */}
            <Route path="*" element={<Router />} />
          </Routes>
        </LayoutWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
}
