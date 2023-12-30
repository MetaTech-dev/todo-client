import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import DarkModeContext from "../contexts/AppContext";
import { useAuth0 } from "@auth0/auth0-react";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import BedtimeOffOutlinedIcon from "@mui/icons-material/BedtimeOffOutlined";

const AccountMenu = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const navigate = useNavigate();

  const getInitials = () => {
    return user?.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    const userId = user?.sub;
    if (user && userId) {
      navigate(`/${userId}`);
    }
  };

  return (
    <>
      <Tooltip title="Account settings" placement="left">
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
          <Avatar src={user?.picture || null}>{getInitials()}</Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 2,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleProfileClick}>
          <Typography
            sx={{ p: "0px 8px 0px 8px", fontSize: 16, fontWeight: "500" }}
          >
            Profile
          </Typography>
        </MenuItem>
        <MenuItem>
          <Tooltip title="Toggle Dark Mode" placement="left">
            <IconButton
              onClick={() => toggleDarkMode()}
              color="inherit"
              aria-label="Toggle Dark Mode"
              sx={{ p: "0px 8px 0px 8px" }}
            >
              {isDarkMode ? (
                <BedtimeOffOutlinedIcon />
              ) : (
                <BedtimeOutlinedIcon />
              )}
            </IconButton>
          </Tooltip>
        </MenuItem>
        <MenuItem>
          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
              }
              sx={{ p: "0px 8px 0px 8px" }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => loginWithRedirect()}
              sx={{ p: "0px 8px 0px 8px" }}
            >
              Login
            </Button>
          )}
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
