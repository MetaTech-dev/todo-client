import { Toolbar, Box, IconButton, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { useContext } from "react";
import DarkModeContext from "../AppSettingsContext";
import BedtimeOutlinedIcon from "@mui/icons-material/BedtimeOutlined";
import BedtimeOffOutlinedIcon from "@mui/icons-material/BedtimeOffOutlined";

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <AppBar position="static" sx={{ flexShrink: 1 }} elevation={6}>
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ToDo
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit">Login</Button>
        <IconButton
          onClick={() => toggleDarkMode()}
          color="inherit"
          aria-label="Toggle Dark Mode"
        >
          {isDarkMode ? <BedtimeOffOutlinedIcon /> : <BedtimeOutlinedIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
