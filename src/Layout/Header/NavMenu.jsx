import MenuIcon from "@mui/icons-material/Menu";
import { useCallback, useContext, useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { routerChildren } from "../../router";
import { SignedIn, useOrganization } from "@clerk/clerk-react";
import AppContext from "../../contexts/AppContext";

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { organization } = useOrganization();
  if (!organization && pathname === "/organization") {
    navigate("/");
  }

  const { isMobile } = useContext(AppContext);

  return (
    <>
      <Tooltip title="Navigation Menu" placement="bottom">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 1 }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MenuIcon />
        </IconButton>
      </Tooltip>
      <SignedIn>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={handleClose}
        >
          {routerChildren
            .filter((child) =>
              child.path === "organization"
                ? Boolean(organization)
                : child.isInNavMenu && (child.isMobileOnly ? isMobile : true)
            )
            .map((child) => (
              <MenuItem component={RouterLink} to={child.path} key={child.path}>
                <ListItemIcon>{child.icon}</ListItemIcon>
                <ListItemText>{child.name}</ListItemText>
              </MenuItem>
            ))}
        </Menu>
      </SignedIn>
    </>
  );
};

export default NavMenu;
