import { useAuth0 } from "@auth0/auth0-react";
import {
  Toolbar,
  Box,
  IconButton,
  Typography,
  Avatar,
  Tooltip,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useContext, useState } from "react";
import DarkModeContext from "../contexts/AppContext";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import BedtimeOffOutlinedIcon from "@mui/icons-material/BedtimeOffOutlined";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const getInitials = () => {
    return user?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const [anchorEl, setAnchorEl] = useState(null);

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
        <Tooltip title="Account settings" placement="left">
          <IconButton
            onClick={(e) => setAnchorEl(e.currentTarget)}
            size="small"
          >
            <Avatar src={user?.picture || null}>{getInitials()}</Avatar>
          </IconButton>
        </Tooltip>
        {/* {isAuthenticated ? (
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
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
