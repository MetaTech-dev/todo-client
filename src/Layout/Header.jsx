import {
  Toolbar,
  Box,
  IconButton,
  Link,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useMemo, useState } from "react";
import AccountMenu from "../components/AccountMenu";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetOneUser } from "../hooks/user";

const Header = () => {
  const { user } = useAuth0();
  const { data: currentUser } = useGetOneUser(user?.sub);
  const isMember = useMemo(
    () => currentUser?.roles?.some((role) => role.name === "Member"),
    [currentUser]
  );

  const location = useLocation();
  const navigate = useNavigate();

  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setIsHome(true);
    } else {
      setIsHome(false);
    }
  }, [location]);

  const handleClick = () => {
    navigate("/");
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MenuIcon />
        </IconButton>
        {isMember && (
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
            <MenuItem>
              <Link href="/users" color="inherit" underline="none">
                Users
              </Link>
            </MenuItem>
          </Menu>
        )}
        {isHome && (
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ToDo
          </Typography>
        )}
        {!isHome && (
          <Link
            to="/"
            onClick={handleClick}
            sx={{
              fontSize: "20px",
              fontWeight: "500",
              textDecoration: "none",
              color: "inherit",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            ToDo
          </Link>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
