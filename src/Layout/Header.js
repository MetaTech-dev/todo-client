import { Toolbar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";

const Header = () => {
  return (
    <AppBar position="static" sx={{ flexShrink: 1 }} elevation={6}>
      <Toolbar>
        <MenuIcon />
        <Button sx={{ color: "white", marginLeft: "auto" }}>Login</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
