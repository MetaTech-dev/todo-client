// import * as React from "react";
import {
  AppBar,
  Button,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useContext, useState, forwardRef } from "react";
import ToDoContext from "./ToDoContext";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ProjectSettingsDialog = () => {
  const { isProjectSettingsDialogOpen, setIsProjectSettingsDialogOpen } =
    useContext(ToDoContext);

  const handleClose = () => {
    setIsProjectSettingsDialogOpen(false);
  };

  return (
    <Dialog
      fullScreen
      open={isProjectSettingsDialogOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar elevation={6} sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Project Settings
          </Typography>
        </Toolbar>
      </AppBar>
    </Dialog>
  );
};

export default ProjectSettingsDialog;
