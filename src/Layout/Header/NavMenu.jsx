import MenuIcon from "@mui/icons-material/Menu";
import { useCallback, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetOneUser } from "../../hooks/user";
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

const NavMenu = () => {
  const { user } = useAuth0();

  const { data: currentUser } = useGetOneUser(user?.sub);

  const isMember = useMemo(
    () => currentUser?.roles?.some((role) => role.name === "Member"),
    [currentUser]
  );

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
      {isMember && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={handleClose}
        >
          {routerChildren
            .filter((child) => child.isInNavMenu)
            .map((child) => (
              <MenuItem component={RouterLink} to={child.path} key={child.path}>
                <ListItemIcon>{child.icon}</ListItemIcon>
                <ListItemText>{child.name}</ListItemText>
              </MenuItem>
            ))}
        </Menu>
      )}
    </>
  );
};

export default NavMenu;
