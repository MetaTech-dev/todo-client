import { useAuth0 } from "@auth0/auth0-react";
import { Toolbar, Box, IconButton, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useContext } from "react";
import DarkModeContext from "../contexts/AppContext";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import BedtimeOffOutlinedIcon from "@mui/icons-material/BedtimeOffOutlined";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ToDo
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {isAuthenticated ? (
          <Button
            color="inherit"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </Button>
        ) : (
          <Button color="inherit" onClick={() => loginWithRedirect()}>
            Login
          </Button>
        )}
        <IconButton
          onClick={() => toggleDarkMode()}
          color="inherit"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <BedtimeOffOutlinedIcon /> : <BedtimeOutlinedIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
