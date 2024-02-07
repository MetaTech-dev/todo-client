import { Toolbar, Box, Link } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import { useContext, useMemo } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Typography } from "@mui/material";
import AccountMenu from "./AccountMenu";
import NavMenu from "./NavMenu";
import { OrganizationSwitcher } from "@clerk/clerk-react";
import AppContext from "../../contexts/AppContext";

const Header = () => {
  const { pathname } = useLocation();

  const isHome = useMemo(() => pathname === "/", [pathname]);

  const inDetailView = useMemo(() => pathname.includes("/todos/"), [pathname]);

  const { isMobile } = useContext(AppContext);

  return (
    <AppBar position="static" elevation={2}>
      <Toolbar>
        <NavMenu />
        {isHome ? (
          <Typography variant="h6" sx={{ mr: 3 }}>
            ToDo
          </Typography>
        ) : (
          <Link
            to="/"
            component={RouterLink}
            sx={{
              textDecoration: "none",
              color: "inherit",
              mr: 3,
            }}
          >
            <Typography variant="h6">ToDo</Typography>
          </Link>
        )}
        {!inDetailView && !isMobile && (
          <OrganizationSwitcher
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  borderRadius: "0.25rem",
                  "&:hover": {
                    border: "1px solid white",
                  },
                },
                organizationSwitcherTriggerIcon: { marginLeft: 0 },
              },
            }}
          />
        )}
        <Box sx={{ flexGrow: 1 }} />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
