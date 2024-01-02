import { Toolbar, Box, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";

import AccountMenu from "./AccountMenu";
import NavMenu from "./NavMenu";

const Header = () => {
  const location = useLocation();

  const isHome = useMemo(() => location.pathname === "/", [location]);

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <NavMenu />
        {isHome ? (
          <Typography variant="h6">ToDo</Typography>
        ) : (
          <Link
            to="/"
            component={RouterLink}
            sx={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Typography variant="h6">ToDo</Typography>
          </Link>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
