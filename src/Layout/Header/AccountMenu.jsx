import {
  Avatar,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import DarkModeContext from "../../contexts/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import BedtimeOffOutlinedIcon from "@mui/icons-material/BedtimeOffOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutIcon from "@mui/icons-material/Logout";

const AccountMenu = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  const getInitials = useCallback(() => {
    return user?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, [user]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Tooltip title="Account Menu" placement="left">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
          <Avatar src={user?.picture || null}>{getInitials()}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem component={RouterLink} to={`users/${user?.sub}`}>
          <ListItemIcon>
            <PersonOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => toggleDarkMode()}>
          <ListItemIcon>
            {isDarkMode ? (
              <BedtimeOffOutlinedIcon fontSize="small" />
            ) : (
              <BedtimeOutlinedIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>{isDarkMode ? "Light Mode" : "Dark Mode"}</ListItemText>
        </MenuItem>
        {isAuthenticated ? (
          <MenuItem
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </MenuItem>
        ) : (
          <MenuItem onClick={() => loginWithRedirect()}>Login</MenuItem>
        )}
      </Menu>
    </>
  );
};

export default AccountMenu;
