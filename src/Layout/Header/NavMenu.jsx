import MenuIcon from "@mui/icons-material/Menu";
import { useCallback, useState } from "react";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { routerChildren } from "../../router";
import { SignedIn, useOrganization } from "@clerk/clerk-react";

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const { organization } = useOrganization();

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
              child.path === "users" ? Boolean(organization) : child.isInNavMenu
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
