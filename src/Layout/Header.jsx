import { Toolbar, Box, IconButton, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import AccountMenu from "../components/AccountMenu";

const Header = () => {
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ToDo
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
