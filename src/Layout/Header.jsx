import { Toolbar, Box, IconButton, Link, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import AccountMenu from "../components/AccountMenu";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { set } from "date-fns";

const Header = () => {
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
