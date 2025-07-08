import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";

function Header(props) {
  const { sections, title } = props;
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully.");
    navigate("/login");
  };

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        {/* Logo / Title in center */}
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          sx={{ flex: 1 }}
        >
          <Link to="/">
            <img src="/images/logo.png" width="300" alt="Logo" />
          </Link>
        </Typography>

        {/* Login/Register or Logout buttons on right */}
        <Stack direction="row" spacing={1}>
          {!isLoggedIn ? (
            <>
              <Button color="primary" component={Link} to="/login">
                Login
              </Button>
              <Button color="primary" component={Link} to="/register">
                Register
              </Button>
            </>
          ) : (
            <Button color="error" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Stack>
      </Toolbar>

      {/* Category Navigation Bar */}
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      >
        {sections.map((section) => (
          <Link
            to={section.url}
            key={section.url}
            className={
              location.pathname === section.url ? "activeNavLink" : ""
            }
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default Header;
