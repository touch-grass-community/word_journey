import { useState } from "react";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import { useDataContext } from "../context/dataContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#6065bf",
      light: "#6065bf",
      dark: "#6065bf",
      contrastText: "#fff",
    },
    secondary: {
      light: "#e6e3e2",
      main: "#e6e3e2",
      dark: "#e6e3e2",
      contrastText: "#000",
    },
  },
});

export default function NavBar() {
  const pages = [
    { name: "Aggiungi Parola", urlName: "add-words" },
    { name: "Le Mie Parole", urlName: "your-words" },
    { name: "Impara", urlName: "learn" },
    { name: "Quiz", urlName: "quiz" },
  ];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];
  const { userLogin } = useDataContext();
  const { isLogged } = userLogin;

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar id="navbar" position="static">
        <Container maxWidth="xl" sx={{ height: "100%" }}>
          <Toolbar disableGutters sx={{ height: "100%" }}>
            {/* Logo md */}
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to={`/homepage`}
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            {/* Pages List xs  */}
            {isLogged ? (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{ display: { xs: "block", md: "none" } }}
                  >
                    {pages.map((page, index) => (
                      <MenuItem
                        key={index}
                        component={Link}
                        to={`/${page.urlName.toLowerCase().replace(" ", "-")}`}
                        onClick={handleCloseNavMenu}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {page.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </>
            ) : (
              ""
            )}

            {/* Logo  xs */}
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to={`/homepage`}
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            {/* Pages List md  */}
            {isLogged ? (
              <>
                <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                  {pages.map((page, index) => (
                    <Button
                      key={index}
                      component={Link}
                      to={`/${page.urlName.toLowerCase().replace(" ", "-")}`}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.name}
                    </Button>
                  ))}
                </Box>
              </>
            ) : (
              ""
            )}

            {/* Menu Profile */}
            {isLogged ? (
              <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {setting}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
                <Typography
                  noWrap
                  component={Link}
                  to={`/register`}
                  sx={{
                    letterSpacing: ".1rem",
                    color: "secondary",
                    textDecoration: "none",
                  }}
                >
                  Registrati
                </Typography>

                <Typography
                  color="secondary"
                  component="span"
                  sx={{
                    mx: 1,
                  }}
                >
                  |
                </Typography>

                <Typography
                  noWrap
                  component={Link}
                  to={`/login`}
                  sx={{
                    letterSpacing: ".1rem",
                    color: "secondary",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Typography>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
